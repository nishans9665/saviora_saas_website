import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { prisma } from "@/lib/prisma";
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
  Share2,
  Bookmark,
  Folder,
  Tag,
  BookOpen,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
    select: {
      title: true,
      seoTitle: true,
      metaDescription: true,
      excerpt: true,
      featuredImage: true,
      canonicalUrl: true,
    },
  });

  if (!post) {
    return {
      title: "Article Not Found | Saviora",
    };
  }

  const title = post.seoTitle || `${post.title} | Saviora Blog`;
  const description =
    post.metaDescription || post.excerpt || "Personal finance insights from Saviora.";
  const url = `https://saviora.app/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: post.canonicalUrl || url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: post.featuredImage
        ? [{ url: post.featuredImage, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true } },
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });

  if (!post) {
    notFound();
  }

  const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
  const primaryCategory = post.categories[0]?.category;

  // Query related posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: post.id },
      ...(primaryCategory
        ? { categories: { some: { categoryId: primaryCategory.id } } }
        : {}),
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    include: {
      author: { select: { name: true } },
      categories: { include: { category: true } },
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.featuredImage || "https://saviora.app/icon.png",
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Saviora",
      logo: {
        "@type": "ImageObject",
        url: "https://saviora.app/icon.png",
      },
    },
    datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://saviora.app/blog/${post.slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://saviora.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://saviora.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://saviora.app/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbLd]).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-32 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-4 mb-8">
            {primaryCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-semibold uppercase tracking-wider">
                <Folder className="w-3 h-3" /> {primaryCategory.name}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            )}

            {/* Author & Meta Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/60 text-primary-600 dark:text-primary-400 font-bold flex items-center justify-center text-sm">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{post.author.name}</div>
                  <div className="text-[11px] text-slate-400">Saviora Editorial</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recently updated"}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {readingTime} min read
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-video relative bg-slate-900">
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-6">
            <div
              className="whitespace-pre-line font-normal"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>"),
              }}
            />
          </article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center flex-wrap gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {post.tags.map((t) => (
                <span
                  key={t.tag.id}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
                >
                  #{t.tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500 transition-colors group space-y-2 block"
                  >
                    <span className="text-[10px] font-semibold text-primary-600 uppercase">
                      {rel.categories[0]?.category.name || "Article"}
                    </span>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
