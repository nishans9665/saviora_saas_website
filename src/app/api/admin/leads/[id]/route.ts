import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";

// GET /api/admin/leads/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { authorized } = await verifyAdminPermission("leads:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const lead = await prisma.contactLead.findUnique({
      where: { id },
      include: {
        assignedAdmin: { select: { id: true, name: true, email: true } },
        notes: {
          orderBy: { createdAt: "desc" },
          include: { adminUser: { select: { id: true, name: true } } },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error("GET /api/admin/leads/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch lead." }, { status: 500 });
  }
}

// PUT /api/admin/leads/[id] - Update status or assignment
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { admin, authorized } = await verifyAdminPermission("leads:write");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, assignedAdminId } = body;

    const lead = await prisma.contactLead.update({
      where: { id },
      data: {
        status: status !== undefined ? status : undefined,
        assignedAdminId: assignedAdminId !== undefined ? assignedAdminId || null : undefined,
      },
    });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "UPDATE_LEAD_STATUS",
      entityType: "ContactLead",
      entityId: id,
      details: { status, assignedAdminId },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("PUT /api/admin/leads/[id] error:", error);
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }
}

// DELETE /api/admin/leads/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { admin, authorized } = await verifyAdminPermission("leads:delete");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.contactLead.delete({ where: { id } });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "DELETE_LEAD",
      entityType: "ContactLead",
      entityId: id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/leads/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete lead." }, { status: 500 });
  }
}
