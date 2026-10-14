import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us - Saviora",
  description:
    "Get in touch with the Saviora team for customer support, inquiries, feedback, or enterprise questions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Saviora",
    description:
      "Get in touch with the Saviora team for customer support, inquiries, feedback, or enterprise questions.",
    url: "https://saviora.app/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
