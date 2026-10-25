import React from "react";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/session";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const currentAdmin = await getAdminSession();
  if (!currentAdmin) return null;

  const [categories, tags] = await Promise.all([
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <BlogForm
        availableCategories={JSON.parse(JSON.stringify(categories))}
        availableTags={JSON.parse(JSON.stringify(tags))}
        isEditMode={false}
      />
    </div>
  );
}
