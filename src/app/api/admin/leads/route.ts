import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";

export async function GET(request: Request) {
  try {
    const { authorized } = await verifyAdminPermission("leads:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status") || "ALL";
    const exportCsv = searchParams.get("export") === "csv";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { subject: { contains: search } },
        { message: { contains: search } },
      ];
    }

    if (status !== "ALL") {
      where.status = status;
    }

    // CSV Export Flow
    if (exportCsv) {
      const leads = await prisma.contactLead.findMany({
        where,
        orderBy: { submittedAt: "desc" },
        include: { assignedAdmin: { select: { name: true } } },
      });

      const header = ["ID", "Name", "Email", "Phone", "Subject", "Status", "Source", "Assigned Admin", "Date"];
      const rows = leads.map((l) => [
        `"${l.id}"`,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.email.replace(/"/g, '""')}"`,
        `"${(l.phone || "").replace(/"/g, '""')}"`,
        `"${l.subject.replace(/"/g, '""')}"`,
        `"${l.status}"`,
        `"${l.source}"`,
        `"${l.assignedAdmin?.name || "Unassigned"}"`,
        `"${l.submittedAt.toISOString()}"`,
      ]);

      const csvContent = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="saviora-leads-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    // Paginated list
    const [leads, total] = await Promise.all([
      prisma.contactLead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { submittedAt: "desc" },
        include: {
          assignedAdmin: { select: { id: true, name: true } },
          _count: { select: { notes: true } },
        },
      }),
      prisma.contactLead.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}
