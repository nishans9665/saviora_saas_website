import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Saviora database seed...");

  // 1. Initial Super Admin Bootstrap
  const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL || "admin@saviora.app";
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || "SavioraAdmin2026!#";

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    const superAdmin = await prisma.adminUser.create({
      data: {
        name: "Saviora Super Admin",
        email: adminEmail,
        passwordHash,
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },
    });
    console.log(`✅ Super Admin created: ${superAdmin.email}`);
  } else {
    console.log(`ℹ️ Super Admin already exists: ${existingAdmin.email}`);
  }

  // 2. Default Blog Categories
  const categories = [
    { name: "Personal Finance", slug: "personal-finance", description: "Mastering your personal money, cash flow, and financial freedom." },
    { name: "Budgeting & Saving", slug: "budgeting-saving", description: "Smart budgeting methods, spending limits, and emergency fund growth." },
    { name: "Expense Tracking", slug: "expense-tracking", description: "Techniques and habits to record and analyze daily spending." },
    { name: "Financial Analytics", slug: "financial-analytics", description: "Understanding financial charts, reports, and projections." },
    { name: "Product Updates", slug: "product-updates", description: "Latest features, fixes, and announcements from the Saviora team." },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✅ Seeded ${categories.length} blog categories.`);

  // 3. Default Blog Tags
  const tags = [
    { name: "Budgeting", slug: "budgeting" },
    { name: "Savings Goals", slug: "savings-goals" },
    { name: "Expense Tracker", slug: "expense-tracker" },
    { name: "Cash Flow", slug: "cash-flow" },
    { name: "Personal Wealth", slug: "personal-wealth" },
    { name: "Multi Currency", slug: "multi-currency" },
  ];

  for (const tag of tags) {
    await prisma.blogTag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  console.log(`✅ Seeded ${tags.length} blog tags.`);

  // 4. Default Website Settings
  const defaultSettings = [
    { key: "site_name", value: JSON.stringify("Saviora"), group: "general" },
    { key: "site_tagline", value: JSON.stringify("Personal Finance & Budget Tracker"), group: "general" },
    { key: "contact_email", value: JSON.stringify("info@saviora.app"), group: "contact" },
    { key: "support_email", value: JSON.stringify("support@saviora.com"), group: "contact" },
    { key: "posts_per_page", value: JSON.stringify(9), group: "blog" },
    { key: "default_seo_title", value: JSON.stringify("Saviora – Personal Finance & Budget Tracker"), group: "seo" },
    { key: "default_seo_description", value: JSON.stringify("Manage your money with Saviora. Track income and expenses, plan monthly budgets, monitor savings goals, and understand your finances in one place."), group: "seo" },
  ];

  for (const setting of defaultSettings) {
    await prisma.websiteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log(`✅ Seeded default website settings.`);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
