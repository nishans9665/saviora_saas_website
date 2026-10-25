import React from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin, verifyAdminPermission } from "@/lib/auth/session";
import PagesManagerClient from "./PagesManagerClient";
import { Globe } from "lucide-react";

export const metadata = {
  title: "Website Pages & SEO | Saviora Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPagesPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect("/login-admin");
  }

  const { authorized } = await verifyAdminPermission("pages:manage");
  if (!authorized) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Website Pages & On-Page SEO Manager
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage page titles, search engine meta descriptions, canonical URLs, and indexing directives.
          </p>
        </div>
      </div>

      <PagesManagerClient />
    </div>
  );
}
