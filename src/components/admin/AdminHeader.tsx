"use client";

import React from "react";
import Link from "next/link";
import { Plus, ExternalLink, Database } from "lucide-react";
import { CurrentAdmin } from "@/lib/auth/session";

interface AdminHeaderProps {
  currentAdmin: CurrentAdmin;
  title?: string;
  subtitle?: string;
}

export function AdminHeader({ currentAdmin, title, subtitle }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Title & Mobile offset */}
      <div className="pl-12 lg:pl-0 flex flex-col justify-center">
        <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
          {title || "Dashboard Overview"}
        </h1>
        {subtitle && <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Database Status Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium">
          <Database className="w-3 h-3 text-emerald-600" />
          <span>MySQL Connected</span>
        </div>

        {/* Quick Action: New Post */}
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Post</span>
        </Link>

        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium transition-colors"
          title="Open live site in new tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Site</span>
        </Link>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {currentAdmin.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden xl:block text-left text-xs leading-none">
            <div className="font-semibold text-slate-800">{currentAdmin.name}</div>
            <div className="text-[10px] text-slate-500 capitalize">{currentAdmin.role.toLowerCase().replace("_", " ")}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
