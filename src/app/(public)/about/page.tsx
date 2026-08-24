import React from "react";
import type { Metadata } from "next";
import { AboutUsClient } from "@/components/about/AboutUsClient";

export const metadata: Metadata = {
  title: "About Saviora | Personal Finance & Money Management App",
  description:
    "Learn how Saviora makes personal finance simpler with income and expense tracking, budgeting, savings goals, financial insights, and tools to build better money habits.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Saviora | Personal Finance & Money Management App",
    description:
      "Learn how Saviora makes personal finance simpler with income and expense tracking, budgeting, savings goals, financial insights, and tools to build better money habits.",
    url: "https://saviora.app/about",
    siteName: "Saviora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Saviora | Personal Finance & Money Management App",
    description:
      "Learn how Saviora makes personal finance simpler with income and expense tracking, budgeting, savings goals, financial insights, and tools to build better money habits.",
  },
};

export default function AboutPage() {
  return <AboutUsClient />;
}
