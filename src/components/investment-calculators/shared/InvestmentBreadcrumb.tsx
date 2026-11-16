"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface InvestmentBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function InvestmentBreadcrumb({ items }: InvestmentBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-emerald-600 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href="/free-tools"
            className="hover:text-emerald-600 transition ml-1"
          >
            Free Tools
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href="/free-tools/investment-savings-tools"
            className="hover:text-emerald-600 transition ml-1"
          >
            Investment &amp; Savings Tools
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {isLast || !item.href ? (
                <span className="font-semibold text-slate-900 ml-1 truncate max-w-[220px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-emerald-600 transition ml-1 truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
