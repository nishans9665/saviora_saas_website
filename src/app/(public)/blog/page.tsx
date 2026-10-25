import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { prisma } from "@/lib/prisma";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Folder,
  Tag,
  Search,
  User,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Financial Insights | Saviora",
  description:
    "Actionable personal finance strategies, budgeting guides, expense tracking tips, and wealth building insights from Saviora.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Financial Insights | Saviora",
    description:
      "Actionable personal finance strategies, budgeting guides, expense tracking tips, and wealth building insights from Saviora.",
    url: "https://saviora.app/blog",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://saviora.app/blog#webpage",
    url: "https://saviora.app/blog",
    name: "Blog & Financial Insights | Saviora",
    description:
      "Actionable personal finance strategies, budgeting guides, expense tracking tips, and wealth building insights from Saviora.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://saviora.app/#website",
      name: "Saviora",
      url: "https://saviora.app",
    },
    breadcrumb: {
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
      ],
    },
  },
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const sp = await searchParams;
  const activeCategory = sp.category || "";
  const searchQuery = sp.search?.trim() || "";

  const where: any = {
    status: "PUBLISHED",
  };

  if (activeCategory) {
    where.categories = {
      some: { category: { slug: activeCategory } },
    };
  }

  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery } },
      { excerpt: { contains: searchQuery } },
    ];
  }

  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      include: {
        author: { select: { name: true } },
        categories: { include: { category: true } },
      },
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            posts: {
              where: { post: { status: "PUBLISHED" } },
            },
          },
        },
      },
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-32 pb-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] max-w-5xl opacity-20 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Saviora Financial Journal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Smart Money Habits. <br />
              <span className="text-gradient">Clear Financial Insights.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore in-depth articles on budgeting, automated savings, expense control, and modern personal finance tools.
            </p>
          </div>

          {/* Category Filter Pills & Search */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Link
                href="/blog"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  !activeCategory
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary-500"
                }`}
              >
                All Articles
              </Link>
              {categories.map((c) => {
                const isActive = activeCategory === c.slug;
                return (
                  <Link
                    key={c.id}
                    href={`/blog?category=${c.slug}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-primary-600 text-white shadow-sm"
                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary-500"
                    }`}
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>

            {/* Simple Search */}
            <form action="/blog" method="GET" className="relative w-full md:w-64">
              {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
            </form>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const primaryCategory = post.categories[0]?.category;
                const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));

                return (
                  <article
                    key={post.id}
                    className="flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                  >
                    {/* Featured Image */}
                    {post.featuredImage ? (
                      <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={post.featuredImage}
                          alt={post.featuredImageAlt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    ) : (
                      <Link href={`/blog/${post.slug}`} className="aspect-video bg-gradient-to-tr from-emerald-600/20 via-primary-500/20 to-slate-900 flex items-center justify-center text-slate-400">
                        <BookOpen className="w-10 h-10 opacity-60" />
                      </Link>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {/* Meta info */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                          {primaryCategory && (
                            <span className="font-semibold text-primary-600 dark:text-primary-400">
                              {primaryCategory.name}
                            </span>
                          )}
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {readingTime} min read
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Footer & Read Link */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <User className="w-3 h-3 text-slate-400" /> {post.author.name}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center max-w-md mx-auto space-y-4 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Articles in Production</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Our editorial team is crafting comprehensive guides on budgeting, savings, and expense analytics. New articles will be published shortly!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-colors"
              >
                <span>Return to Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
