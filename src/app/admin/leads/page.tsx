import React from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin, verifyAdminPermission } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import LeadsTableClient from "./LeadsTableClient";
import { Inbox, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Contact Leads | Saviora Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/login-admin");
  }

  const { authorized } = await verifyAdminPermission("leads:read");
  if (!authorized) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-rose-200 shadow-sm max-w-lg mx-auto mt-12">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Access Restricted</h2>
        <p className="text-slate-600 text-sm">
          You need Admin or Super Admin privileges to access customer contact leads.
        </p>
      </div>
    );
  }

  // Fetch counts for summary cards
  const [totalLeads, newLeads, inProgressLeads, resolvedLeads] = await Promise.all([
    prisma.contactLead.count(),
    prisma.contactLead.count({ where: { status: "NEW" } }),
    prisma.contactLead.count({ where: { status: "IN_PROGRESS" } }),
    prisma.contactLead.count({ where: { status: "RESOLVED" } }),
  ]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Inbox className="w-6 h-6 text-emerald-600" />
            Contact Form Submissions & Leads
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage inquiries, assign follow-ups, and track communication history with prospective clients.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Leads</div>
            <div className="text-xl font-bold text-slate-900">{totalLeads}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">New Inquiries</div>
            <div className="text-xl font-bold text-emerald-600">{newLeads}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">In Progress</div>
            <div className="text-xl font-bold text-amber-600">{inProgressLeads}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Resolved</div>
            <div className="text-xl font-bold text-slate-900">{resolvedLeads}</div>
          </div>
        </div>
      </div>

      {/* Main Leads Table */}
      <LeadsTableClient currentAdminRole={admin.role} />
    </div>
  );
}
