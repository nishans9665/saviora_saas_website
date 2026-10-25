import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { AdminRole } from "@prisma/client";
import { hasPermission, Permission } from "./rbac";

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "saviora_admin_session";
const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "saviora-admin-super-secure-jwt-session-secret-2026-key-!#%"
);
const SESSION_DAYS = parseInt(process.env.ADMIN_SESSION_MAX_AGE_DAYS || "7", 10);

export interface AdminSessionPayload {
  adminId: string;
  email: string;
  role: AdminRole;
  name: string;
}

export interface CurrentAdmin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
}

export async function createAdminSession(user: {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  const token = await new SignJWT({
    adminId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(SECRET_KEY);

  // Store in MySQL for session invalidation tracking
  await prisma.adminSession.create({
    data: {
      adminUserId: user.id,
      sessionToken: token,
      expiresAt,
    },
  });

  // Update lastLoginAt
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  // Set HTTP-Only, Secure, SameSite Cookie
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function getAdminSession(): Promise<CurrentAdmin | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const adminId = payload.adminId as string;

    if (!adminId) {
      return null;
    }

    // Verify session in DB and user is still active
    const session = await prisma.adminSession.findFirst({
      where: {
        sessionToken: token,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: {
        adminUser: true,
      },
    });

    if (!session || !session.adminUser || !session.adminUser.isActive) {
      return null;
    }

    return {
      id: session.adminUser.id,
      name: session.adminUser.name,
      email: session.adminUser.email,
      role: session.adminUser.role,
      isActive: session.adminUser.isActive,
    };
  } catch {
    return null;
  }
}

export async function destroyAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (token) {
      await prisma.adminSession.updateMany({
        where: { sessionToken: token },
        data: { revokedAt: new Date() },
      });
      cookieStore.delete(COOKIE_NAME);
    }
  } catch {
    // Graceful fallback
  }
}

export async function verifyAdminPermission(permission?: Permission): Promise<{
  admin: CurrentAdmin | null;
  authorized: boolean;
}> {
  const admin = await getAdminSession();
  if (!admin) {
    return { admin: null, authorized: false };
  }

  if (!permission) {
    return { admin, authorized: true };
  }

  const authorized = hasPermission(admin.role, permission);
  return { admin, authorized };
}

export const getCurrentAdmin = getAdminSession;
