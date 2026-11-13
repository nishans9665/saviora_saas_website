import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BudgetHero } from "@/components/budget-planning/BudgetHero";
import { BudgetIntro } from "@/components/budget-planning/BudgetIntro";
import { BudgetCreationModalShowcase } from "@/components/budget-planning/BudgetCreationModalShowcase";
import { BudgetOverviewDashboard } from "@/components/budget-planning/BudgetOverviewDashboard";
import { BudgetStrictLimit } from "@/components/budget-planning/BudgetStrictLimit";
import { BudgetAssignedExpenses } from "@/components/budget-planning/BudgetAssignedExpenses";
import { BudgetStatusOverview } from "@/components/budget-planning/BudgetStatusOverview";
import { BudgetAnalytics } from "@/components/budget-planning/BudgetAnalytics";
import { BudgetHowItWorks } from "@/components/budget-planning/BudgetHowItWorks";
import { BudgetBenefits } from "@/components/budget-planning/BudgetBenefits";
import { BudgetRelatedFeatures } from "@/components/budget-planning/BudgetRelatedFeatures";
import { BudgetFAQ } from "@/components/budget-planning/BudgetFAQ";
import { budgetFaqData } from "@/components/budget-planning/faq-data";
import { BudgetFinalCTA } from "@/components/budget-planning/BudgetFinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Monthly Budget Planner – Track Spending | Saviora",
  },
  description:
    "Plan your monthly budget with Saviora. Set category-wise spending limits, track expenses, monitor remaining balances, and control overspending with strict budget limits.",
  keywords: [
    "monthly budget planner",
    "monthly budget planning",
    "personal budget management",
    "expense budget tracker",
    "category-wise budget planner",
    "monthly spending limits",
    "budget tracking software",
    "budget overspending control",
  ],
  alternates: {
    canonical: "https://saviora.app/monthly-budget-planning",
  },
  openGraph: {
    title: "Monthly Budget Planner – Track Spending | Saviora",
    description:
      "Plan your monthly budget with Saviora. Set category-wise spending limits, track expenses, monitor remaining balances, and control overspending with strict budget limits.",
    url: "https://saviora.app/monthly-budget-planning",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Monthly Budget Planner – Track Spending | Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monthly Budget Planner – Track Spending | Saviora",
    description:
      "Plan your monthly budget with Saviora. Set category-wise spending limits, track expenses, monitor remaining balances, and control overspending with strict budget limits.",
    images: ["https://saviora.app/images/og-image.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/monthly-budget-planning#webpage",
    url: "https://saviora.app/monthly-budget-planning",
    name: "Monthly Budget Planner – Track Spending | Saviora",
    description:
      "Plan your monthly budget with Saviora. Set category-wise spending limits, track expenses, monitor remaining balances, and control overspending with strict budget limits.",
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
          name: "Monthly Budget Planning",
          item: "https://saviora.app/monthly-budget-planning",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora Monthly Budget Planner",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    url: "https://saviora.app/monthly-budget-planning",
    description:
      "Plan your monthly budget with Saviora. Set category-wise spending limits, track expenses, monitor remaining balances, and control overspending with strict budget limits.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "90-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Category-Wise Budget Creation",
      "Strict Limit Spending Controls",
      "Assigned Expense Tracking",
      "Real-Time Utilization Monitoring",
      "Safe, Warning & Overspent Status Cues",
      "Budget vs. Actual Spending Analytics",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: budgetFaqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function MonthlyBudgetPlanningPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Section 1: Hero */}
        <BudgetHero />

        {/* Section 2: Introduction to Monthly Budget Planning */}
        <BudgetIntro />

        {/* Section 3: Category-Wise Budget Creation */}
        <BudgetCreationModalShowcase />

        {/* Section 4: Budget Overview Dashboard */}
        <BudgetOverviewDashboard />

        {/* Section 5: Budget Strict Limit */}
        <BudgetStrictLimit />

        {/* Section 6: Assigned Expense Tracking */}
        <BudgetAssignedExpenses />

        {/* Section 7: Budget Status and Overspending */}
        <BudgetStatusOverview />

        {/* Section 8: Monthly Budget Analytics */}
        <BudgetAnalytics />

        {/* Section 9: How It Works */}
        <BudgetHowItWorks />

        {/* Section 10: Benefits of Using Saviora */}
        <BudgetBenefits />

        {/* Internal Links to Related Financial Tools */}
        <BudgetRelatedFeatures />

        {/* Section 11: Frequently Asked Questions */}
        <BudgetFAQ />

        {/* Section 12: Final Call to Action */}
        <BudgetFinalCTA />
      </main>
      {/* Section 13: Footer */}
      <Footer />
    </>
  );
}
