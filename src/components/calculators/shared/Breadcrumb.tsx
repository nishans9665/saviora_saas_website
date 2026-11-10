"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  // Always start with Home
  const normalized: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  // Filter out any redundant "Home" or empty items passed in items
  for (const item of items) {
    if (!item || !item.label) continue;
    const lower = item.label.toLowerCase().trim();
    if (lower === "home") continue;
    normalized.push(item);
  }

  // Ensure "Free Tools" is present in the breadcrumb hierarchy (unless on home)
  const hasFreeTools = normalized.some((it) => it.label.toLowerCase().trim() === "free tools");
  if (!hasFreeTools) {
    // Insert Free Tools right after Home
    normalized.splice(1, 0, { label: "Free Tools", href: "/free-tools" });
  }

  // Deduplicate consecutive identical labels (e.g. if Free Tools was passed in items)
  const fullItems: BreadcrumbItem[] = [];
  for (let i = 0; i < normalized.length; i++) {
    const current = normalized[i];
    const prev = fullItems[fullItems.length - 1];
    if (prev && prev.label.toLowerCase().trim() === current.label.toLowerCase().trim()) {
      // If the duplicate item had an href and prev didn't, carry it over
      if (current.href && !prev.href) prev.href = current.href;
      continue;
    }
    fullItems.push({ ...current });
  }

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              {index === 0 && <Home className="w-3.5 h-3.5 mr-0.5 text-slate-400 shrink-0" />}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-emerald-600 transition-colors font-medium text-slate-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
