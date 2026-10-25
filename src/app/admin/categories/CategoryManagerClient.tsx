"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Folder, Tag, Plus, Trash2, Loader2, AlertCircle } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  _count: { posts: number };
}

interface TagItem {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
}

export function CategoryManagerClient({
  initialCategories,
  initialTags,
}: {
  initialCategories: Category[];
  initialTags: TagItem[];
}) {
  const router = useRouter();

  // Category state
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [isCatSubmitting, setIsCatSubmitting] = useState(false);

  // Tag state
  const [tagName, setTagName] = useState("");
  const [tagSlug, setTagSlug] = useState("");
  const [isTagSubmitting, setIsTagSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    setIsCatSubmitting(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "category",
          name: catName.trim(),
          slug: catSlug.trim() || undefined,
          description: catDesc.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add category");
      }
      setCatName("");
      setCatSlug("");
      setCatDesc("");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to add category");
    } finally {
      setIsCatSubmitting(false);
    }
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;
    setIsTagSubmitting(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tag",
          name: tagName.trim(),
          slug: tagSlug.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add tag");
      }
      setTagName("");
      setTagSlug("");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to add tag");
    } finally {
      setIsTagSubmitting(false);
    }
  };

  const handleDelete = async (type: "category" | "tag", id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${type} "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories?type=${type}&id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || `Failed to delete ${type}`);
        return;
      }
      router.refresh();
    } catch (e) {
      console.error(e);
      alert(`Error deleting ${type}`);
    }
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Folder className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">Categories ({initialCategories.length})</h2>
          </div>

          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold text-slate-700">Add New Category</h3>
            <div>
              <input
                type="text"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="Category Name"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={catSlug}
                onChange={(e) => setCatSlug(e.target.value)}
                placeholder="Slug (optional, auto-generated)"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>
            <div>
              <textarea
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                placeholder="Description (optional)"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              disabled={isCatSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
            >
              {isCatSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              <span>Add Category</span>
            </button>
          </form>

          {/* Categories List */}
          <div className="rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
            {initialCategories.map((c) => (
              <div key={c.id} className="p-3.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/80 transition-colors">
                <div>
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  <div className="text-[11px] text-slate-500">/blog?category={c.slug} &bull; {c._count.posts} posts</div>
                  {c.description && <p className="text-[11px] text-slate-600 mt-1">{c.description}</p>}
                </div>
                <button
                  onClick={() => handleDelete("category", c.id, c.name)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Delete category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Tag className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">Blog Tags ({initialTags.length})</h2>
          </div>

          {/* Add Tag Form */}
          <form onSubmit={handleAddTag} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold text-slate-700">Add New Tag</h3>
            <div>
              <input
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="Tag Name (e.g. Budgeting)"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={tagSlug}
                onChange={(e) => setTagSlug(e.target.value)}
                placeholder="Tag Slug (optional, auto-generated)"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              disabled={isTagSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
            >
              {isTagSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              <span>Add Tag</span>
            </button>
          </form>

          {/* Tags Cloud / List */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex flex-wrap gap-2">
              {initialTags.map((t) => (
                <div
                  key={t.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 group hover:border-slate-300 transition-colors"
                >
                  <span className="font-medium text-slate-900">#{t.name}</span>
                  <span className="text-[10px] text-slate-500">({t._count.posts})</span>
                  <button
                    onClick={() => handleDelete("tag", t.id, t.name)}
                    className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete Tag"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
