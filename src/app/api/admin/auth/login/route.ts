import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/passwords";
import { createAdminSession } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";

// Simple in-memory rate limiting map (IP -> timestamps)
const loginAttempts = new Map<string, number[]>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = loginAttempts.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < WINDOW_MS);
  loginAttempts.set(ip, validTimestamps);
  return validTimestamps.length >= MAX_ATTEMPTS;
}

function recordAttempt(ip: string) {
  const timestamps = loginAttempts.get(ip) || [];
  timestamps.push(Date.now());
  loginAttempts.set(ip, timestamps);
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again after 15 minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!admin || !admin.isActive) {
      recordAttempt(ip);
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      recordAttempt(ip);
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Reset rate limit on success
    loginAttempts.delete(ip);

    // Create session & HTTP-only cookie
    await createAdminSession({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "LOGIN_SUCCESS",
      entityType: "AdminUser",
      entityId: admin.id,
      ipAddress: ip,
      details: { email: admin.email, role: admin.role },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
