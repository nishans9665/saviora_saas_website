import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saviora.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/income/",
        "/expenses/",
        "/budgets/",
        "/savings/",
        "/reports/",
        "/settings/",
        "/login/",
        "/register/",
        "/forgot-password/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
