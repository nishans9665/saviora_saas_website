import React from "react";
import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Careers - Saviora",
  description: "Join the Saviora team and help us build the future of personal finance.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <ComingSoon 
      title="Careers at Saviora - Coming Soon"
      subtitle="We are growing fast and will soon be opening remote positions across engineering, product design, marketing, and customer support!"
      category=" Join Our Team"
    />
  );
}
