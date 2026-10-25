import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/session";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentAdmin = await getAdminSession();
  if (!currentAdmin) return null;

  const { id } = await params;
  const [post, categories, tags] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
      },
    }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <BlogForm
        initialData={JSON.parse(JSON.stringify(post))}
        availableCategories={JSON.parse(JSON.stringify(categories))}
        availableTags={JSON.parse(JSON.stringify(tags))}
        isEditMode={true}
      />
    </div>
  );
}
