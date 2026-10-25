import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";

// POST /api/admin/leads/[id]/notes - Add an internal team note to a lead
export async function POST(
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
    const noteText = body.note?.trim();

    if (!noteText) {
      return NextResponse.json({ error: "Note content cannot be empty." }, { status: 400 });
    }

    // Verify lead exists
    const lead = await prisma.contactLead.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    // Create note
    const newNote = await prisma.leadNote.create({
      data: {
        leadId: id,
        adminUserId: admin.id,
        note: noteText,
      },
      include: {
        adminUser: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // Optionally update lead status to IN_PROGRESS if still NEW
    await prisma.contactLead.updateMany({
      where: { id, status: "NEW" },
      data: { status: "IN_PROGRESS" },
    });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "ADD_LEAD_NOTE",
      entityType: "ContactLead",
      entityId: id,
      details: { noteLength: noteText.length, leadEmail: lead.email },
    });

    return NextResponse.json({ success: true, note: newNote }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/leads/[id]/notes error:", error);
    return NextResponse.json({ error: "Failed to add note." }, { status: 500 });
  }
}
