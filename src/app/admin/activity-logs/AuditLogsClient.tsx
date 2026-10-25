"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Activity,
  Search,
  User,
  Shield,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  FileText,
  Mail,
  Settings,
  Lock,
  Code,
} from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
  adminUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export default function AuditLogsClient() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "25",
        action: actionFilter,
        search,
      });

      const res = await fetch(`/api/admin/audit-logs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        setPagination(data.pagination || { total: 0, totalPages: 1 });
      }
    } catch (e) {
      console.error("Error fetching audit logs:", e);
    } finally {
      setLoading(false);
    }
  }, [page, actionFilter, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLogs();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchLogs]);

  const getActionBadge = (action: string) => {
    if (action.includes("LOGIN") || action.includes("LOGOUT")) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Lock className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.includes("BLOG")) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <FileText className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.includes("LEAD")) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Mail className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.includes("SETTINGS") || action.includes("PAGE")) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Settings className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.includes("USER")) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <Shield className="w-3 h-3" />
          {action}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        <Activity className="w-3 h-3" />
        {action}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Search & Action Filters */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search action, user, IP, or details..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="text-xs font-medium px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer"
          >
            <option value="ALL">All Actions</option>
            <option value="LOGIN">LOGIN</option>
            <option value="LOGOUT">LOGOUT</option>
            <option value="CREATE_BLOG_POST">CREATE_BLOG_POST</option>
            <option value="UPDATE_BLOG_POST">UPDATE_BLOG_POST</option>
            <option value="DELETE_BLOG_POST">DELETE_BLOG_POST</option>
            <option value="UPDATE_LEAD_STATUS">UPDATE_LEAD_STATUS</option>
            <option value="ADD_LEAD_NOTE">ADD_LEAD_NOTE</option>
            <option value="CREATE_ADMIN_USER">CREATE_ADMIN_USER</option>
            <option value="UPDATE_ADMIN_USER">UPDATE_ADMIN_USER</option>
            <option value="UPDATE_WEBSITE_SETTINGS">UPDATE_WEBSITE_SETTINGS</option>
            <option value="UPDATE_PAGE_METADATA">UPDATE_PAGE_METADATA</option>
          </select>

          <button
            onClick={fetchLogs}
            title="Refresh Logs"
            className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4">Date &amp; Time</th>
              <th className="py-3 px-4">Administrator</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Target Entity</th>
              <th className="py-3 px-4">IP Address</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {loading && logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                    Loading audit trail...
                  </div>
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No audit logs recorded for this criteria.
                </td>
              </tr>
            ) : (
              logs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                let formattedDetails = "";
                if (log.details) {
                  try {
                    formattedDetails = JSON.stringify(JSON.parse(log.details), null, 2);
                  } catch {
                    formattedDetails = log.details;
                  }
                }

                return (
                  <React.Fragment key={log.id}>
                    <tr className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">
                        <div className="font-medium text-slate-800">
                          {new Date(log.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(log.createdAt).toLocaleTimeString()}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {log.adminUser ? (
                          <div>
                            <div className="font-semibold text-xs text-slate-900 flex items-center gap-1.5">
                              <User className="w-3 h-3 text-emerald-600" />
                              {log.adminUser.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {log.adminUser.email}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">System / Anonymous</span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">{getActionBadge(log.action)}</td>

                      <td className="py-3 px-4 text-xs font-mono text-slate-700">
                        {log.entityType}
                        {log.entityId && (
                          <span className="text-slate-400 text-[10px] block truncate max-w-[140px]">
                            {log.entityId}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-xs font-mono text-slate-500">
                        {log.ipAddress || "127.0.0.1"}
                      </td>

                      <td className="py-3 px-4 text-right">
                        {log.details ? (
                          <button
                            onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 rounded transition cursor-pointer"
                          >
                            <Code className="w-3 h-3" />
                            {isExpanded ? "Hide" : "Inspect"}
                          </button>
                        ) : (
                          <span className="text-xs text-slate-300">—</span>
                        )}
                      </td>
                    </tr>

                    {isExpanded && log.details && (
                      <tr className="bg-slate-50">
                        <td colSpan={6} className="p-4">
                          <div className="bg-slate-900 text-emerald-400 p-3 rounded-lg text-xs font-mono overflow-x-auto max-h-48 shadow-inner">
                            <pre>{formattedDetails}</pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing {logs.length} of {pagination.total} audit events
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 border border-slate-300 bg-white rounded hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-slate-700">
              Page {page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="p-1.5 border border-slate-300 bg-white rounded hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
