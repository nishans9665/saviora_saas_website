import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogTableClient } from "./BlogTableClient";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const currentAdmin = await getAdminSession();
  if (!currentAdmin) return null;

  const sp = await searchParams;
  const search = sp.search || "";
  const status = sp.status || "ALL";
  const categoryId = sp.category || "";
  const page = parseInt(sp.page || "1", 10);
  const limit = 10;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { slug: { contains: search } },
    ];
  }
  if (status !== "ALL") {
    where.status = status;
  }
  if (categoryId) {
    where.categories = { some: { categoryId } };
  }

  const [posts, total, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: { updatedAt: "desc" },
      include: {
        author: { select: { name: true } },
        categories: { include: { category: true } },
      },
    }),
    prisma.blogPost.count({ where }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Blog Posts</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your articles, publications, drafts, and categories.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Post</span>
        </Link>
      </div>

      <BlogTableClient
        initialPosts={JSON.parse(JSON.stringify(posts))}
        categories={JSON.parse(JSON.stringify(categories))}
        totalPosts={total}
        currentPage={page}
        pageSize={limit}
      />
    </div>
  );
}
