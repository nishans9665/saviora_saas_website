import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard | Saviora CMS",
  description: "Saviora Website Management & Administration Panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentAdmin = await getAdminSession();

  if (!currentAdmin) {
    redirect("/login-admin");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar Navigation */}
      <AdminSidebar currentAdmin={currentAdmin} />

      {/* Main Content Viewport */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen bg-slate-50">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
