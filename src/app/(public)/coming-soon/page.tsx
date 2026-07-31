import React from "react";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Coming Soon - Saviora",
  description: "Exciting new features and pages are coming soon to Saviora.",
};

export default function ComingSoonPage() {
  return (
    <ComingSoon 
      title="We're Building Something Amazing"
      subtitle="This page is under active development by the Saviora team. Subscribe below to get notified as soon as it launches!"
      category="🚀 Launching Soon"
    />
  );
}
