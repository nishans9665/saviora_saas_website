import React from "react";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/session";
import { CategoryManagerClient } from "./CategoryManagerClient";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const currentAdmin = await getAdminSession();
  if (!currentAdmin) return null;

  const [categories, tags] = await Promise.all([
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    }),
    prisma.blogTag.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    }),
  ]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Categories &amp; Tags</h1>
        <p className="text-xs text-slate-500 mt-1">
          Organize your blog posts into searchable categories and topical tags.
        </p>
      </div>

      <CategoryManagerClient
        initialCategories={JSON.parse(JSON.stringify(categories))}
        initialTags={JSON.parse(JSON.stringify(tags))}
      />
    </div>
  );
}
