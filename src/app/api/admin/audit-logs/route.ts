import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";

export async function GET(request: Request) {
  try {
    const { authorized } = await verifyAdminPermission("logs:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const action = searchParams.get("action") || "ALL";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (action !== "ALL") {
      where.action = action;
    }

    if (search) {
      where.OR = [
        { action: { contains: search } },
        { entityType: { contains: search } },
        { details: { contains: search } },
        { ipAddress: { contains: search } },
        { adminUser: { name: { contains: search } } },
        { adminUser: { email: { contains: search } } },
      ];
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          adminUser: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/audit-logs error:", error);
    return NextResponse.json({ error: "Failed to fetch audit logs." }, { status: 500 });
  }
}
