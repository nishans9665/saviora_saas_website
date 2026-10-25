import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, verifyAdminPermission } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";
import { revalidatePath } from "next/cache";

// GET /api/admin/blog - List blog posts with filters & pagination
export async function GET(request: Request) {
  try {
    const { authorized } = await verifyAdminPermission("blog:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status") || "ALL";
    const categoryId = searchParams.get("categoryId") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { slug: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    if (status !== "ALL") {
      where.status = status;
    }

    if (categoryId) {
      where.categories = {
        some: { categoryId },
      };
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: "desc" },
        include: {
          author: { select: { id: true, name: true, email: true } },
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/blog error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog - Create new blog post
export async function POST(request: Request) {
  try {
    const { admin, authorized } = await verifyAdminPermission("blog:write");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Post title and content are required." },
        { status: 400 }
      );
    }

    // Generate or sanitize slug
    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check duplicate slug
    const existing = await prisma.blogPost.findUnique({
      where: { slug: cleanSlug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A blog post with this URL slug already exists. Please choose a unique slug." },
        { status: 409 }
      );
    }

    const postStatus = status || "DRAFT";
    const publishDate =
      postStatus === "PUBLISHED" ? (publishedAt ? new Date(publishedAt) : new Date()) : null;

    const newPost = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug: cleanSlug,
        excerpt: excerpt?.trim() || null,
        content,
        featuredImage: featuredImage?.trim() || null,
        featuredImageAlt: featuredImageAlt?.trim() || null,
        authorId: admin.id,
        status: postStatus,
        publishedAt: publishDate,
        seoTitle: seoTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        canonicalUrl: canonicalUrl?.trim() || null,
        categories: Array.isArray(categoryIds)
          ? {
              create: categoryIds.map((cid: string) => ({
                category: { connect: { id: cid } },
              })),
            }
          : undefined,
        tags: Array.isArray(tagIds)
          ? {
              create: tagIds.map((tid: string) => ({
                tag: { connect: { id: tid } },
              })),
            }
          : undefined,
      },
    });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "CREATE_BLOG_POST",
      entityType: "BlogPost",
      entityId: newPost.id,
      details: { title: newPost.title, slug: newPost.slug, status: newPost.status },
    });

    // Revalidate public blog caches
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${newPost.slug}`);
    } catch {}

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("POST /api/admin/blog error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post." },
      { status: 500 }
    );
  }
}
