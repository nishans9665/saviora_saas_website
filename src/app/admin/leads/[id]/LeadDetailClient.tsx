"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  Send,
  Trash2,
  Calendar,
  Tag,
  Copy,
  Check,
} from "lucide-react";
import { CurrentAdmin } from "@/lib/auth/session";

interface Note {
  id: string;
  note: string;
  createdAt: string;
  adminUser: { id: string; name: string };
}

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
  updatedAt: string;
  assignedAdmin?: { id: string; name: string; email: string } | null;
  notes: Note[];
}

interface LeadDetailClientProps {
  initialLead: Lead;
  adminUsers: { id: string; name: string; role: string }[];
  currentAdmin: CurrentAdmin;
}

export default function LeadDetailClient({
  initialLead,
  adminUsers,
  currentAdmin,
}: LeadDetailClientProps) {
  const router = useRouter();
  const [lead, setLead] = useState<Lead>(initialLead);
  const [status, setStatus] = useState(initialLead.status);
  const [assignedAdminId, setAssignedAdminId] = useState(
    initialLead.assignedAdmin?.id || ""
  );
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingAssignee, setIsUpdatingAssignee] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (newVal: string) => {
    setStatus(newVal as any);
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newVal }),
      });
      if (res.ok) {
        setLead((prev) => ({ ...prev, status: newVal as any }));
      } else {
        alert("Failed to update status.");
        setStatus(lead.status);
      }
    } catch (e) {
      console.error(e);
      setStatus(lead.status);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAssigneeChange = async (newVal: string) => {
    setAssignedAdminId(newVal);
    setIsUpdatingAssignee(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedAdminId: newVal || null }),
      });
      if (res.ok) {
        const found = adminUsers.find((u) => u.id === newVal);
        setLead((prev) => ({
          ...prev,
          assignedAdmin: found ? { id: found.id, name: found.name, email: "" } : null,
        }));
      } else {
        alert("Failed to assign admin.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingAssignee(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmittingNote(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setLead((prev) => ({
          ...prev,
          status: prev.status === "NEW" ? "IN_PROGRESS" : prev.status,
          notes: [data.note, ...prev.notes],
        }));
        if (status === "NEW") setStatus("IN_PROGRESS");
        setNewNote("");
      } else {
        alert("Failed to add note.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to add note.");
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this lead? This cannot be undone.")) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/leads");
      } else {
        alert("Failed to delete lead.");
        setIsDeleting(false);
      }
    } catch (e) {
      console.error(e);
      setIsDeleting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(lead.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "NEW":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            New Inquiry
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            In Progress
          </span>
        );
      case "CONTACTED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            Contacted
          </span>
        );
      case "RESOLVED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Resolved
          </span>
        );
      case "SPAM":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            Spam
          </span>
        );
      default:
        return <span>{s}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Back button and quick actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all leads
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${lead.email}?subject=Re: ${encodeURIComponent(lead.subject)}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-xs"
          >
            <Mail className="w-4 h-4" />
            Reply via Email
          </a>

          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-2xs"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              Call Client
            </a>
          )}

          {currentAdmin.role === "SUPER_ADMIN" && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-300 rounded-lg transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900">{lead.name}</h1>
            {getStatusBadge(lead.status)}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Subject: <span className="font-semibold text-slate-700">{lead.subject}</span>
          </p>
        </div>

        <div className="text-xs text-slate-500 flex flex-col md:items-end gap-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Submitted: {new Date(lead.submittedAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Tag className="w-3.5 h-3.5" />
            <span>Source: {lead.source}</span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message Content */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Inquiry Message
            </h2>
            <div className="whitespace-pre-wrap text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200 font-sans">
              {lead.message}
            </div>
          </div>

          {/* Internal Notes / Follow-ups */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              Internal Team Notes &amp; Timeline ({lead.notes.length})
            </h2>

            {/* Note Submission Box */}
            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log internal note, phone call summary, deal next steps..."
                className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingNote || !newNote.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmittingNote ? "Adding Note..." : "Add Internal Note"}
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              {lead.notes.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4 italic">
                  No notes recorded yet. Add the first update above.
                </p>
              ) : (
                lead.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-sm space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-900 flex items-center gap-1">
                        <User className="w-3 h-3 text-emerald-600" />
                        {note.adminUser.name}
                      </span>
                      <span>{new Date(note.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-700 text-xs whitespace-pre-wrap">
                      {note.note}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Lead Meta, Status, Assignee */}
        <div className="space-y-6">
          {/* Status & Assignment Box */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider text-xs">
              Lead Workflow
            </h3>

            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                Current Status
              </label>
              <select
                value={status}
                disabled={isUpdatingStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer"
              >
                <option value="NEW">New Inquiry</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CONTACTED">Contacted</option>
                <option value="RESOLVED">Resolved</option>
                <option value="SPAM">Spam</option>
              </select>
            </div>

            {/* Assign Admin Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                Assigned Team Member
              </label>
              <select
                value={assignedAdminId}
                disabled={isUpdatingAssignee}
                onChange={(e) => handleAssigneeChange(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer"
              >
                <option value="">Unassigned</option>
                {adminUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider text-xs">
              Client Details
            </h3>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Full Name</span>
                <span className="font-semibold text-slate-800 text-sm">
                  {lead.name}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Email Address</span>
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${lead.email}`}
                    className="font-medium text-emerald-600 hover:underline"
                  >
                    {lead.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-1 text-slate-400 hover:text-slate-600"
                    title="Copy email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Phone Number</span>
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="font-medium text-slate-800 hover:underline"
                  >
                    {lead.phone}
                  </a>
                ) : (
                  <span className="italic text-slate-400">Not provided</span>
                )}
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Source Attribution</span>
                <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  {lead.source}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
