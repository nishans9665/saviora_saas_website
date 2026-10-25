import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPermission } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";

const DEFAULT_PAGES = [
  { id: "home", path: "/", name: "Home Page", defaultTitle: "Saviora – Personal Finance & Budget Tracker", defaultDesc: "Track income and expenses, plan monthly budgets, and monitor savings goals with Saviora." },
  { id: "about", path: "/about", name: "About Us", defaultTitle: "About Saviora | Our Mission & Team", defaultDesc: "Learn about Saviora's mission to make personal finance accessible, private, and effortless." },
  { id: "pricing", path: "/pricing", name: "Pricing", defaultTitle: "Transparent Pricing Plans | Saviora", defaultDesc: "Affordable plans for individuals, families, and high-net-worth investors. Start free." },
  { id: "features", path: "/features", name: "Features", defaultTitle: "All Features & Tools | Saviora", defaultDesc: "Explore expense tracking, multi-currency support, financial analytics, and smart budgeting." },
  { id: "contact", path: "/contact", name: "Contact & Support", defaultTitle: "Contact Saviora | Get in Touch", defaultDesc: "Have questions? Reach our product specialist team for assistance." },
  { id: "careers", path: "/careers", name: "Careers", defaultTitle: "Join the Saviora Team | Careers", defaultDesc: "Build the future of personal wealth management and financial clarity." },
  { id: "changelog", path: "/changelog", name: "Product Changelog", defaultTitle: "Product Changelog & Updates | Saviora", defaultDesc: "See all recent releases, bug fixes, and improvements to Saviora." },
  { id: "expense-tracker", path: "/expense-tracker", name: "Expense Tracker", defaultTitle: "Smart Expense Tracker | Saviora", defaultDesc: "Real-time expense categorization and cash flow monitoring." },
  { id: "monthly-budget-planning", path: "/monthly-budget-planning", name: "Monthly Budget Planning", defaultTitle: "Monthly Budget Planning | Saviora", defaultDesc: "Zero-based envelope budgeting and monthly limit alerts." },
  { id: "multi-currency-management", path: "/multi-currency-management", name: "Multi-Currency Management", defaultTitle: "Multi-Currency Management | Saviora", defaultDesc: "Hold, track, and balance accounts across 150+ global currencies." },
  { id: "financial-analytics", path: "/financial-analytics", name: "Financial Analytics", defaultTitle: "Interactive Financial Analytics | Saviora", defaultDesc: "Net worth breakdown, burn-rate charts, and spending insights." },
  { id: "savings-goals", path: "/savings-goals", name: "Savings Goals", defaultTitle: "Savings Goals & Milestones | Saviora", defaultDesc: "Set target dates, automated allocations, and track savings progress." },
  { id: "privacy", path: "/privacy", name: "Privacy Policy", defaultTitle: "Privacy Policy | Saviora", defaultDesc: "How we collect, store, and protect your personal financial records." },
  { id: "terms", path: "/terms", name: "Terms of Service", defaultTitle: "Terms of Service | Saviora", defaultDesc: "Terms governing use of the Saviora website and cloud platform." },
];

export async function GET(request: Request) {
  try {
    const { authorized } = await verifyAdminPermission("pages:manage");
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const savedOverrides = await prisma.websiteSetting.findMany({
      where: { group: "page_metadata" },
    });

    const overridesMap: Record<string, any> = {};
    for (const row of savedOverrides) {
      try {
        overridesMap[row.key] = JSON.parse(row.value);
      } catch {
        overridesMap[row.key] = row.value;
      }
    }

    const pages = DEFAULT_PAGES.map((p) => {
      const override = overridesMap[`page_meta_${p.id}`] || {};
      return {
        id: p.id,
        path: p.path,
        name: p.name,
        title: override.title || p.defaultTitle,
        description: override.description || p.defaultDesc,
        canonicalUrl: override.canonicalUrl || `https://saviora.app${p.path === "/" ? "" : p.path}`,
        isIndexed: override.isIndexed ?? true,
        updatedAt: override.updatedAt || null,
      };
    });

    return NextResponse.json({ pages });
  } catch (error) {
    console.error("GET /api/admin/pages error:", error);
    return NextResponse.json({ error: "Failed to fetch pages." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { admin, authorized } = await verifyAdminPermission("pages:manage");
    if (!authorized || !admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { id, title, description, canonicalUrl, isIndexed } = body;

    if (!id) {
      return NextResponse.json({ error: "Page ID is required." }, { status: 400 });
    }

    const key = `page_meta_${id}`;
    const value = JSON.stringify({
      title: title?.trim(),
      description: description?.trim(),
      canonicalUrl: canonicalUrl?.trim(),
      isIndexed: Boolean(isIndexed),
      updatedAt: new Date().toISOString(),
      updatedBy: admin.name,
    });

    await prisma.websiteSetting.upsert({
      where: { key },
      update: { value, group: "page_metadata" },
      create: { key, value, group: "page_metadata" },
    });

    await logAuditEvent({
      adminUserId: admin.id,
      action: "UPDATE_PAGE_METADATA",
      entityType: "WebsitePage",
      entityId: id,
      details: { title, isIndexed },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/admin/pages error:", error);
    return NextResponse.json({ error: "Failed to update page." }, { status: 500 });
  }
}
