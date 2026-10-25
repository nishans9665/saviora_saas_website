import React from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin, verifyAdminPermission } from "@/lib/auth/session";
import AuditLogsClient from "./AuditLogsClient";
import { Activity } from "lucide-react";

export const metadata = {
  title: "Activity & Audit Logs | Saviora Admin",
  robots: { index: false, follow: false },
};

export default async function AdminActivityLogsPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect("/login-admin");
  }

  const { authorized } = await verifyAdminPermission("logs:read");
  if (!authorized) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600" />
            Security Audit Trail &amp; Administrative Logs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Immutable log of system logins, blog publications, status modifications, and user account actions.
          </p>
        </div>
      </div>

      <AuditLogsClient />
    </div>
  );
}
