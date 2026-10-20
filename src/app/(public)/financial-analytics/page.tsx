import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AnalyticsHero } from "@/components/financial-analytics/AnalyticsHero";
import { FinancialOverview } from "@/components/financial-analytics/FinancialOverview";
import { CategoryDistribution } from "@/components/financial-analytics/CategoryDistribution";
import { IncomeVsExpenses } from "@/components/financial-analytics/IncomeVsExpenses";
import { PaymentMethodBreakdown } from "@/components/financial-analytics/PaymentMethodBreakdown";
import { DailySpendingPattern } from "@/components/financial-analytics/DailySpendingPattern";
import { SmartFinancialInsights } from "@/components/financial-analytics/SmartFinancialInsights";
import { DetailedExpenseReports } from "@/components/financial-analytics/DetailedExpenseReports";
import { WhyAnalyticsMatters } from "@/components/financial-analytics/WhyAnalyticsMatters";
import { AnalyticsHowItWorks } from "@/components/financial-analytics/AnalyticsHowItWorks";
import { AnalyticsRelatedFeatures } from "@/components/financial-analytics/AnalyticsRelatedFeatures";
import { AnalyticsFAQ } from "@/components/financial-analytics/AnalyticsFAQ";
import { analyticsFaqData } from "@/components/financial-analytics/faq-data";
import { AnalyticsFinalCTA } from "@/components/financial-analytics/AnalyticsFinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Financial Analytics & Expense Reports | Saviora",
  },
  description:
    "Understand your spending with Saviora Financial Analytics. Explore expense categories, compare income and expenses, track payment methods, and export financial reports.",
  keywords: [
    "personal finance analytics",
    "financial analytics",
    "expense analytics",
    "expense reports",
    "spending tracker",
    "income vs expenses",
    "personal finance reports",
    "spending patterns",
    "expense tracking and reporting",
  ],
  alternates: {
    canonical: "https://saviora.app/financial-analytics",
  },
  openGraph: {
    title: "Financial Analytics & Expense Reports | Saviora",
    description:
      "Understand your spending with Saviora Financial Analytics. Explore expense categories, compare income and expenses, track payment methods, and export financial reports.",
    url: "https://saviora.app/financial-analytics",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Financial Analytics & Expense Reports | Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Analytics & Expense Reports | Saviora",
    description:
      "Understand your spending with Saviora Financial Analytics. Explore expense categories, compare income and expenses, track payment methods, and export financial reports.",
    images: ["https://saviora.app/images/og-image.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/financial-analytics#webpage",
    url: "https://saviora.app/financial-analytics",
    name: "Financial Analytics & Expense Reports | Saviora",
    description:
      "Understand your spending with Saviora Financial Analytics. Explore expense categories, compare income and expenses, track payment methods, and export financial reports.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://saviora.app/#website",
      name: "Saviora",
      url: "https://saviora.app",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://saviora.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Financial Analytics & Reports",
          item: "https://saviora.app/financial-analytics",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora Financial Analytics & Reports",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    url: "https://saviora.app/financial-analytics",
    description:
      "Understand your spending with Saviora Financial Analytics. Explore expense categories, compare income and expenses, track payment methods, and export financial reports.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "90-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Expense Analytics Dashboard",
      "Category Distribution Donut Visualization",
      "Income vs Expenses Comparison Charts",
      "Spending by Payment Method Breakdown",
      "Daily Spending Pattern Timelines",
      "Smart Financial Insights and Budget Warnings",
      "Searchable and Filterable Detailed Expense Reports",
      "Export Reports in CSV Format",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: analyticsFaqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function FinancialAnalyticsPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />

      {/* Section 2: Header and Navigation */}
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Section 3: Hero Section */}
        <AnalyticsHero />

        {/* Section 4: Financial Overview Section (6 Metric Cards) */}
        <FinancialOverview />

        {/* Section 5: Category Distribution (Donut & Breakdown) */}
        <CategoryDistribution />

        {/* Section 6: Income vs Expenses (Dual Curve Timeline) */}
        <IncomeVsExpenses />

        {/* Section 7: Spending by Payment Method */}
        <PaymentMethodBreakdown />

        {/* Section 8: Daily Spending Patterns */}
        <DailySpendingPattern />

        {/* Section 9: Smart Financial Insights & Category Performance */}
        <SmartFinancialInsights />

        {/* Section 10: Detailed Expense Reports (Ledger Table & Controls) */}
        <DetailedExpenseReports />

        {/* Section 11: Why Financial Analytics Matters (4 Benefit Cards) */}
        <WhyAnalyticsMatters />

        {/* Section 12: How It Works (3 Connected Steps) */}
        <AnalyticsHowItWorks />

        {/* Section 13: Connected Saviora Features (Income, Expense, Budgets, Savings) */}
        <AnalyticsRelatedFeatures />

        {/* Section 14: Frequently Asked Questions (10 Q&A Accordion) */}
        <AnalyticsFAQ />

        {/* Section 15: Final Call to Action */}
        <AnalyticsFinalCTA />
      </main>

      {/* Section 16: Footer */}
      <Footer />
    </>
  );
}
