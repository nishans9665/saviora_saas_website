import React from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin, verifyAdminPermission } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import AdminUsersClient from "./AdminUsersClient";
import { Users, ShieldAlert, UserCheck, Shield } from "lucide-react";

export const metadata = {
  title: "Admin Users | Saviora Admin",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect("/login-admin");
  }

  const { authorized } = await verifyAdminPermission("users:read");
  if (!authorized) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900/50 shadow-sm max-w-lg mx-auto mt-12">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Super Admin Access Required</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Only Super Administrators can create, modify, or manage administrative staff accounts.
        </p>
      </div>
    );
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            Administrator Accounts & Access Control
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage admin users, assign role-based permissions (Super Admin, Admin, Editor), and revoke access.
          </p>
        </div>
      </div>

      <AdminUsersClient initialUsers={JSON.parse(JSON.stringify(users))} currentAdminId={currentAdmin.id} />
    </div>
  );
}
