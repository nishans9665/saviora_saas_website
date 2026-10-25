import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";

// GET /api/admin/settings - Fetch all website settings
export async function GET(request: Request) {
  try {
    const { authorized } = await verifyAdminPermission("settings:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const settingsRows = await prisma.websiteSetting.findMany({
      orderBy: [{ group: "asc" }, { key: "asc" }],
    });

    const settingsMap: Record<string, { value: any; group: string }> = {};
    for (const row of settingsRows) {
      try {
        settingsMap[row.key] = {
          value: JSON.parse(row.value),
          group: row.group,
        };
      } catch {
        settingsMap[row.key] = {
          value: row.value,
          group: row.group,
        };
      }
    }

    return NextResponse.json({ settings: settingsMap });
  } catch (error) {
    console.error("GET /api/admin/settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}

// POST /api/admin/settings - Save or update website settings
export async function POST(request: Request) {
  try {
    const { admin, authorized } = await verifyAdminPermission("settings:write");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
    }

    const updates = [];
    for (const [key, item] of Object.entries(settings)) {
      const val = typeof item === "object" && item !== null && "value" in item
        ? (item as any).value
        : item;
      const grp = typeof item === "object" && item !== null && "group" in item
        ? (item as any).group
        : "general";

      updates.push(
        prisma.websiteSetting.upsert({
          where: { key },
          update: {
            value: JSON.stringify(val),
            group: grp,
          },
          create: {
            key,
            value: JSON.stringify(val),
            group: grp,
          },
        })
      );
    }

    await prisma.$transaction(updates);

    await logAuditEvent({
      adminUserId: admin.id,
      action: "UPDATE_WEBSITE_SETTINGS",
      entityType: "WebsiteSetting",
      details: { keysUpdated: Object.keys(settings) },
    });

    return NextResponse.json({ success: true, count: updates.length });
  } catch (error) {
    console.error("POST /api/admin/settings error:", error);
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}
