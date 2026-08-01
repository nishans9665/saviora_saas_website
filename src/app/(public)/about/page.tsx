import React from "react";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata = {
  title: "About Us - Saviora",
  description: "Learn more about Saviora's mission, team, and financial management platform.",
};

export default function AboutPage() {
  return (
    <ComingSoon 
      title="About Saviora - Coming Soon"
      subtitle="We are preparing our full story on how Saviora was born to empower everyday people with smart financial control. Stay tuned!"
      category=" About Saviora"
    />
  );
}
