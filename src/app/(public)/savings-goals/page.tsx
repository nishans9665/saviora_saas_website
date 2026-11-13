import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SavingsHero } from "@/components/savings-goals/SavingsHero";
import { SavingsFeatures } from "@/components/savings-goals/SavingsFeatures";
import { SavingsPlanningShowcase } from "@/components/savings-goals/SavingsPlanningShowcase";
import { SavingsProgressTracking } from "@/components/savings-goals/SavingsProgressTracking";
import { SavingsCategories } from "@/components/savings-goals/SavingsCategories";
import { SavingsWhySaviora } from "@/components/savings-goals/SavingsWhySaviora";
import { SavingsHowItWorks } from "@/components/savings-goals/SavingsHowItWorks";
import { SavingsRelatedFeatures } from "@/components/savings-goals/SavingsRelatedFeatures";
import { SavingsFAQ } from "@/components/savings-goals/SavingsFAQ";
import { savingsFaqData } from "@/components/savings-goals/faq-data";
import { SavingsFinalCTA } from "@/components/savings-goals/SavingsFinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Savings Goal Tracker | Plan & Track Savings with Saviora",
  },
  description:
    "Set savings goals, choose target amounts, plan monthly contributions, and track your progress with Saviora. Organize your financial goals in one place.",
  keywords: [
    "savings goal tracker",
    "savings goal app",
    "savings tracker app",
    "savings planner",
    "personal savings goals",
    "savings goal planning",
    "track savings progress",
    "monthly savings target",
    "savings contribution tracker",
  ],
  alternates: {
    canonical: "https://saviora.app/savings-goals",
  },
  openGraph: {
    title: "Savings Goal Tracker | Plan & Track Savings with Saviora",
    description:
      "Set savings goals, choose target amounts, plan monthly contributions, and track your progress with Saviora. Organize your financial goals in one place.",
    url: "https://saviora.app/savings-goals",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Savings Goal Tracker | Plan & Track Savings with Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savings Goal Tracker | Plan & Track Savings with Saviora",
    description:
      "Set savings goals, choose target amounts, plan monthly contributions, and track your progress with Saviora. Organize your financial goals in one place.",
    images: ["https://saviora.app/images/og-image.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/savings-goals#webpage",
    url: "https://saviora.app/savings-goals",
    name: "Savings Goal Tracker | Plan & Track Savings with Saviora",
    description:
      "Set savings goals, choose target amounts, plan monthly contributions, and track your progress with Saviora. Organize your financial goals in one place.",
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
          name: "Savings Goal Tracker",
          item: "https://saviora.app/savings-goals",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora Savings Goal Tracker",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    url: "https://saviora.app/savings-goals",
    description:
      "Set savings goals, choose target amounts, plan monthly contributions, and track your progress with Saviora. Organize your financial goals in one place.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "90-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Create Personalized Savings Goals",
      "Goal Categorization Across 10 Categories",
      "Target Amounts and Optional Monthly Targets",
      "Target Deadlines and Priority Settings",
      "Savings Contribution History Tracking",
      "Visual Progress Bars and Completion Percentages",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: savingsFaqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function SavingsGoalsPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      {/* Section 1: Header and Navigation */}
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Section 2: Hero — Savings Goals */}
        <SavingsHero />

        {/* Section 3: Key Features */}
        <SavingsFeatures />

        {/* Section 4: Create a Savings Plan (Form Demo + Checklist) */}
        <SavingsPlanningShowcase />

        {/* Section 5: Contributions and Progress Tracking (Goal Detail + Benefits) */}
        <SavingsProgressTracking />

        {/* Section 6: Savings Goal Categories (10 Categories Grid) */}
        <SavingsCategories />

        {/* Section 7: Why Choose Saviora for Savings Goal Management */}
        <SavingsWhySaviora />

        {/* Section 8: How It Works (3 Simple Steps) */}
        <SavingsHowItWorks />

        {/* Section 9: Explore More Saviora Features (Income, Expense, Budget, Analytics) */}
        <SavingsRelatedFeatures />

        {/* Section 10: Frequently Asked Questions (10 Q&A Accordion) */}
        <SavingsFAQ />

        {/* Section 11: Final Call to Action */}
        <SavingsFinalCTA />
      </main>

      {/* Section 12: Footer */}
      <Footer />
    </>
  );
}
