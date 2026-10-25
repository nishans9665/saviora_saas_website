"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  source: string;
  status: "NEW" | "IN_PROGRESS" | "CONTACTED" | "RESOLVED" | "SPAM";
  submittedAt: string;
  assignedAdmin?: { id: string; name: string } | null;
  _count?: { notes: number };
}

interface LeadsTableClientProps {
  currentAdminRole: string;
}

export default function LeadsTableClient({ currentAdminRole }: LeadsTableClientProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
        status: statusFilter,
        search,
      });

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load leads");
      const data = await res.json();
      setLeads(data.leads || []);
      setPagination(data.pagination || { total: 0, totalPages: 1 });
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsUpdatingStatus(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
      } else {
        alert("Failed to update lead status.");
      }
    } catch (error) {
      console.error("Status update error:", error);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead? This action cannot be undone.")) {
      return;
    }
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      } else {
        alert("Failed to delete lead.");
      }
    } catch (error) {
      console.error("Delete lead error:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleExportCsv = () => {
    const params = new URLSearchParams({
      export: "csv",
      status: statusFilter,
      search,
    });
    window.location.href = `/api/admin/leads?${params.toString()}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            New
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            In Progress
          </span>
        );
      case "CONTACTED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Mail className="w-3 h-3 text-blue-600" />
            Contacted
          </span>
        );
      case "RESOLVED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Resolved
          </span>
        );
      case "SPAM":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            Spam
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const statusOptions = [
    { label: "All Statuses", value: "ALL" },
    { label: "New", value: "NEW" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Contacted", value: "CONTACTED" },
    { label: "Resolved", value: "RESOLVED" },
    { label: "Spam", value: "SPAM" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Controls Bar */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, subject, message..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
        </div>

        {/* Filter & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Pills */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setStatusFilter(opt.value);
                  setPage(1);
                }}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  statusFilter === opt.value
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            onClick={fetchLeads}
            title="Refresh Leads"
            className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-600" : ""}`} />
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Subject &amp; Inquiry</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Assigned To</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                    Loading leads...
                  </div>
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No contact submissions found.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      {lead.name}
                      {lead._count && lead._count.notes > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-normal px-1.5 py-0.5 rounded bg-slate-100 text-slate-600" title={`${lead._count.notes} internal note(s)`}>
                          <MessageSquare className="w-3 h-3 text-emerald-600" />
                          {lead._count.notes}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" />
                      <a href={`mailto:${lead.email}`} className="hover:underline text-emerald-600">
                        {lead.email}
                      </a>
                    </div>
                    {lead.phone && (
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-medium text-slate-900 line-clamp-1">
                      {lead.subject}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                      {lead.message}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(lead.status)}
                      <select
                        value={lead.status}
                        disabled={isUpdatingStatus === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-xs bg-transparent border-0 text-slate-400 hover:text-slate-700 cursor-pointer focus:ring-0 p-0 font-medium"
                        title="Quick change status"
                      >
                        <option value="NEW">New</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="SPAM">Spam</option>
                      </select>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {lead.assignedAdmin ? (
                      <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                        {lead.assignedAdmin.name}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Unassigned</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                    <div>{new Date(lead.submittedAt).toLocaleDateString()}</div>
                    <div className="text-[11px] text-slate-400">{new Date(lead.submittedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </Link>

                      {currentAdminRole === "SUPER_ADMIN" && (
                        <button
                          onClick={() => handleDelete(lead.id)}
                          disabled={isDeleting === lead.id}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination.totalPages > 1 && (
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing {leads.length} of {pagination.total} leads
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
