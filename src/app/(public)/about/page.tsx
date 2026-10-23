import React from "react";
import type { Metadata } from "next";
import { AboutUsClient } from "@/components/about/AboutUsClient";

export const metadata: Metadata = {
  title: {
    absolute: "About Saviora | Personal Finance App",
  },
  description:
    "Learn about Saviora, the personal finance app designed to help you track income and expenses, manage budgets, and work toward savings goals.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Saviora | Personal Finance App",
    description:
      "Learn about Saviora, the personal finance app designed to help you track income and expenses, manage budgets, and work toward savings goals.",
    url: "https://saviora.app/about",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "About Saviora personal finance app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Saviora | Personal Finance App",
    description:
      "Learn about Saviora, the personal finance app designed to help you track income and expenses, manage budgets, and work toward your savings goals.",
    images: ["https://saviora.app/images/android-chrome-512x512.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://saviora.app/about#webpage",
    url: "https://saviora.app/about",
    name: "About Saviora | Personal Finance App",
    description:
      "Learn about Saviora, the personal finance app designed to help you track income and expenses, manage budgets, and work toward savings goals.",
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
          name: "About",
          item: "https://saviora.app/about",
        },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      "@id": "https://saviora.app/#organization",
      name: "Saviora",
      url: "https://saviora.app",
      logo: "https://saviora.app/icon.png",
      description:
        "Saviora provides an intuitive personal finance platform for tracking expenses, managing monthly budgets, and planning savings goals.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Saviora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Saviora is a personal finance and money management platform that helps you track income and expenses, create monthly budgets, set savings goals, and understand your financial progress effortlessly.",
        },
      },
      {
        "@type": "Question",
        name: "Who is Saviora for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Saviora is designed for individuals, freelancers, families, and professionals who want a simpler, clearer way to organize their finances, manage spending, build savings habits, and work toward long-term financial goals.",
        },
      },
      {
        "@type": "Question",
        name: "What can I manage with Saviora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can manage income streams, daily and recurring expenses, monthly category budgets, goal-oriented savings milestones, financial analytics, cash flow reports, and personal financial accounts in multi-currency supported environments.",
        },
      },
      {
        "@type": "Question",
        name: "Is Saviora a financial advisor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Saviora is a personal finance organization, tracking, and budgeting software tool. It does not replace professional financial, investment, tax, or legal advice.",
        },
      },
      {
        "@type": "Question",
        name: "Is Saviora available on mobile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Saviora is engineered for both web browser workspaces and mobile device screens, enabling you to keep your financial life organized wherever you go.",
        },
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <AboutUsClient />
    </>
  );
}
