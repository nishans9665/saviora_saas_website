"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  ShieldCheck,
  Edit2,
  Trash2,
  Key,
  CheckCircle,
  XCircle,
  X,
  Mail,
  Calendar,
  AlertCircle,
  Lock,
} from "lucide-react";

interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  _count?: { authoredPosts: number; assignedLeads: number };
}

interface AdminUsersClientProps {
  initialUsers: AdminUserItem[];
  currentAdminId: string;
}

export default function AdminUsersClient({
  initialUsers,
  currentAdminId,
}: AdminUsersClientProps) {
  const [users, setUsers] = useState<AdminUserItem[]>(initialUsers);
  const [modalMode, setModalMode] = useState<"CREATE" | "EDIT" | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"SUPER_ADMIN" | "ADMIN" | "EDITOR">("EDITOR");
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreateModal = () => {
    setSelectedUser(null);
    setName("");
    setEmail("");
    setPassword("");
    setRole("EDITOR");
    setIsActive(true);
    setFormError("");
    setModalMode("CREATE");
  };

  const openEditModal = (user: AdminUserItem) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword(""); // Leave empty unless changing
    setRole(user.role);
    setIsActive(user.isActive);
    setFormError("");
    setModalMode("EDIT");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedUser(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      if (modalMode === "CREATE") {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to create administrator");
        }
        setUsers((prev) => [data.user, ...prev]);
        closeModal();
      } else if (modalMode === "EDIT" && selectedUser) {
        const body: any = { name, email, role, isActive };
        if (password.trim()) body.password = password.trim();

        const res = await fetch(`/api/admin/users/${selectedUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to update administrator");
        }
        setUsers((prev) =>
          prev.map((u) => (u.id === selectedUser.id ? { ...u, ...data.user } : u))
        );
        closeModal();
      }
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (user: AdminUserItem) => {
    if (user.id === currentAdminId) {
      alert("You cannot delete your own active administrator account.");
      return;
    }

    if (
      !confirm(
        `Are you sure you want to delete ${user.name}? If they have authored posts, their account will be deactivated instead.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete user");
        return;
      }

      if (data.message) {
        // Was deactivated
        alert(data.message);
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, isActive: false } : u))
        );
      } else {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting user");
    }
  };

  const getRoleBadge = (r: string) => {
    switch (r) {
      case "SUPER_ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            Super Admin
          </span>
        );
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            Admin
          </span>
        );
      case "EDITOR":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Editor
          </span>
        );
      default:
        return <span>{r}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Total Administrators: <span className="font-semibold text-slate-900">{users.length}</span>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-xs cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          Add New Administrator
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Authored Posts</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      {user.name}
                      {user.id === currentAdminId && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">{getRoleBadge(user.role)}</td>

                  <td className="py-3.5 px-4">
                    {user.isActive ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600">
                        <XCircle className="w-3.5 h-3.5" />
                        Suspended
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-slate-700 font-medium">
                    {user._count?.authoredPosts || 0} posts
                  </td>

                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {user.lastLoginAt ? (
                      new Date(user.lastLoginAt).toLocaleString()
                    ) : (
                      <span className="italic text-slate-400">Never</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-md transition cursor-pointer"
                        title="Edit Account"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {user.id !== currentAdminId && (
                        <button
                          onClick={() => handleDelete(user)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                {modalMode === "CREATE" ? "Create New Administrator" : `Edit ${selectedUser?.name}`}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full text-sm px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@saviora.app"
                  className="w-full text-sm px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  {modalMode === "CREATE" ? "Initial Password" : "New Password (Leave blank to keep current)"}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required={modalMode === "CREATE"}
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={modalMode === "CREATE" ? "Min 8 characters" : "••••••••"}
                    className="w-full text-sm pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Permission Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full text-sm px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer"
                >
                  <option value="SUPER_ADMIN">Super Admin (All permissions &amp; user management)</option>
                  <option value="ADMIN">Admin (Blog, Leads, Settings)</option>
                  <option value="EDITOR">Editor (Blog posts only)</option>
                </select>
              </div>

              {modalMode === "EDIT" && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <div className="text-xs font-medium text-slate-800">Account Status</div>
                    <div className="text-[11px] text-slate-500">Suspended users cannot log in.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      isActive ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-xs cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : modalMode === "CREATE" ? "Create Administrator" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
