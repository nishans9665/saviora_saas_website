"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Inbox,
  Globe,
  Users,
  Settings,
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Menu,
  X,
} from "lucide-react";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";
import { CurrentAdmin } from "@/lib/auth/session";

interface AdminSidebarProps {
  currentAdmin: CurrentAdmin;
}

export function AdminSidebar({ currentAdmin }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isSuperAdmin = currentAdmin.role === "SUPER_ADMIN";
  const isAdminOrSuper = currentAdmin.role === "SUPER_ADMIN" || currentAdmin.role === "ADMIN";

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
      visible: true,
    },
    {
      name: "Blog Posts",
      href: "/admin/blog",
      icon: FileText,
      exact: false,
      visible: true,
    },
    {
      name: "Categories & Tags",
      href: "/admin/categories",
      icon: Tags,
      exact: false,
      visible: true,
    },
    {
      name: "Contact Leads",
      href: "/admin/leads",
      icon: Inbox,
      exact: false,
      visible: isAdminOrSuper,
    },
    {
      name: "Website Pages",
      href: "/admin/pages",
      icon: Globe,
      exact: false,
      visible: true,
    },
    {
      name: "Admin Users",
      href: "/admin/users",
      icon: Users,
      exact: false,
      visible: isSuperAdmin,
    },
    {
      name: "Website Settings",
      href: "/admin/settings",
      icon: Settings,
      exact: false,
      visible: isAdminOrSuper,
    },
    {
      name: "Activity Logs",
      href: "/admin/activity-logs",
      icon: Activity,
      exact: false,
      visible: isAdminOrSuper,
    },
  ].filter((item) => item.visible);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      window.location.href = "/login-admin";
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Drawer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200 shadow-xs transition-all duration-200 select-none ${
          collapsed ? "w-20" : "w-64"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand & Collapse Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-white">
          {!collapsed ? (
            <Link href="/admin" className="flex items-center gap-2 overflow-hidden">
              <Image
                src={logoSaviora}
                alt="Saviora"
                width={130}
                height={38}
                className="h-8 w-auto object-contain"
                priority
              />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                CMS
              </span>
            </Link>
          ) : (
            <Link href="/admin" className="mx-auto text-emerald-600 font-extrabold text-xl">
              S
            </Link>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigationItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  active
                    ? "bg-emerald-600 text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-emerald-600"}`} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70 space-y-2">
          {!collapsed ? (
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-slate-900 truncate">{currentAdmin.name}</div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                  <Shield className="w-3 h-3 text-emerald-600" />
                  <span>{currentAdmin.role.replace("_", " ")}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              {!collapsed && <span>View Website</span>}
            </Link>
            {!collapsed && <span className="text-[10px] text-slate-400">v1.0</span>}
          </div>
        </div>
      </aside>
    </>
  );
}
