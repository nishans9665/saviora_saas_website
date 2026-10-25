import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/passwords";
import { logAuditEvent } from "@/lib/audit";
import { AdminRole } from "@prisma/client";

// GET /api/admin/users - List all admin users (Super Admin only)
export async function GET(request: Request) {
  try {
    const { authorized } = await verifyAdminPermission("users:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        _count: {
          select: {
            authoredPosts: true,
            assignedLeads: true,
          },
        },
      },
      orderBy: [{ role: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("GET /api/admin/users error:", error);
    return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
  }
}

// POST /api/admin/users - Create new admin user
export async function POST(request: Request) {
  try {
    const { admin, authorized } = await verifyAdminPermission("users:write");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const validRoles: AdminRole[] = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
    }

    // Check email collision
    const existing = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An admin user with this email address already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.adminUser.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: role as AdminRole,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "CREATE_ADMIN_USER",
      entityType: "AdminUser",
      entityId: newUser.id,
      details: { email: newUser.email, role: newUser.role },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/users error:", error);
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
}
