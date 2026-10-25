import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { verifyAdminPermission } from "@/lib/auth/session";

// Supported image MIME types
const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const { authorized, admin } = await verifyAdminPermission("blog:write");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 10MB limit. Please upload a smaller image." },
        { status: 400 }
      );
    }

    const mimeType = file.type.toLowerCase();
    const extension = ALLOWED_MIME_TYPES[mimeType] || path.extname(file.name).toLowerCase();

    if (!ALLOWED_MIME_TYPES[mimeType] && ![".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"].includes(extension)) {
      return NextResponse.json(
        { error: "Invalid file type. Supported formats: JPG, PNG, WEBP, GIF, SVG, AVIF." },
        { status: 400 }
      );
    }

    // Generate unique, sanitized filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const randomHash = crypto.randomBytes(6).toString("hex");
    const safeBaseName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .substring(0, 30);

    const fileName = `${safeBaseName}-${Date.now()}-${randomHash}${extension}`;

    // Target upload folder in public/uploads/blog
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/blog/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      size: file.size,
      mimeType,
    });
  } catch (error) {
    console.error("POST /api/admin/upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image. Please try again." },
      { status: 500 }
    );
  }
}
