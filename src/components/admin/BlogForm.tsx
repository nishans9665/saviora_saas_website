"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const RichTextEditor = dynamic(
  () => import("./editor/RichTextEditor").then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] rounded-xl bg-slate-50 border border-slate-200 animate-pulse flex items-center justify-center text-xs text-slate-400 font-medium">
        Loading rich text editor...
      </div>
    ),
  }
);
import {
  Save,
  ArrowLeft,
  Sparkles,
  Image as ImageIcon,
  Link as LinkIcon,
  Globe,
  Tag,
  Folder,
  Eye,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Heading1,
  Heading2,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  UploadCloud,
  Upload,
  Trash2,
  FileImage,
  RefreshCw,
  X,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface TagItem {
  id: string;
  name: string;
}

interface BlogPostInitialData {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  publishedAt?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  categories?: { categoryId: string }[];
  tags?: { tagId: string }[];
}

interface BlogFormProps {
  initialData?: BlogPostInitialData;
  availableCategories: Category[];
  availableTags: TagItem[];
  isEditMode?: boolean;
}

export function BlogForm({
  initialData,
  availableCategories,
  availableTags,
  isEditMode = false,
}: BlogFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialData?.slug));
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "");
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initialData?.featuredImageAlt || "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED">(
    initialData?.status || "DRAFT"
  );
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.categories?.map((c) => c.categoryId) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags?.map((t) => t.tagId) || []
  );

  // Featured Image Upload state
  const [imageSourceMode, setImageSourceMode] = useState<"upload" | "url">("upload");
  const [isUploadingFeatured, setIsUploadingFeatured] = useState(false);
  const [featuredUploadError, setFeaturedUploadError] = useState("");
  const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);
  const featuredFileInputRef = useRef<HTMLInputElement>(null);


  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Automatically derive slug from title if not manually customized
  useEffect(() => {
    if (!isSlugManual && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  }, [title, isSlugManual]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  // Helper to upload a file to /api/admin/upload
  const uploadFileToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to upload image.");
    }

    return data.url;
  };

  // Handle Featured Image File Selection
  const handleFeaturedFileChange = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeaturedUploadError("Selected file is not an image. Please choose JPG, PNG, WEBP, or SVG.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFeaturedUploadError("File size exceeds 10MB limit. Please upload a smaller image.");
      return;
    }

    setFeaturedUploadError("");
    setIsUploadingFeatured(true);

    try {
      const publicUrl = await uploadFileToServer(file);
      setFeaturedImage(publicUrl);

      // Auto-populate alt text if empty
      if (!featuredImageAlt) {
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ")
          .trim();
        setFeaturedImageAlt(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    } catch (err: any) {
      setFeaturedUploadError(err.message || "Failed to upload image.");
    } finally {
      setIsUploadingFeatured(false);
      if (featuredFileInputRef.current) {
        featuredFileInputRef.current.value = "";
      }
    }
  };

  // Drag and drop events for featured image
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFeatured(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFeatured(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFeatured(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFeaturedFileChange(e.dataTransfer.files[0]);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSaving(true);

    if (!title.trim()) {
      setErrorMessage("Article title is required.");
      setIsSaving(false);
      return;
    }

    if (!content.trim()) {
      setErrorMessage("Article content is required.");
      setIsSaving(false);
      return;
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      featuredImage: featuredImage.trim() || null,
      featuredImageAlt: featuredImageAlt.trim() || null,
      status,
      seoTitle: seoTitle.trim() || null,
      metaDescription: metaDescription.trim() || null,
      canonicalUrl: canonicalUrl.trim() || null,
      categoryIds: selectedCategories,
      tagIds: selectedTags,
    };

    try {
      const url = isEditMode
        ? `/api/admin/blog/${initialData?.id}`
        : "/api/admin/blog";

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save post");
      }

      setSuccessMessage(
        isEditMode ? "Post updated successfully!" : "Post created and saved successfully!"
      );

      if (!isEditMode && data.post?.id) {
        setTimeout(() => {
          router.push(`/admin/blog/${data.post.id}/edit`);
        }, 1200);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Back to Blog Posts"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Draft, schedule, or publish articles to the Saviora public blog.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isEditMode && status === "PUBLISHED" && slug && (
            <a
              href={`/blog/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live</span>
            </a>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? "Saving..." : isEditMode ? "Update Post" : "Publish / Save Post"}</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 2-Column Layout (Content vs Settings) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Content, 2 Cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title & Slug */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Post Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 7 Proven Strategies to Build an Emergency Fund in 2026"
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugManual(!isSlugManual)}
                  className="text-[11px] text-emerald-600 hover:underline cursor-pointer"
                >
                  {isSlugManual ? "Auto-generate from title" : "Edit manually"}
                </button>
              </div>
              <div className="flex items-center rounded-lg bg-slate-50 border border-slate-300 px-3 py-2 text-xs">
                <span className="text-slate-400 mr-1 select-none">/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="post-url-slug"
                  className="flex-1 bg-transparent text-emerald-700 font-medium focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Short Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Brief summary for search engines and article cards..."
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Main Content & Rich Text Editor */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-slate-800">
                  Article Content <span className="text-rose-500">*</span>
                </label>
                <p className="text-[11px] text-slate-400">
                  Rich visual editor with headings, tables, callouts, embeds, image upload, and HTML source sync.
                </p>
              </div>
            </div>

            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Start drafting your article..."
              minHeight="460px"
            />
          </div>

          {/* SEO Metadata Box */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Globe className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Search Engine Optimization (SEO)</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Custom SEO Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Leave blank to use post title"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={2}
                placeholder="Leave blank to use post excerpt"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Custom Canonical URL
              </label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://saviora.app/blog/original-article"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column (Publish Controls & Categorization, 1 Col) */}
        <div className="space-y-5">
          {/* Publish Controls */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Publish Settings</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="DRAFT">Draft (Unpublished)</option>
                <option value="PUBLISHED">Published (Live on Website)</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="ARCHIVED">Archived (Hidden)</option>
              </select>
            </div>

            <div className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {status === "PUBLISHED" ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Live on https://saviora.app/blog
                </span>
              ) : status === "DRAFT" ? (
                <span className="text-slate-500">Saved only inside admin CMS.</span>
              ) : (
                <span className="text-amber-700">Scheduled / Archived.</span>
              )}
            </div>
          </div>

          {/* Featured Image with PC Upload & Drag-and-Drop */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Featured Image</span>
              </h3>

              {/* Mode Toggle: Upload from PC vs URL */}
              <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageSourceMode("upload")}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    imageSourceMode === "upload"
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Upload PC
                </button>
                <button
                  type="button"
                  onClick={() => setImageSourceMode("url")}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    imageSourceMode === "url"
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  URL
                </button>
              </div>
            </div>

            {/* Error banner if upload fails */}
            {featuredUploadError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{featuredUploadError}</span>
              </div>
            )}

            {/* Hidden native file input for PC uploads */}
            <input
              ref={featuredFileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFeaturedFileChange(e.target.files[0]);
                }
              }}
            />

            {/* Mode 1: Upload from PC */}
            {imageSourceMode === "upload" && !featuredImage && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isUploadingFeatured && featuredFileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  isDraggingFeatured
                    ? "border-emerald-500 bg-emerald-50/60 scale-[1.01]"
                    : "border-slate-300 hover:border-emerald-500 hover:bg-slate-50/80"
                } ${isUploadingFeatured ? "pointer-events-none opacity-80" : ""}`}
              >
                {isUploadingFeatured ? (
                  <div className="py-4 space-y-2">
                    <Loader2 className="w-7 h-7 animate-spin text-emerald-600 mx-auto" />
                    <div className="text-xs font-semibold text-slate-800">
                      Uploading image from your PC...
                    </div>
                    <div className="text-[11px] text-slate-500">Please wait a moment</div>
                  </div>
                ) : (
                  <div className="space-y-2 py-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-emerald-700 hover:underline">
                        Choose image from PC
                      </span>
                      <span className="text-xs text-slate-500"> or drag &amp; drop</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      PNG, JPG, WEBP, GIF, SVG up to 10MB
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Mode 2: External Image URL */}
            {imageSourceMode === "url" && !featuredImage && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image Direct URL
                </label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>
            )}

            {/* Image Preview & Actions if an image is selected */}
            {featuredImage && (
              <div className="space-y-2.5">
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video relative bg-slate-100 group shadow-2xs">
                  <img
                    src={featuredImage}
                    alt={featuredImageAlt || "Featured image preview"}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Action Bar */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={() => featuredFileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/95 text-slate-800 text-xs font-semibold hover:bg-white shadow-sm transition-transform hover:scale-105 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFeaturedImage("");
                        setFeaturedUploadError("");
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
                  <span className="truncate max-w-[200px] font-mono text-[10px] text-slate-600" title={featuredImage}>
                    {featuredImage}
                  </span>
                  <button
                    type="button"
                    onClick={() => featuredFileInputRef.current?.click()}
                    className="text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    Upload different file
                  </button>
                </div>
              </div>
            )}

            {/* Alt Text Input */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Image Alt Text (SEO &amp; Accessibility)
              </label>
              <input
                type="text"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Descriptive image text for search engines"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-emerald-600" />
                <span>Categories</span>
              </h3>
              <Link href="/admin/categories" className="text-[11px] text-emerald-600 font-semibold hover:underline">
                + Add
              </Link>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {availableCategories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 text-xs text-slate-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-600" />
              <span>Tags</span>
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const active = selectedTags.includes(tag.id);
                return (
                  <button
                    type="button"
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-indigo-600 text-white font-semibold"
                        : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    #{tag.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
