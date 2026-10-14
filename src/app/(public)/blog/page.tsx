import React from "react";
import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Blog - Saviora",
  description: "Financial insights, budgeting tips, and personal finance guides from Saviora.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <ComingSoon 
      title="Saviora Blog - Coming Soon"
      subtitle="Our team of finance experts and writers are crafting in-depth guides, budgeting strategies, and money management tips for you."
      category=" Saviora Blog"
    />
  );
}
