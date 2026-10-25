"use client";

import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  RemoveFormatting,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Minus,
  Table as TableIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  CodeXml,
  Undo2,
  Redo2,
  Maximize2,
  Minimize2,
  Sparkles,
  HelpCircle,
  Plus,
  Trash2,
  Upload,
  UploadCloud,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  Palette,
  Highlighter,
  FileCode,
  Eye,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Type,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

import "./editor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const COLOR_PALETTE = [
  { name: "Default", color: "#1e293b" },
  { name: "Emerald", color: "#059669" },
  { name: "Teal", color: "#0d9488" },
  { name: "Indigo", color: "#4f46e5" },
  { name: "Blue", color: "#2563eb" },
  { name: "Purple", color: "#9333ea" },
  { name: "Rose", color: "#e11d48" },
  { name: "Amber", color: "#d97706" },
  { name: "Slate", color: "#64748b" },
];

const HIGHLIGHT_PALETTE = [
  { name: "Yellow", color: "#fef08a" },
  { name: "Emerald", color: "#a7f3d0" },
  { name: "Sky", color: "#bae6fd" },
  { name: "Purple", color: "#e9d5ff" },
  { name: "Rose", color: "#fecdd3" },
  { name: "Amber", color: "#fde68a" },
  { name: "None", color: "" },
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start drafting your article...",
  minHeight = "450px",
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [rawHtml, setRawHtml] = useState(value || "");

  // Dialog States
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkOpenInNewTab, setLinkOpenInNewTab] = useState(true);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageSourceTab, setImageSourceTab] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageAlignment, setImageAlignment] = useState<"center" | "left" | "right">("center");
  const [imageWidth, setImageWidth] = useState<"100%" | "75%" | "50%">("100%");
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Active Dropdowns
  const [openDropdown, setOpenDropdown] = useState<
    "heading" | "color" | "highlight" | "align" | "blocks" | "table" | null
  >(null);

  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize TipTap
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: false, // will use custom pre / code block
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-emerald-600 underline font-medium hover:text-emerald-700",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-xl max-w-full my-4 mx-auto",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        inline: false,
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: "aspect-video w-full rounded-xl my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CharacterCount,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setRawHtml(html);
      onChange(html);
    },
  });

  // Keep editor content in sync when initial value loads or changes from external reset
  useEffect(() => {
    if (editor && !editor.isDestroyed && value !== editor.getHTML() && !isHtmlMode) {
      // Only set content if genuinely divergent and not typing in HTML mode
      if (Math.abs(value.length - editor.getHTML().length) > 5) {
        editor.commands.setContent(value, { emitUpdate: false });
        setRawHtml(value);
      }
    }
  }, [value, editor, isHtmlMode]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        editorContainerRef.current &&
        !editorContainerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // HTML Source Mode switch
  const toggleHtmlMode = () => {
    if (!editor) return;

    if (isHtmlMode) {
      // Switching back from HTML to Visual
      editor.commands.setContent(rawHtml, { emitUpdate: true });
      onChange(rawHtml);
      setIsHtmlMode(false);
    } else {
      // Switching from Visual to HTML
      const currentHtml = editor.getHTML();
      setRawHtml(currentHtml);
      setIsHtmlMode(true);
    }
    setOpenDropdown(null);
  };

  const handleRawHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setRawHtml(newHtml);
    onChange(newHtml);
  };

  // Link Handlers
  const openLinkDialog = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    setLinkUrl(previousUrl);
    setLinkText(selectedText);
    setLinkOpenInNewTab(true);
    setLinkModalOpen(true);
  };

  const applyLink = () => {
    if (!editor) return;

    if (!linkUrl.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkModalOpen(false);
      return;
    }

    let formattedUrl = linkUrl.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://") &&
      !formattedUrl.startsWith("mailto:") &&
      !formattedUrl.startsWith("tel:") &&
      !formattedUrl.startsWith("/")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    if (linkText && editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent(
          `<a href="${formattedUrl}" ${
            linkOpenInNewTab ? 'target="_blank" rel="noopener noreferrer"' : ""
          }>${linkText}</a>`
        )
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: formattedUrl,
          target: linkOpenInNewTab ? "_blank" : undefined,
          rel: linkOpenInNewTab ? "noopener noreferrer" : undefined,
        })
        .run();
    }

    setLinkModalOpen(false);
  };

  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkModalOpen(false);
  };

  // Image Upload & Insertion Handlers
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageUploadError("Selected file is not an image. Please choose PNG, JPG, WEBP, or SVG.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageUploadError("File exceeds 10MB limit.");
      return;
    }

    setImageUploadError("");
    setIsUploadingImg(true);

    try {
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

      setImageUrl(data.url);
      if (!imageAlt) {
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ")
          .trim();
        setImageAlt(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    } catch (err: any) {
      setImageUploadError(err.message || "Failed to upload image.");
    } finally {
      setIsUploadingImg(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const insertImage = () => {
    if (!editor || !imageUrl.trim()) return;

    let style = "";
    if (imageWidth === "50%") style += "max-width: 50%; ";
    if (imageWidth === "75%") style += "max-width: 75%; ";
    if (imageWidth === "100%") style += "max-width: 100%; ";

    if (imageAlignment === "left") {
      style += "margin-right: auto; margin-left: 0; ";
    } else if (imageAlignment === "right") {
      style += "margin-left: auto; margin-right: 0; ";
    } else {
      style += "margin-left: auto; margin-right: auto; ";
    }

    if (imageCaption.trim()) {
      // Insert figure with caption
      const figureHtml = `
        <figure class="my-5 text-center" style="${style}">
          <img src="${imageUrl.trim()}" alt="${imageAlt.trim() || "Article image"}" class="rounded-xl shadow-xs mx-auto" />
          <figcaption class="text-xs text-slate-500 mt-2 italic">${imageCaption.trim()}</figcaption>
        </figure>
      `;
      editor.chain().focus().insertContent(figureHtml).run();
    } else {
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl.trim(),
          alt: imageAlt.trim() || undefined,
        })
        .run();
    }

    // Reset image modal
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setImageModalOpen(false);
  };

  // Video Embed Handlers
  const insertVideo = () => {
    if (!editor) return;
    setVideoError("");

    if (!videoUrl.trim()) {
      setVideoError("Please enter a valid YouTube or Vimeo video URL.");
      return;
    }

    // Normalize youtube URLs
    let cleanUrl = videoUrl.trim();
    if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
      editor.commands.setYoutubeVideo({
        src: cleanUrl,
        width: 640,
        height: 360,
      });
      setVideoUrl("");
      setVideoModalOpen(false);
    } else if (cleanUrl.includes("vimeo.com")) {
      const match = cleanUrl.match(/vimeo\.com\/(\d+)/);
      if (match && match[1]) {
        const vimeoIframe = `<div class="aspect-video w-full my-4 rounded-xl overflow-hidden shadow-xs"><iframe src="https://player.vimeo.com/video/${match[1]}" class="w-full h-full" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
        editor.chain().focus().insertContent(vimeoIframe).run();
        setVideoUrl("");
        setVideoModalOpen(false);
      } else {
        setVideoError("Invalid Vimeo URL format. Example: https://vimeo.com/123456789");
      }
    } else {
      setVideoError("Only YouTube and Vimeo video URLs are currently supported.");
    }
  };

  // Table Inserter
  const insertCustomTable = () => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true })
      .run();
    setTableModalOpen(false);
  };

  // Gutenberg-style Callout Blocks
  const insertCallout = (type: "info" | "warning" | "success" | "note") => {
    if (!editor) return;

    let iconText = "💡";
    let title = "Helpful Note";
    let className = "callout-info";

    if (type === "warning") {
      iconText = "⚠️";
      title = "Important Warning";
      className = "callout-warning";
    } else if (type === "success") {
      iconText = "✅";
      title = "Pro Tip";
      className = "callout-success";
    } else if (type === "note") {
      iconText = "📌";
      title = "Key Takeaway";
      className = "callout-note";
    }

    const html = `
      <div class="callout-box ${className}">
        <p><strong>${iconText} ${title}:</strong> Add your advice or highlighted message here.</p>
      </div>
      <p></p>
    `;

    editor.chain().focus().insertContent(html).run();
    setOpenDropdown(null);
  };

  // Insert CTA Button block
  const insertCtaButton = () => {
    if (!editor) return;
    const html = `
      <div style="text-align: center; margin: 1.5rem 0;">
        <a href="https://cloud.saviora.app/register" class="article-cta-btn" target="_blank" rel="noopener noreferrer">
          Get Started with Saviora Free →
        </a>
      </div>
      <p></p>
    `;
    editor.chain().focus().insertContent(html).run();
    setOpenDropdown(null);
  };

  // Word, Character, and Reading Time Calculations
  const wordCount = editor?.storage.characterCount?.words() || 0;
  const charCount = editor?.storage.characterCount?.characters() || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  if (!mounted) {
    return (
      <div
        className="w-full rounded-xl bg-slate-50 border border-slate-200 animate-pulse flex items-center justify-center text-xs text-slate-400 font-medium"
        style={{ minHeight }}
      >
        Loading rich text editor...
      </div>
    );
  }

  return (
    <div
      ref={editorContainerRef}
      className={`border rounded-xl transition-all duration-200 bg-white ${
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col rounded-none border-none p-4 sm:p-6 bg-white overflow-hidden shadow-2xl"
          : "border-slate-300 shadow-2xs"
      }`}
    >
      {/* Top Toolbar Container */}
      <div className="border-b border-slate-200 bg-slate-50/80 p-2 rounded-t-xl flex flex-wrap items-center justify-between gap-1 select-none text-xs">
        {/* Left Formatting Group */}
        <div className="flex flex-wrap items-center gap-0.5">
          {/* History Undo / Redo */}
          <button
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo() || isHtmlMode}
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo() || isHtmlMode}
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-300 mx-1" />

          {/* Headings Dropdown */}
          <div className="relative">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() =>
                setOpenDropdown(openDropdown === "heading" ? null : "heading")
              }
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-slate-700 hover:bg-slate-200 ${
                openDropdown === "heading" ? "bg-slate-200 text-slate-900" : ""
              } disabled:opacity-30`}
              title="Typography & Headings"
            >
              <span>
                {editor?.isActive("heading", { level: 1 })
                  ? "Heading 1"
                  : editor?.isActive("heading", { level: 2 })
                  ? "Heading 2"
                  : editor?.isActive("heading", { level: 3 })
                  ? "Heading 3"
                  : editor?.isActive("heading", { level: 4 })
                  ? "Heading 4"
                  : editor?.isActive("heading", { level: 5 })
                  ? "Heading 5"
                  : editor?.isActive("heading", { level: 6 })
                  ? "Heading 6"
                  : "Paragraph"}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {openDropdown === "heading" && (
              <div className="absolute left-0 top-full mt-1 w-44 rounded-lg bg-white border border-slate-200 shadow-lg py-1 z-30">
                <button
                  type="button"
                  onClick={() => {
                    editor?.chain().focus().setParagraph().run();
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-100 ${
                    editor?.isActive("paragraph") ? "font-bold text-emerald-600 bg-emerald-50/50" : "text-slate-700"
                  }`}
                >
                  <span>Normal Paragraph</span>
                </button>
                <div className="h-px bg-slate-100 my-1" />
                {[1, 2, 3, 4, 5, 6].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      editor
                        ?.chain()
                        .focus()
                        .toggleHeading({ level: lvl as any })
                        .run();
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-100 ${
                      editor?.isActive("heading", { level: lvl })
                        ? "font-bold text-emerald-600 bg-emerald-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    <span>Heading {lvl}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      H{lvl}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="w-px h-4 bg-slate-300 mx-1" />

          {/* Inline Text Formats */}
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("bold")
                ? "bg-slate-200 text-emerald-700 font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("italic")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("underline")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("strike")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("code")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Inline Code"
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleSubscript().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("subscript")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Subscript"
          >
            <SubscriptIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleSuperscript().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("superscript")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Superscript"
          >
            <SuperscriptIcon className="w-3.5 h-3.5" />
          </button>

          {/* Color Picker Dropdown */}
          <div className="relative">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() =>
                setOpenDropdown(openDropdown === "color" ? null : "color")
              }
              className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30"
              title="Text Color"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>
            {openDropdown === "color" && (
              <div className="absolute left-0 top-full mt-1 p-2 rounded-lg bg-white border border-slate-200 shadow-lg z-30 grid grid-cols-3 gap-1.5 w-36">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      editor?.chain().focus().setColor(c.color).run();
                      setOpenDropdown(null);
                    }}
                    className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-100 text-[11px]"
                    title={c.name}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Highlight Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() =>
                setOpenDropdown(openDropdown === "highlight" ? null : "highlight")
              }
              className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30"
              title="Highlight Color"
            >
              <Highlighter className="w-3.5 h-3.5" />
            </button>
            {openDropdown === "highlight" && (
              <div className="absolute left-0 top-full mt-1 p-2 rounded-lg bg-white border border-slate-200 shadow-lg z-30 grid grid-cols-2 gap-1.5 w-36">
                {HIGHLIGHT_PALETTE.map((h) => (
                  <button
                    key={h.name}
                    type="button"
                    onClick={() => {
                      if (h.color) {
                        editor
                          ?.chain()
                          .focus()
                          .toggleHighlight({ color: h.color })
                          .run();
                      } else {
                        editor?.chain().focus().unsetHighlight().run();
                      }
                      setOpenDropdown(null);
                    }}
                    className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-100 text-[11px]"
                  >
                    {h.color ? (
                      <span
                        className="w-3.5 h-3.5 rounded border border-slate-300"
                        style={{ backgroundColor: h.color }}
                      />
                    ) : (
                      <X className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{h.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Formatting */}
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() =>
              editor?.chain().focus().unsetAllMarks().clearNodes().run()
            }
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30"
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-300 mx-1" />

          {/* Text Alignment */}
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive({ textAlign: "left" })
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive({ textAlign: "center" })
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive({ textAlign: "right" })
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive({ textAlign: "justify" })
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Justify"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-300 mx-1" />

          {/* Lists & Quotes */}
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("bulletList")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("orderedList")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleTaskList().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("taskList")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Checklist / Task List"
          >
            <CheckSquare className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("blockquote")
                ? "bg-slate-200 text-emerald-700"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30"
            title="Horizontal Divider"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-300 mx-1" />

          {/* Insert Link */}
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={openLinkDialog}
            className={`p-1.5 rounded transition-colors ${
              editor?.isActive("link")
                ? "bg-emerald-100 text-emerald-800"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            } disabled:opacity-30`}
            title="Insert / Edit Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          {/* Insert Image */}
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => setImageModalOpen(true)}
            className="p-1.5 rounded text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900 disabled:opacity-30 font-medium flex items-center gap-1"
            title="Insert Image (Upload or URL)"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Image</span>
          </button>

          {/* Insert Video */}
          <button
            type="button"
            disabled={isHtmlMode}
            onClick={() => setVideoModalOpen(true)}
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30"
            title="Embed YouTube or Vimeo Video"
          >
            <Video className="w-3.5 h-3.5" />
          </button>

          {/* Table Menu */}
          <div className="relative">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() =>
                setOpenDropdown(openDropdown === "table" ? null : "table")
              }
              className={`p-1.5 rounded transition-colors ${
                editor?.isActive("table")
                  ? "bg-emerald-100 text-emerald-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              } disabled:opacity-30`}
              title="Table Operations"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>

            {openDropdown === "table" && (
              <div className="absolute left-0 top-full mt-1 w-52 rounded-lg bg-white border border-slate-200 shadow-xl py-1 z-30 text-xs">
                {!editor?.isActive("table") ? (
                  <button
                    type="button"
                    onClick={() => {
                      setTableModalOpen(true);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2 text-slate-700 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Insert New Table...</span>
                  </button>
                ) : (
                  <div className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().addRowBefore().run();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-slate-700"
                    >
                      + Add Row Above
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().addRowAfter().run();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-slate-700"
                    >
                      + Add Row Below
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().deleteRow().run();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-rose-600"
                    >
                      - Delete Current Row
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().addColumnBefore().run();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-slate-700"
                    >
                      + Add Column Before
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().addColumnAfter().run();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-slate-700"
                    >
                      + Add Column After
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().deleteColumn().run();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-rose-600"
                    >
                      - Delete Column
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().toggleHeaderRow().run();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-slate-700"
                    >
                      Toggle Header Row
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().deleteTable().run();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 font-semibold"
                    >
                      Delete Entire Table
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Gutenberg-style Block Inserter */}
          <div className="relative">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() =>
                setOpenDropdown(openDropdown === "blocks" ? null : "blocks")
              }
              className={`p-1.5 rounded transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30 flex items-center gap-1 ${
                openDropdown === "blocks" ? "bg-slate-200 text-slate-900" : ""
              }`}
              title="Add Custom Blocks & Callouts"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline text-[11px] font-medium">Blocks</span>
            </button>

            {openDropdown === "blocks" && (
              <div className="absolute left-0 top-full mt-1 w-56 rounded-lg bg-white border border-slate-200 shadow-xl py-1 z-30 text-xs">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Callout Boxes
                </div>
                <button
                  type="button"
                  onClick={() => insertCallout("info")}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 flex items-center gap-2 text-sky-800"
                >
                  <Info className="w-3.5 h-3.5 text-sky-600" />
                  <span>Information Box</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertCallout("success")}
                  className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 flex items-center gap-2 text-emerald-800"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pro Tip / Success Box</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertCallout("warning")}
                  className="w-full text-left px-3 py-1.5 hover:bg-amber-50 flex items-center gap-2 text-amber-800"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Warning / Alert Box</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertCallout("note")}
                  className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 flex items-center gap-2 text-indigo-800"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Key Takeaway / Note</span>
                </button>

                <div className="h-px bg-slate-100 my-1" />

                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Interactive Elements
                </div>
                <button
                  type="button"
                  onClick={insertCtaButton}
                  className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 flex items-center gap-2 text-emerald-800 font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call-to-Action (CTA) Button</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Group: Mode Toggle & Fullscreen */}
        <div className="flex items-center gap-1.5">
          {/* Mode Switcher: Visual vs HTML Source */}
          <div className="inline-flex p-0.5 rounded-lg bg-slate-200/80 border border-slate-300 text-[11px]">
            <button
              type="button"
              onClick={() => isHtmlMode && toggleHtmlMode()}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                !isHtmlMode
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3 h-3 text-emerald-600" />
              <span>Visual</span>
            </button>
            <button
              type="button"
              onClick={() => !isHtmlMode && toggleHtmlMode()}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                isHtmlMode
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CodeXml className="w-3 h-3 text-indigo-600" />
              <span>HTML Source</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Writing Mode"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-emerald-700" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div
        className={`relative ${
          isFullscreen ? "flex-1 overflow-y-auto max-w-4xl mx-auto w-full" : ""
        }`}
      >
        {!isHtmlMode ? (
          <div
            className="tiptap-content cursor-text"
            onClick={() => editor?.commands.focus()}
            style={{ minHeight: isFullscreen ? "70vh" : minHeight }}
          >
            <EditorContent editor={editor} />
          </div>
        ) : (
          <div className="p-4 bg-slate-950 font-mono text-xs rounded-b-xl text-emerald-400">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                <span>Direct HTML Source Editor (Real-time Sync)</span>
              </span>
              <span className="text-[10px] text-slate-500">
                Supports semantic HTML: headings, tables, links, images, iframe
              </span>
            </div>
            <textarea
              value={rawHtml}
              onChange={handleRawHtmlChange}
              rows={isFullscreen ? 28 : 20}
              className="w-full bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-y"
              placeholder="Enter or paste custom HTML code here..."
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* Bottom Status & Productivity Bar */}
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-2 rounded-b-xl flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-3">
        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-700">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <span>&bull;</span>
          <span>{charCount} characters</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1 text-slate-600">
            <Clock className="w-3 h-3 text-slate-400" />
            ~{readingTime} min read
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isHtmlMode ? (
            <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-medium">
              Source Code Mode
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> Visual Editor Ready
            </span>
          )}
        </div>
      </div>

      {/* --- LINK INSERTION DIALOG --- */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 w-full max-w-md space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-emerald-600" />
                <span>Insert or Edit Link</span>
              </h4>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination URL *
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com or /blog"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Link Text (Optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Descriptive anchor text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={linkOpenInNewTab}
                  onChange={(e) => setLinkOpenInNewTab(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                />
                <span>Open link in new browser tab (target=&quot;_blank&quot;)</span>
              </label>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {editor?.isActive("link") ? (
                <button
                  type="button"
                  onClick={removeLink}
                  className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors"
                >
                  Remove Link
                </button>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLinkModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={applyLink}
                  disabled={!linkUrl.trim()}
                  className="px-4 py-1.5 text-xs bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  Apply Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- IMAGE INSERTION & MANAGEMENT DIALOG --- */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 w-full max-w-lg space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Insert Image into Article</span>
              </h4>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Source Tab Toggle */}
            <div className="flex rounded-lg bg-slate-100 p-1 text-xs">
              <button
                type="button"
                onClick={() => setImageSourceTab("upload")}
                className={`flex-1 py-1.5 rounded-md font-medium text-center transition-colors ${
                  imageSourceTab === "upload"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Upload from PC
              </button>
              <button
                type="button"
                onClick={() => setImageSourceTab("url")}
                className={`flex-1 py-1.5 rounded-md font-medium text-center transition-colors ${
                  imageSourceTab === "url"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Image URL
              </button>
            </div>

            {imageUploadError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {imageUploadError}
              </div>
            )}

            {imageSourceTab === "upload" ? (
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />

                {!imageUrl ? (
                  <div
                    onClick={() => !isUploadingImg && fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isUploadingImg
                        ? "border-emerald-400 bg-emerald-50/50"
                        : "border-slate-300 hover:border-emerald-500 hover:bg-slate-50"
                    }`}
                  >
                    {isUploadingImg ? (
                      <div className="space-y-2 py-2">
                        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                        <div className="text-xs font-semibold text-slate-800">
                          Uploading image from PC...
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5 py-2">
                        <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto" />
                        <div className="text-xs font-semibold text-emerald-700">
                          Choose image from your PC
                        </div>
                        <p className="text-[10px] text-slate-400">
                          PNG, JPG, WEBP, GIF, SVG up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100 max-h-40">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="font-mono text-[10px] truncate max-w-[240px]">
                        {imageUrl}
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-emerald-700 font-semibold hover:underline"
                      >
                        Change file
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  External Image URL *
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Additional Attributes: Alt text, Caption, Alignment, Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alt Text (SEO &amp; Accessibility)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Description of the image"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Visible caption below image"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alignment
                </label>
                <select
                  value={imageAlignment}
                  onChange={(e) => setImageAlignment(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Size Width
                </label>
                <select
                  value={imageWidth}
                  onChange={(e) => setImageWidth(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="100%">Full Width (100%)</option>
                  <option value="75%">Medium (75%)</option>
                  <option value="50%">Compact (50%)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertImage}
                disabled={!imageUrl.trim() || isUploadingImg}
                className="px-4 py-1.5 text-xs bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                Insert into Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- VIDEO EMBED DIALOG --- */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 w-full max-w-md space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-emerald-600" />
                <span>Embed Video</span>
              </h4>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {videoError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {videoError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                YouTube or Vimeo URL *
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Supports youtu.be, youtube.com/watch, and vimeo.com URLs.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertVideo}
                disabled={!videoUrl.trim()}
                className="px-4 py-1.5 text-xs bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                Insert Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TABLE CREATION DIALOG --- */}
      {tableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 w-full max-w-sm space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <TableIcon className="w-4 h-4 text-emerald-600" />
                <span>Insert Comparison Table</span>
              </h4>
              <button
                type="button"
                onClick={() => setTableModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rows
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={tableRows}
                  onChange={(e) =>
                    setTableRows(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Columns
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={tableCols}
                  onChange={(e) =>
                    setTableCols(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              First row is configured as a header row. You can add or delete rows and columns anytime from the table menu.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTableModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertCustomTable}
                className="px-4 py-1.5 text-xs bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Insert Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
