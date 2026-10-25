"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  ExternalLink,
  Edit2,
  Check,
  AlertCircle,
  Search,
  CheckCircle,
  XCircle,
  X,
  Save,
  RefreshCw,
} from "lucide-react";

interface PageMeta {
  id: string;
  path: string;
  name: string;
  title: string;
  description: string;
  canonicalUrl: string;
  isIndexed: boolean;
  updatedAt: string | null;
}

export default function PagesManagerClient() {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPage, setSelectedPage] = useState<PageMeta | null>(null);

  // Edit form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [isIndexed, setIsIndexed] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data.pages || []);
      }
    } catch (e) {
      console.error("Error fetching pages:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openEditor = (page: PageMeta) => {
    setSelectedPage(page);
    setTitle(page.title);
    setDescription(page.description);
    setCanonicalUrl(page.canonicalUrl);
    setIsIndexed(page.isIndexed);
    setErrorMsg("");
    setSaveSuccess(false);
  };

  const closeEditor = () => {
    setSelectedPage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage) return;

    setSaving(true);
    setErrorMsg("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedPage.id,
          title,
          description,
          canonicalUrl,
          isIndexed,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update page metadata");
      }

      setPages((prev) =>
        prev.map((p) =>
          p.id === selectedPage.id
            ? { ...p, title, description, canonicalUrl, isIndexed, updatedAt: new Date().toISOString() }
            : p
        )
      );

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        closeEditor();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const filteredPages = pages.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.path.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top search & counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages by name, path..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
        </div>

        <button
          onClick={fetchPages}
          title="Refresh Pages"
          className="p-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition shadow-2xs self-end sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-600" : ""}`} />
        </button>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="py-3 px-4">Page & Path</th>
                <th className="py-3 px-4">Page Title Tag</th>
                <th className="py-3 px-4">Search Snippet Preview</th>
                <th className="py-3 px-4">Indexing</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                      Loading pages...
                    </div>
                  </td>
                </tr>
              ) : filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No pages matching your search.
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        {page.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                        <span>{page.path}</span>
                        <a
                          href={page.path}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 hover:text-emerald-700"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs font-medium text-slate-800 text-xs">
                      <div className="line-clamp-1">{page.title}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-sm text-xs text-slate-600">
                      <div className="line-clamp-2">{page.description}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {page.isIndexed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle className="w-3 h-3" />
                          Indexed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          <XCircle className="w-3 h-3" />
                          NoIndex
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openEditor(page)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md transition cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit SEO
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over or Modal Editor */}
      {selectedPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  Edit SEO Metadata: {selectedPage.name}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">{selectedPage.path}</div>
              </div>
              <button
                onClick={closeEditor}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {saveSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Page metadata updated successfully!</span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700">
                    Title Tag
                  </label>
                  <span className={`text-[11px] ${title.length > 60 ? "text-amber-600 font-medium" : "text-slate-400"}`}>
                    {title.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700">
                    Meta Description
                  </label>
                  <span className={`text-[11px] ${description.length > 160 ? "text-amber-600 font-medium" : "text-slate-400"}`}>
                    {description.length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Canonical URL */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Indexing Checkbox */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    Search Engine Indexing
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Permit Google and Bing to index this page in search results.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isIndexed}
                  onChange={(e) => setIsIndexed(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : "Save Page SEO"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
