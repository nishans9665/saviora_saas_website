import { NextResponse } from "next/server";
import { destroyAdminSession, getAdminSession } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";

export async function POST() {
  try {
    const admin = await getAdminSession();
    if (admin) {
      await logAuditEvent({
        adminUserId: admin.id,
        action: "LOGOUT",
        entityType: "AdminUser",
        entityId: admin.id,
      });
    }

    await destroyAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { error: "Failed to log out." },
      { status: 500 }
    );
  }
}
