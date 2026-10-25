import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";
import { revalidatePath } from "next/cache";

// GET /api/admin/blog/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { authorized } = await verifyAdminPermission("blog:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, email: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("GET /api/admin/blog/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch post." }, { status: 500 });
  }
}

// PUT /api/admin/blog/[id] - Update blog post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { admin, authorized } = await verifyAdminPermission("blog:write");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      featuredImageAlt,
      status,
      categoryIds,
      tagIds,
      seoTitle,
      metaDescription,
      canonicalUrl,
      publishedAt,
    } = body;

    const existingPost = await prisma.blogPost.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Slug check if changed
    let cleanSlug = existingPost.slug;
    if (slug && slug !== existingPost.slug) {
      cleanSlug = slug
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const duplicate = await prisma.blogPost.findFirst({
        where: { slug: cleanSlug, NOT: { id } },
      });
      if (duplicate) {
        return NextResponse.json(
          { error: "Another blog post already uses this slug." },
          { status: 409 }
        );
      }
    }

    const postStatus = status || existingPost.status;
    let publishDate = existingPost.publishedAt;
    if (postStatus === "PUBLISHED" && !publishDate) {
      publishDate = publishedAt ? new Date(publishedAt) : new Date();
    } else if (publishedAt) {
      publishDate = new Date(publishedAt);
    }

    // Update categories transactionally
    await prisma.$transaction(async (tx) => {
      if (Array.isArray(categoryIds)) {
        await tx.postCategory.deleteMany({ where: { postId: id } });
        if (categoryIds.length > 0) {
          await tx.postCategory.createMany({
            data: categoryIds.map((cid: string) => ({
              postId: id,
              categoryId: cid,
            })),
          });
        }
      }

      if (Array.isArray(tagIds)) {
        await tx.postTag.deleteMany({ where: { postId: id } });
        if (tagIds.length > 0) {
          await tx.postTag.createMany({
            data: tagIds.map((tid: string) => ({
              postId: id,
              tagId: tid,
            })),
          });
        }
      }

      await tx.blogPost.update({
        where: { id },
        data: {
          title: title !== undefined ? title.trim() : undefined,
          slug: cleanSlug,
          excerpt: excerpt !== undefined ? excerpt?.trim() || null : undefined,
          content: content !== undefined ? content : undefined,
          featuredImage: featuredImage !== undefined ? featuredImage?.trim() || null : undefined,
          featuredImageAlt: featuredImageAlt !== undefined ? featuredImageAlt?.trim() || null : undefined,
          status: postStatus,
          publishedAt: publishDate,
          seoTitle: seoTitle !== undefined ? seoTitle?.trim() || null : undefined,
          metaDescription: metaDescription !== undefined ? metaDescription?.trim() || null : undefined,
          canonicalUrl: canonicalUrl !== undefined ? canonicalUrl?.trim() || null : undefined,
        },
      });
    });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "UPDATE_BLOG_POST",
      entityType: "BlogPost",
      entityId: id,
      details: { title, slug: cleanSlug, status: postStatus },
    });

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${cleanSlug}`);
      if (existingPost.slug !== cleanSlug) {
        revalidatePath(`/blog/${existingPost.slug}`);
      }
    } catch {}

    return NextResponse.json({ success: true, slug: cleanSlug });
  } catch (error) {
    console.error("PUT /api/admin/blog/[id] error:", error);
    return NextResponse.json({ error: "Failed to update blog post." }, { status: 500 });
  }
}

// DELETE /api/admin/blog/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { admin, authorized } = await verifyAdminPermission("blog:delete");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    await prisma.blogPost.delete({ where: { id } });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "DELETE_BLOG_POST",
      entityType: "BlogPost",
      entityId: id,
      details: { title: post.title, slug: post.slug },
    });

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${post.slug}`);
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/blog/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
