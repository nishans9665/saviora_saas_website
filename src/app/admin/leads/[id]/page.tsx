import React from "react";
import { notFound, redirect } from "next/navigation";
import { getCurrentAdmin, verifyAdminPermission } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import LeadDetailClient from "./LeadDetailClient";

export const metadata = {
  title: "Lead Details | Saviora Admin",
  robots: { index: false, follow: false },
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect("/login-admin");
  }

  const { authorized } = await verifyAdminPermission("leads:read");
  if (!authorized) {
    redirect("/admin");
  }

  const { id } = await params;

  const [lead, admins] = await Promise.all([
    prisma.contactLead.findUnique({
      where: { id },
      include: {
        assignedAdmin: { select: { id: true, name: true, email: true } },
        notes: {
          orderBy: { createdAt: "desc" },
          include: { adminUser: { select: { id: true, name: true } } },
        },
      },
    }),
    prisma.adminUser.findMany({
      where: { isActive: true },
      select: { id: true, name: true, role: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!lead) {
    notFound();
  }

  return (
    <LeadDetailClient
      initialLead={JSON.parse(JSON.stringify(lead))}
      adminUsers={admins}
      currentAdmin={currentAdmin}
    />
  );
}
