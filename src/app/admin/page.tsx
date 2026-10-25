import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DashboardAnalyticsCharts } from "@/components/admin/DashboardAnalyticsCharts";
import {
  FileText,
  Inbox,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  ExternalLink,
  Shield,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const currentAdmin = await getAdminSession();
  if (!currentAdmin) return null;

  // 1. Current Date Boundaries
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 2. Aggregate Blog Statistics
  const [
    totalPublishedPosts,
    totalDraftPosts,
    totalScheduledPosts,
    postsPublishedThisMonth,
  ] = await Promise.all([
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "DRAFT" } }),
    prisma.blogPost.count({ where: { status: "SCHEDULED" } }),
    prisma.blogPost.count({
      where: {
        status: "PUBLISHED",
        publishedAt: { gte: startOfThisMonth },
      },
    }),
  ]);

  // 3. Aggregate Lead Statistics
  const [
    totalLeads,
    newLeads,
    inProgressLeads,
    contactedLeads,
    resolvedLeads,
    spamLeads,
    leadsThisMonth,
  ] = await Promise.all([
    prisma.contactLead.count(),
    prisma.contactLead.count({ where: { status: "NEW" } }),
    prisma.contactLead.count({ where: { status: "IN_PROGRESS" } }),
    prisma.contactLead.count({ where: { status: "CONTACTED" } }),
    prisma.contactLead.count({ where: { status: "RESOLVED" } }),
    prisma.contactLead.count({ where: { status: "SPAM" } }),
    prisma.contactLead.count({
      where: { submittedAt: { gte: startOfThisMonth } },
    }),
  ]);

  // 4. Admin Users count
  const totalAdminUsers = await prisma.adminUser.count({
    where: { isActive: true },
  });

  // 5. Build 7d, 30d, 90d Lead Activity Time Series
  const days90Ago = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const rawLeadsForChart = await prisma.contactLead.findMany({
    where: { submittedAt: { gte: days90Ago } },
    select: { submittedAt: true },
    orderBy: { submittedAt: "asc" },
  });

  const getSeriesData = (daysCount: number) => {
    const list: { date: string; count: number }[] = [];
    const dateMap = new Map<string, number>();

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = `${d.getMonth() + 1}/${d.getDate()}`;
      dateMap.set(key, 0);
    }

    rawLeadsForChart.forEach((lead) => {
      const key = `${lead.submittedAt.getMonth() + 1}/${lead.submittedAt.getDate()}`;
      if (dateMap.has(key)) {
        dateMap.set(key, (dateMap.get(key) || 0) + 1);
      }
    });

    dateMap.forEach((count, date) => {
      list.push({ date, count });
    });

    return list;
  };

  const last7Days = getSeriesData(7);
  const last30Days = getSeriesData(30);
  const last90Days = getSeriesData(90);

  const statusDistribution = [
    { name: "New", value: newLeads, color: "#10B981" },
    { name: "In Progress", value: inProgressLeads, color: "#F59E0B" },
    { name: "Contacted", value: contactedLeads, color: "#3B82F6" },
    { name: "Resolved", value: resolvedLeads, color: "#64748B" },
    { name: "Spam", value: spamLeads, color: "#EF4444" },
  ];

  // 6. Recent Leads
  const recentLeads = await prisma.contactLead.findMany({
    take: 5,
    orderBy: { submittedAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      status: true,
      submittedAt: true,
    },
  });

  // 7. Recent Blog Posts
  const recentPosts = await prisma.blogPost.findMany({
    take: 5,
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      publishedAt: true,
      updatedAt: true,
      author: { select: { name: true } },
    },
  });

  // 8. Recent Audit Activity
  const recentAudits = await prisma.auditLog.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      adminUser: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        currentAdmin={currentAdmin}
        title="Admin Overview Dashboard"
        subtitle={`Welcome back, ${currentAdmin.name}! Here is an overview of website activity.`}
      />

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Published Posts */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Published Posts</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalPublishedPosts}</span>
            <span className="text-[11px] text-emerald-600 font-medium">+{postsPublishedThisMonth} this month</span>
          </div>
        </div>

        {/* Draft Posts */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Drafts / In Review</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalDraftPosts}</span>
            {totalScheduledPosts > 0 && (
              <span className="text-[11px] text-indigo-600 font-medium">{totalScheduledPosts} scheduled</span>
            )}
          </div>
        </div>

        {/* Total Contact Leads */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Leads</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Inbox className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalLeads}</span>
            <span className="text-[11px] text-blue-600 font-medium">+{leadsThisMonth} this month</span>
          </div>
        </div>

        {/* New / Actionable Leads */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">New &amp; In-Progress</span>
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{newLeads + inProgressLeads}</span>
            <span className="text-[11px] text-rose-600 font-medium">{newLeads} unread</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <DashboardAnalyticsCharts
        last7Days={last7Days}
        last30Days={last30Days}
        last90Days={last90Days}
        statusDistribution={statusDistribution}
      />

      {/* Dual Tables: Recent Leads & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contact Submissions */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Recent Contact Form Leads</h3>
              <p className="text-xs text-slate-500">Latest inquiries submitted from website</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-900 truncate">{lead.name}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                          lead.status === "NEW"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : lead.status === "IN_PROGRESS"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{lead.subject}</p>
                    <span className="text-[10px] text-slate-400">{new Date(lead.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                  >
                    Details
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No contact form submissions recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Recent Blog Posts</h3>
              <p className="text-xs text-slate-500">Articles created and published</p>
            </div>
            <Link
              href="/admin/blog"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-900 truncate">{post.title}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">by {post.author.name}</p>
                  </div>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No blog posts created yet. Click &quot;New Post&quot; to publish your first article!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Action Shortcuts */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Quick Actions</h3>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all group"
          >
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4" />
            </span>
            <span>Create New Blog Post</span>
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all group"
          >
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <Inbox className="w-4 h-4" />
            </span>
            <span>Review New Contact Inquiries</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all group"
          >
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </span>
            <span>Update Website SEO &amp; Settings</span>
          </Link>
        </div>

        {/* Recent Audit Logs (2 Cols) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Recent Security &amp; Activity Log</h3>
            <Link href="/admin/activity-logs" className="text-xs text-slate-500 hover:text-emerald-600 font-medium">
              Full Log &rarr;
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {recentAudits.length > 0 ? (
              recentAudits.map((audit) => (
                <div key={audit.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 rounded-md bg-slate-100 text-slate-500">
                      <Activity className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="font-semibold text-slate-800">{audit.action}</span>
                      <span className="text-slate-500 ml-2">by {audit.adminUser?.name || "System"}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{new Date(audit.createdAt).toLocaleTimeString()}</span>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-xs text-slate-400">
                Activity will appear here as administrators perform actions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
