import { AdminRole } from "@prisma/client";

export type Permission =
  | "blog:read"
  | "blog:write"
  | "blog:publish"
  | "blog:delete"
  | "categories:manage"
  | "leads:read"
  | "leads:write"
  | "leads:export"
  | "leads:delete"
  | "users:read"
  | "users:write"
  | "users:delete"
  | "settings:read"
  | "settings:write"
  | "logs:read"
  | "pages:manage";

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: [
    "blog:read",
    "blog:write",
    "blog:publish",
    "blog:delete",
    "categories:manage",
    "leads:read",
    "leads:write",
    "leads:export",
    "leads:delete",
    "users:read",
    "users:write",
    "users:delete",
    "settings:read",
    "settings:write",
    "logs:read",
    "pages:manage",
  ],
  ADMIN: [
    "blog:read",
    "blog:write",
    "blog:publish",
    "blog:delete",
    "categories:manage",
    "leads:read",
    "leads:write",
    "leads:export",
    "settings:read",
    "settings:write",
    "logs:read",
    "pages:manage",
  ],
  EDITOR: [
    "blog:read",
    "blog:write",
    "blog:publish",
    "categories:manage",
    "pages:manage",
  ],
};

export function hasPermission(role: AdminRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canManageUsers(role: AdminRole): boolean {
  return role === "SUPER_ADMIN";
}

export function canAccessSettings(role: AdminRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN";
}

export function canAccessLeads(role: AdminRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN";
}
