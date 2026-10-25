import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/passwords";
import { logAuditEvent } from "@/lib/audit";
import { AdminRole } from "@prisma/client";

// GET /api/admin/users/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { authorized } = await verifyAdminPermission("users:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const user = await prisma.adminUser.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/admin/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch user." }, { status: 500 });
  }
}

// PUT /api/admin/users/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { admin, authorized } = await verifyAdminPermission("users:write");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, email, role, isActive, password } = body;

    const existingUser = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Safety check: Don't demote or deactivate the last SUPER_ADMIN
    if (
      existingUser.role === "SUPER_ADMIN" &&
      ((role && role !== "SUPER_ADMIN") || isActive === false)
    ) {
      const activeSuperAdminsCount = await prisma.adminUser.count({
        where: {
          role: "SUPER_ADMIN",
          isActive: true,
          id: { not: id },
        },
      });

      if (activeSuperAdminsCount === 0) {
        return NextResponse.json(
          { error: "Cannot demote or deactivate the only active Super Admin." },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (name?.trim()) updateData.name = name.trim();
    if (email?.trim()) {
      const normalized = email.trim().toLowerCase();
      if (normalized !== existingUser.email) {
        const emailExists = await prisma.adminUser.findUnique({
          where: { email: normalized },
        });
        if (emailExists) {
          return NextResponse.json(
            { error: "Email address is already in use by another administrator." },
            { status: 409 }
          );
        }
        updateData.email = normalized;
      }
    }

    if (role) {
      const validRoles: AdminRole[] = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
      if (validRoles.includes(role)) {
        updateData.role = role as AdminRole;
      }
    }

    if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive);
      // If deactivating user, delete their sessions
      if (!isActive) {
        await prisma.adminSession.deleteMany({ where: { adminUserId: id } });
      }
    }

    if (password && password.trim().length >= 8) {
      updateData.passwordHash = await hashPassword(password);
      // Revoke existing sessions so they re-authenticate with new password
      await prisma.adminSession.deleteMany({ where: { adminUserId: id } });
    }

    const updatedUser = await prisma.adminUser.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "UPDATE_ADMIN_USER",
      entityType: "AdminUser",
      entityId: id,
      details: { updatedFields: Object.keys(updateData) },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("PUT /api/admin/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { admin, authorized } = await verifyAdminPermission("users:delete");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    // Safety checks
    if (admin.id === id) {
      return NextResponse.json(
        { error: "You cannot delete your own admin account." },
        { status: 400 }
      );
    }

    const targetUser = await prisma.adminUser.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            authoredPosts: true,
            leadNotes: true,
          },
        },
      },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (targetUser.role === "SUPER_ADMIN") {
      const otherSuperAdmins = await prisma.adminUser.count({
        where: {
          role: "SUPER_ADMIN",
          id: { not: id },
        },
      });

      if (otherSuperAdmins === 0) {
        return NextResponse.json(
          { error: "Cannot delete the only Super Admin account." },
          { status: 400 }
        );
      }
    }

    // If user has authored posts or lead notes, prevent accidental database corruption:
    if (targetUser._count.authoredPosts > 0 || targetUser._count.leadNotes > 0) {
      // Deactivate instead of hard deleting to preserve foreign key integrity
      await prisma.adminUser.update({
        where: { id },
        data: { isActive: false },
      });
      await prisma.adminSession.deleteMany({ where: { adminUserId: id } });

      await logAuditEvent({
        adminUserId: admin.id,
        action: "DEACTIVATE_ADMIN_USER_WITH_CONTENT",
        entityType: "AdminUser",
        entityId: id,
        details: { reason: "User has authored posts or notes, deactivated instead of hard deleted." },
      });

      return NextResponse.json({
        success: true,
        message: "User has authored content. Account has been deactivated and logged out instead of deleted.",
      });
    }

    // Hard delete
    await prisma.adminSession.deleteMany({ where: { adminUserId: id } });
    await prisma.adminUser.delete({ where: { id } });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "DELETE_ADMIN_USER",
      entityType: "AdminUser",
      entityId: id,
      details: { email: targetUser.email, role: targetUser.role },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
}
