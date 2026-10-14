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

export default function AboutPage() {
  return <AboutUsClient />;
}
