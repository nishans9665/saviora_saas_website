import React from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin, verifyAdminPermission } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import SettingsClient from "./SettingsClient";
import { Settings, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Website Settings | Saviora Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect("/login-admin");
  }

  const { authorized } = await verifyAdminPermission("settings:read");
  if (!authorized) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900/50 shadow-sm max-w-lg mx-auto mt-12">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Access Restricted</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          You need Admin or Super Admin permissions to manage website settings.
        </p>
      </div>
    );
  }

  // Fetch all settings
  const rawSettings = await prisma.websiteSetting.findMany();
  const settingsMap: Record<string, { value: any; group: string }> = {};

  for (const s of rawSettings) {
    try {
      settingsMap[s.key] = {
        value: JSON.parse(s.value),
        group: s.group,
      };
    } catch {
      settingsMap[s.key] = {
        value: s.value,
        group: s.group,
      };
    }
  }

  // Active sessions count for system tab
  const activeSessionsCount = await prisma.adminSession.count({
    where: { expiresAt: { gt: new Date() } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-600" />
            Website Settings & Configuration
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure global website metadata, contact details, social links, and system environment.
          </p>
        </div>
      </div>

      <SettingsClient
        initialSettings={settingsMap}
        systemInfo={{
          activeSessions: activeSessionsCount,
          nodeEnv: process.env.NODE_ENV || "development",
          database: "MySQL (saviora_db on localhost:3306)",
        }}
      />
    </div>
  );
}
