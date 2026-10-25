import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
  Share2,
  Bookmark,
  Folder,
  Tag,
  BookOpen,
  ChevronRight,
  Zap,
  Sparkles,
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

  // Query related posts (up to 6 posts, 3-column layout)
  let relatedPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: post.id },
      ...(primaryCategory
        ? { categories: { some: { categoryId: primaryCategory.id } } }
        : {}),
    },
    take: 6,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      featuredImage: true,
      featuredImageAlt: true,
      publishedAt: true,
      categories: { include: { category: true } },
    },
  });

  // If fewer than 6 in the same category, backfill with recent published posts
  if (relatedPosts.length < 6) {
    const existingIds = [post.id, ...relatedPosts.map((p) => p.id)];
    const additionalPosts = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
        id: { notIn: existingIds },
      },
      take: 6 - relatedPosts.length,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        featuredImage: true,
        featuredImageAlt: true,
        publishedAt: true,
        categories: { include: { category: true } },
      },
    });
    relatedPosts = [...relatedPosts, ...additionalPosts];
  }

  // Query latest articles for the sidebar (up to 4)
  const latestPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: post.id },
    },
    take: 4,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      featuredImage: true,
      featuredImageAlt: true,
      publishedAt: true,
      content: true,
      categories: { include: { category: true } },
    },
  });

  // Query categories with post counts for the sidebar
  const allCategories = await prisma.blogCategory.findMany({
    include: {
      _count: {
        select: {
          posts: {
            where: {
              post: { status: "PUBLISHED" },
            },
          },
        },
      },
    },
    orderBy: { name: "asc" },
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Two-Column Grid: 70% Left Article Content + 30% Right Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            {/* Left 70% Column (Article Content & Meta) */}
            <div className="lg:col-span-8 space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xs">
              {/* Article Header */}
              <header className="space-y-4">
                {primaryCategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                    <Folder className="w-3 h-3" /> {primaryCategory.name}
                  </span>
                )}

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
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
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-sm shadow-2xs">
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

              {/* Article Body Content */}
              <article className="max-w-none pt-2">
                <div
                  className="article-rich-content overflow-x-auto"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(post.content),
                  }}
                />
              </article>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center flex-wrap gap-2">
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
            </div>

            {/* Right 30% Column (Sticky Sidebar) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* 1. Start Free CTA Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 sm:p-7 shadow-xl shadow-emerald-950/20">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
                <div className="relative z-10 space-y-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold tracking-wide uppercase">
                    <Sparkles className="w-3 h-3 text-amber-300" /> Free Forever Tier
                  </span>
                  <h3 className="text-xl font-bold leading-tight">
                    Smart Personal Finance with Saviora
                  </h3>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Track your income, spot recurring subscriptions, and automate savings with intelligent AI algorithms.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/register"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-800 text-xs font-bold hover:bg-emerald-50 transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
                    >
                      <span>Start Free Today</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="text-[10px] text-emerald-200/90 text-center flex items-center justify-center gap-2 pt-1">
                    <span>✓ No credit card required</span>
                    <span>•</span>
                    <span>✓ 2-min setup</span>
                  </div>
                </div>
              </div>

              {/* 2. Latest Articles Widget */}
              {latestPosts.length > 0 && (
                <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>Latest Articles</span>
                    </h3>
                    <Link
                      href="/blog"
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      View all
                    </Link>
                  </div>

                  <div className="space-y-3.5">
                    {latestPosts.map((latest) => {
                      const latestTime = Math.max(
                        1,
                        Math.ceil((latest.content?.split(/\s+/).length || 400) / 200)
                      );
                      return (
                        <article key={latest.id} className="flex gap-3 group">
                          {latest.featuredImage ? (
                            <Link
                              href={`/blog/${latest.slug}`}
                              className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 block"
                            >
                              <img
                                src={latest.featuredImage}
                                alt={latest.featuredImageAlt || latest.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </Link>
                          ) : (
                            <Link
                              href={`/blog/${latest.slug}`}
                              className="w-16 h-16 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 block"
                            >
                              <BookOpen className="w-6 h-6 opacity-60" />
                            </Link>
                          )}
                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                              <Link href={`/blog/${latest.slug}`}>{latest.title}</Link>
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                              <span>
                                {latest.publishedAt
                                  ? new Date(latest.publishedAt).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "Recent"}
                              </span>
                              <span>&bull;</span>
                              <span>{latestTime} min</span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Browse Categories */}
              {allCategories.length > 0 && (
                <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <Folder className="w-4 h-4 text-emerald-600" />
                    <span>Categories</span>
                  </h3>
                  <div className="space-y-1">
                    {allCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/blog?category=${cat.slug}`}
                        className="flex items-center justify-between p-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                      >
                        <span className="font-medium group-hover:translate-x-0.5 transition-transform">
                          {cat.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700 dark:group-hover:bg-emerald-950/60 dark:group-hover:text-emerald-300 transition-colors">
                          {cat._count.posts}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Featured Pages / Product Highlights */}
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Featured Pages</span>
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      title: "Income Tracker",
                      desc: "Track earnings, sources & cash flow",
                      href: "/income-tracker",
                    },
                    {
                      title: "Expense Tracker",
                      desc: "Record spending & daily habits",
                      href: "/expense-tracker",
                    },
                    {
                      title: "Budget Planner",
                      desc: "Set monthly category budgets",
                      href: "/#features",
                    },
                    {
                      title: "Savings Goals",
                      desc: "Automated micro-saving algorithm",
                      href: "/#features",
                    },
                  ].map((feat) => (
                    <Link
                      key={feat.title}
                      href={feat.href}
                      className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all block group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        <span>{feat.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-600 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {feat.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Articles / Resources Section (3 columns, max 6 posts) */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto px-4 md:px-6 max-w-6xl mt-20 pt-16 border-t border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Related Resources
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Explore more personal finance guides, budgeting tips, and expert analyses.
                </p>
              </div>

              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                <span>View all articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((rel) => {
                const relCategory = rel.categories[0]?.category;
                const relReadingTime = Math.max(
                  1,
                  Math.ceil((rel.content?.split(/\s+/).length || 500) / 200)
                );

                return (
                  <article
                    key={rel.id}
                    className="flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {/* Featured Image */}
                    {rel.featuredImage ? (
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 block"
                      >
                        <img
                          src={rel.featuredImage}
                          alt={rel.featuredImageAlt || rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    ) : (
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="aspect-video bg-gradient-to-tr from-emerald-600/20 via-primary-500/20 to-slate-900 flex items-center justify-center text-slate-400 block"
                      >
                        <BookOpen className="w-10 h-10 opacity-60" />
                      </Link>
                    )}

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {relCategory && (
                            <>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                {relCategory.name}
                              </span>
                              <span>&bull;</span>
                            </>
                          )}
                          <span>{relReadingTime}-minute read</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                        </h3>

                        {rel.excerpt && (
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                            {rel.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        <Link
                          href={`/blog/${rel.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                        >
                          <span>Read more</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
              >
                <span>View all articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
