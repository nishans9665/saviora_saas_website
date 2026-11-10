"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Receipt,
  PiggyBank,
  Percent,
  Clock,
  Coins,
  Wallet,
  Scale,
} from "lucide-react";
import { SupportedCountryId } from "@/lib/calculators/types";
import { getCountryProfile } from "@/lib/calculators/rules/countryRegistry";

export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: "salary" | "tax" | "take-home" | "epf" | "etf" | "vat" | "gratuity" | "overtime";
  badge?: string;
}

export const ALL_TOOLS: ToolItem[] = [
  {
    id: "salary-calculator",
    slug: "/free-tools/salary-calculator",
    title: "Salary Calculator",
    description: "Detailed salary breakdown including basic, allowances, deductions, and annual pay.",
    iconName: "salary",
    badge: "Popular",
  },
  {
    id: "income-tax-calculator",
    slug: "/free-tools/income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Calculate progressive income tax under official statutory tax brackets.",
    iconName: "tax",
    badge: "Updated",
  },
  {
    id: "take-home-salary-calculator",
    slug: "/free-tools/take-home-salary-calculator",
    title: "Take-Home Salary Calculator",
    description: "See your exact in-hand salary after retirement, tax, and company deductions.",
    iconName: "take-home",
    badge: "Essential",
  },
  {
    id: "epf-calculator",
    slug: "/free-tools/epf-calculator",
    title: "Pension & Retirement Calculator",
    description: "Calculate employee and employer statutory retirement contributions with balance forecast.",
    iconName: "epf",
  },
  {
    id: "etf-calculator",
    slug: "/free-tools/etf-calculator",
    title: "Employer Contribution Calculator",
    description: "Track employer-funded statutory contributions, benefits, and fund value.",
    iconName: "etf",
  },
  {
    id: "vat-calculator",
    slug: "/free-tools/vat-calculator",
    title: "VAT / GST / Sales Tax Calculator",
    description: "Add or remove consumption taxes with instant price breakdown and formula transparency.",
    iconName: "vat",
  },
  {
    id: "gratuity-calculator",
    slug: "/free-tools/gratuity-calculator",
    title: "Gratuity & Severance Calculator",
    description: "Estimate statutory end-of-service gratuity or severance based on tenure and last drawn salary.",
    iconName: "gratuity",
  },
  {
    id: "overtime-calculator",
    slug: "/free-tools/overtime-calculator",
    title: "Overtime Calculator",
    description: "Calculate hourly rates, normal overtime, and holiday pay under governing labour laws.",
    iconName: "overtime",
  },
];

const iconMap = {
  salary: Wallet,
  tax: Scale,
  "take-home": Coins,
  epf: PiggyBank,
  etf: Coins,
  vat: Percent,
  gratuity: Receipt,
  overtime: Clock,
};

interface RelatedToolsProps {
  currentSlug?: string;
  currentToolId?: string;
  countryId?: SupportedCountryId;
  title?: string;
  subtitle?: string;
}

export function RelatedTools({
  currentSlug,
  currentToolId,
  countryId,
  title = "Explore More Free Financial Tools",
  subtitle = "Free, browser-based salary and tax calculators with no sign-up required.",
}: RelatedToolsProps) {
  const profile = countryId ? getCountryProfile(countryId) : null;

  const filtered = ALL_TOOLS.filter((t) => {
    if (currentToolId && t.id === currentToolId) return false;
    if (currentSlug && t.slug === currentSlug) return false;
    return true;
  }).slice(0, 3);

  const getToolTitle = (tool: ToolItem) => {
    if (!profile) return tool.title;
    if (tool.id === "epf-calculator") return `${profile.pensionName} Calculator`;
    if (tool.id === "vat-calculator") return `${profile.consumptionTaxName} Calculator`;
    if (tool.id === "gratuity-calculator") return `${profile.severanceName} Calculator`;
    return tool.title;
  };

  const getToolLink = (tool: ToolItem) => {
    if (!countryId) return tool.slug;
    return `${tool.slug}/${countryId}`;
  };

  return (
    <section className="border-t border-gray-100 pt-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-700 mt-1">{subtitle}</p>
        </div>
        <Link
          href="/free-tools"
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1.5 transition whitespace-nowrap"
        >
          View all 8 calculators
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((tool) => {
          const Icon = iconMap[tool.iconName];
          return (
            <Link
              key={tool.id}
              href={getToolLink(tool)}
              className="group bg-white border border-gray-200/80 hover:border-emerald-500/50 rounded-2xl p-6 transition duration-200 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  {tool.badge && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition mb-1.5">
                  {getToolTitle(tool)}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-900">
                <span>Calculate now</span>
                <ArrowRight className="w-3.5 h-3.5 transition transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
