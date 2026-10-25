import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";

// GET /api/admin/categories - Return all categories and tags
export async function GET() {
  try {
    const { authorized } = await verifyAdminPermission("blog:read");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    return NextResponse.json({ categories, tags });
  } catch (error) {
    console.error("GET /api/admin/categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 });
  }
}

// POST /api/admin/categories - Create category or tag
export async function POST(request: Request) {
  try {
    const { admin, authorized } = await verifyAdminPermission("categories:manage");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, name, slug, description } = body; // type: "category" | "tag"

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const cleanSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    if (type === "tag") {
      const tag = await prisma.blogTag.create({
        data: { name: name.trim(), slug: cleanSlug },
      });
      await logAuditEvent({
        adminUserId: admin.id,
        action: "CREATE_TAG",
        entityType: "BlogTag",
        entityId: tag.id,
      });
      return NextResponse.json({ success: true, item: tag });
    } else {
      const category = await prisma.blogCategory.create({
        data: {
          name: name.trim(),
          slug: cleanSlug,
          description: description?.trim() || null,
        },
      });
      await logAuditEvent({
        adminUserId: admin.id,
        action: "CREATE_CATEGORY",
        entityType: "BlogCategory",
        entityId: category.id,
      });
      return NextResponse.json({ success: true, item: category });
    }
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A category or tag with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to create." }, { status: 500 });
  }
}

// DELETE /api/admin/categories - Delete category or tag
export async function DELETE(request: Request) {
  try {
    const { admin, authorized } = await verifyAdminPermission("categories:manage");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "category" | "tag"
    const id = searchParams.get("id");

    if (!id || !type) {
      return NextResponse.json({ error: "Missing type or id parameter." }, { status: 400 });
    }

    if (type === "tag") {
      await prisma.blogTag.delete({ where: { id } });
    } else {
      await prisma.blogCategory.delete({ where: { id } });
    }

    await logAuditEvent({
      adminUserId: admin.id,
      action: `DELETE_${type.toUpperCase()}`,
      entityType: type === "tag" ? "BlogTag" : "BlogCategory",
      entityId: id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item." }, { status: 500 });
  }
}
