"use client";

import React, { useState } from "react";
import {
  Globe,
  Share2,
  BookOpen,
  Mail,
  Server,
  Save,
  Check,
  AlertCircle,
  Database,
  ShieldCheck,
  Cpu,
} from "lucide-react";

interface SettingsClientProps {
  initialSettings: Record<string, { value: any; group: string }>;
  systemInfo: {
    activeSessions: number;
    nodeEnv: string;
    database: string;
  };
}

export default function SettingsClient({
  initialSettings,
  systemInfo,
}: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<
    "general" | "seo" | "blog" | "contact" | "system"
  >("general");

  // Form state
  const [settings, setSettings] = useState<Record<string, any>>(() => {
    const s: Record<string, any> = {};
    for (const [k, v] of Object.entries(initialSettings)) {
      s[k] = v.value;
    }
    // Set sensible defaults if missing
    return {
      site_name: s.site_name || "Saviora",
      site_tagline: s.site_tagline || "Personal Finance & Budget Tracker",
      site_url: s.site_url || "https://saviora.app",
      contact_email: s.contact_email || "info@saviora.app",
      support_email: s.support_email || "support@saviora.com",
      support_phone: s.support_phone || "+1 (555) 019-2834",
      company_address: s.company_address || "San Francisco, CA, USA",
      default_seo_title: s.default_seo_title || "Saviora – Personal Finance & Budget Tracker",
      default_seo_description:
        s.default_seo_description ||
        "Manage your money with Saviora. Track income and expenses, plan monthly budgets, monitor savings goals, and understand your finances in one place.",
      default_og_image: s.default_og_image || "https://saviora.app/og-image.png",
      twitter_handle: s.twitter_handle || "@SavioraApp",
      linkedin_url: s.linkedin_url || "https://linkedin.com/company/saviora",
      github_url: s.github_url || "https://github.com/saviora-app",
      discord_url: s.discord_url || "https://discord.gg/saviora",
      posts_per_page: s.posts_per_page || 9,
      enable_comments: s.enable_comments ?? false,
      lead_notify_email: s.lead_notify_email || "admin@saviora.app",
      contact_auto_subject:
        s.contact_auto_subject || "Thank you for contacting Saviora",
      contact_auto_reply:
        s.contact_auto_reply ||
        "We have received your message and our team will get back to you within 24 business hours.",
      ...s,
    };
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSavedSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");
    setSavedSuccess(false);

    try {
      // Map keys to their groups
      const payload: Record<string, { value: any; group: string }> = {
        site_name: { value: settings.site_name, group: "general" },
        site_tagline: { value: settings.site_tagline, group: "general" },
        site_url: { value: settings.site_url, group: "general" },
        company_address: { value: settings.company_address, group: "general" },
        contact_email: { value: settings.contact_email, group: "contact" },
        support_email: { value: settings.support_email, group: "contact" },
        support_phone: { value: settings.support_phone, group: "contact" },
        default_seo_title: { value: settings.default_seo_title, group: "seo" },
        default_seo_description: {
          value: settings.default_seo_description,
          group: "seo",
        },
        default_og_image: { value: settings.default_og_image, group: "seo" },
        twitter_handle: { value: settings.twitter_handle, group: "seo" },
        linkedin_url: { value: settings.linkedin_url, group: "seo" },
        github_url: { value: settings.github_url, group: "seo" },
        discord_url: { value: settings.discord_url, group: "seo" },
        posts_per_page: {
          value: parseInt(settings.posts_per_page, 10) || 9,
          group: "blog",
        },
        enable_comments: { value: Boolean(settings.enable_comments), group: "blog" },
        lead_notify_email: {
          value: settings.lead_notify_email,
          group: "contact",
        },
        contact_auto_subject: {
          value: settings.contact_auto_subject,
          group: "contact",
        },
        contact_auto_reply: {
          value: settings.contact_auto_reply,
          group: "contact",
        },
      };

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: payload }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update settings");
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "seo", label: "SEO & Social", icon: Share2 },
    { id: "blog", label: "Blog & Content", icon: BookOpen },
    { id: "contact", label: "Contact & Leads", icon: Mail },
    { id: "system", label: "System Health", icon: Server },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 space-x-1 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-white border-t-2 border-emerald-600 text-emerald-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 flex items-center gap-2 animate-in fade-in">
            <Check className="w-5 h-5 shrink-0" />
            <span>Website settings have been successfully saved and applied!</span>
          </div>
        )}

        {/* 1. GENERAL TAB */}
        {activeTab === "general" && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Brand &amp; Website Identity
              </h2>
              <p className="text-xs text-slate-500">
                Core identity information displayed in headers, footers, and emails.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Website Name
                </label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => handleChange("site_name", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Tagline / Subheading
                </label>
                <input
                  type="text"
                  value={settings.site_tagline}
                  onChange={(e) => handleChange("site_tagline", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Production URL
                </label>
                <input
                  type="url"
                  value={settings.site_url}
                  onChange={(e) => handleChange("site_url", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Physical Office Address
                </label>
                <input
                  type="text"
                  value={settings.company_address}
                  onChange={(e) => handleChange("company_address", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. SEO & SOCIAL TAB */}
        {activeTab === "seo" && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Global Search Engine Optimization &amp; Social Links
              </h2>
              <p className="text-xs text-slate-500">
                Default fallback metadata and external social network profiles.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Default Title Tag
                </label>
                <input
                  type="text"
                  value={settings.default_seo_title}
                  onChange={(e) => handleChange("default_seo_title", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Default Meta Description
                </label>
                <textarea
                  rows={3}
                  value={settings.default_seo_description}
                  onChange={(e) => handleChange("default_seo_description", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  OpenGraph Social Share Image URL
                </label>
                <input
                  type="url"
                  value={settings.default_og_image}
                  onChange={(e) => handleChange("default_og_image", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Twitter / X Handle
                  </label>
                  <input
                    type="text"
                    value={settings.twitter_handle}
                    onChange={(e) => handleChange("twitter_handle", e.target.value)}
                    placeholder="@SavioraApp"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={settings.linkedin_url}
                    onChange={(e) => handleChange("linkedin_url", e.target.value)}
                    placeholder="https://linkedin.com/company/saviora"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={settings.github_url}
                    onChange={(e) => handleChange("github_url", e.target.value)}
                    placeholder="https://github.com/saviora-app"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Discord Community URL
                  </label>
                  <input
                    type="url"
                    value={settings.discord_url}
                    onChange={(e) => handleChange("discord_url", e.target.value)}
                    placeholder="https://discord.gg/saviora"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. BLOG & CONTENT TAB */}
        {activeTab === "blog" && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Blog &amp; Publication Preferences
              </h2>
              <p className="text-xs text-slate-500">
                Configure article pagination and public reading experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Articles Per Page (Archive)
                </label>
                <input
                  type="number"
                  min={3}
                  max={30}
                  value={settings.posts_per_page}
                  onChange={(e) => handleChange("posts_per_page", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
                <p className="text-[11px] text-slate-500">
                  Number of published posts displayed per page on /blog.
                </p>
              </div>

              <div className="space-y-1.5 flex flex-col justify-center">
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <div className="text-xs font-semibold text-slate-800">
                      Enable Reader Comments
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Allow public readers to post moderated comments.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enable_comments}
                    onChange={(e) => handleChange("enable_comments", e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. CONTACT & LEADS TAB */}
        {activeTab === "contact" && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Contact Forms &amp; Lead Notifications
              </h2>
              <p className="text-xs text-slate-500">
                Setup email notification routing and automatic client confirmations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Lead Notification Email
                  </label>
                  <input
                    type="email"
                    value={settings.lead_notify_email}
                    onChange={(e) => handleChange("lead_notify_email", e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Customer Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.support_email}
                    onChange={(e) => handleChange("support_email", e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Support Hotline
                  </label>
                  <input
                    type="text"
                    value={settings.support_phone}
                    onChange={(e) => handleChange("support_phone", e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700">
                  Client Auto-Reply Subject
                </label>
                <input
                  type="text"
                  value={settings.contact_auto_subject}
                  onChange={(e) => handleChange("contact_auto_subject", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Client Auto-Reply Body Text
                </label>
                <textarea
                  rows={3}
                  value={settings.contact_auto_reply}
                  onChange={(e) => handleChange("contact_auto_reply", e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. SYSTEM HEALTH TAB */}
        {activeTab === "system" && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Runtime Environment &amp; System Health
              </h2>
              <p className="text-xs text-slate-500">
                Live status of server dependencies, database connectivity, and active sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-600 mb-2 font-semibold text-xs">
                  <Database className="w-4 h-4" />
                  Database
                </div>
                <div className="text-sm font-bold text-slate-900">
                  MySQL 8.0 Connected
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  {systemInfo.database}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-600 mb-2 font-semibold text-xs">
                  <Cpu className="w-4 h-4" />
                  Application Server
                </div>
                <div className="text-sm font-bold text-slate-900">
                  Next.js 16.2.6 (Turbopack)
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Environment: <span className="font-mono">{systemInfo.nodeEnv}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-600 mb-2 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  Security Sessions
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {systemInfo.activeSessions} Active Admin Session(s)
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  JWT + MySQL DB Revocation Active
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Bar */}
        {activeTab !== "system" && (
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>Saving Changes...</>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Website Settings
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
