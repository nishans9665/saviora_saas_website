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
  ShieldCheck,
  CheckCircle2,
  Building2,
  Sparkles,
  Globe2,
} from "lucide-react";
import { Breadcrumb } from "../shared/Breadcrumb";
import { CountryFlag } from "../shared/CountryFlag";
import { CalculatorFAQ, FAQItem } from "../shared/CalculatorFAQ";
import { ToolFinalCTA } from "../shared/ToolFinalCTA";
import { SupportedCountryId } from "@/lib/calculators/types";
import { COUNTRY_PROFILES, ALL_COUNTRY_IDS, getCountryProfile } from "@/lib/calculators/rules/countryRegistry";

interface ToolItemDef {
  id: string;
  baseSlug: string;
  defaultTitle: string;
  defaultDesc: string;
  category: "salary" | "tax" | "statutory" | "business";
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  features: string[];
}

const TOOLS_CONFIG: ToolItemDef[] = [
  {
    id: "salary-calculator",
    baseSlug: "/free-tools/salary-calculator",
    defaultTitle: "Global Salary Calculator",
    defaultDesc: "Calculate gross-to-net salary breakdown, retirement deductions, income tax, and employer Cost to Company (CTC).",
    category: "salary",
    icon: Wallet,
    badge: "Most Popular",
    features: ["Gross to Net Breakdown", "Country-Specific Deductions", "Cost to Company (CTC)", "Annualized Pay Summary"],
  },
  {
    id: "income-tax-calculator",
    baseSlug: "/free-tools/income-tax-calculator",
    defaultTitle: "Income Tax Calculator",
    defaultDesc: "Compute personal income tax across progressive brackets, standard deductions, and tax-free allowances.",
    category: "tax",
    icon: Scale,
    badge: "Updated 2024/2025",
    features: ["Progressive Slab Math", "Effective vs Marginal Rates", "Social Security / FICA / NI", "Official Authority Rules"],
  },
  {
    id: "take-home-salary-calculator",
    baseSlug: "/free-tools/take-home-salary-calculator",
    defaultTitle: "Take-Home Pay Calculator",
    defaultDesc: "See exact cash in-hand received each month after retirement savings, taxes, and voluntary company deductions.",
    category: "salary",
    icon: Coins,
    badge: "Essential",
    features: ["In-Hand Salary Estimation", "Auto or Manual Tax Mode", "Deductions Percentage", "Visual Net Pay Bar"],
  },
  {
    id: "epf-calculator",
    baseSlug: "/free-tools/epf-calculator",
    defaultTitle: "Pension & Retirement Calculator",
    defaultDesc: "Calculate mandatory employee deductions and employer contributions for 401(k), Super, CPF, and EPF.",
    category: "statutory",
    icon: PiggyBank,
    features: ["Statutory Contribution Rates", "Employee vs Employer Share", "Compound Growth Forecast", "Retirement Nest Egg"],
  },
  {
    id: "etf-calculator",
    baseSlug: "/free-tools/etf-calculator",
    defaultTitle: "Employer Contribution Calculator",
    defaultDesc: "Track 100% employer-funded statutory contributions, payroll taxes, insurance, and cumulative fund value.",
    category: "statutory",
    icon: Building2,
    features: ["100% Employer Funded", "Zero Employee Deduction", "Tenure Value Forecast", "Statutory Compliance"],
  },
  {
    id: "vat-calculator",
    baseSlug: "/free-tools/vat-calculator",
    defaultTitle: "VAT / GST / Sales Tax Calculator",
    defaultDesc: "Add consumption tax to net prices or reverse-calculate pre-tax amounts from gross receipts instantly.",
    category: "business",
    icon: Percent,
    features: ["Add or Remove Tax Modes", "Preset Regional Rates", "Formula Transparency", "Rounding Precision"],
  },
  {
    id: "gratuity-calculator",
    baseSlug: "/free-tools/gratuity-calculator",
    defaultTitle: "Gratuity & Severance Calculator",
    defaultDesc: "Estimate statutory end-of-service gratuity, redundancy benefits, or severance pay based on employment tenure.",
    category: "statutory",
    icon: Receipt,
    features: ["Statutory Service Rules", "Tenure Eligibility Check", "Last Drawn Salary Basis", "Tax Exemption Guidance"],
  },
  {
    id: "overtime-calculator",
    baseSlug: "/free-tools/overtime-calculator",
    defaultTitle: "Overtime Pay Calculator",
    defaultDesc: "Compute normal hourly wages, 1.5x regular overtime, and 2.0x holiday pay under governing labour laws.",
    category: "salary",
    icon: Clock,
    features: ["Standard Hours Basis", "1.5x Normal Overtime", "2.0x Holiday / Rest Day Pay", "Total Monthly Salary"],
  },
];

export function FreeToolsHubView() {
  const [selectedCountry, setSelectedCountry] = React.useState<SupportedCountryId | "all">("all");

  const activeProfile = selectedCountry !== "all" ? getCountryProfile(selectedCountry) : null;

  const getToolTitle = (tool: ToolItemDef) => {
    if (!activeProfile) return tool.defaultTitle;
    if (tool.id === "salary-calculator") return `${activeProfile.name} Salary Calculator`;
    if (tool.id === "income-tax-calculator") return `${activeProfile.name} Income Tax Calculator`;
    if (tool.id === "take-home-salary-calculator") return `${activeProfile.name} Take-Home Pay`;
    if (tool.id === "epf-calculator") return `${activeProfile.pensionName} Calculator`;
    if (tool.id === "etf-calculator") return `${activeProfile.name} Employer Contributions`;
    if (tool.id === "vat-calculator") return `${activeProfile.consumptionTaxName} Calculator`;
    if (tool.id === "gratuity-calculator") return `${activeProfile.severanceName} Calculator`;
    if (tool.id === "overtime-calculator") return `${activeProfile.name} Overtime Calculator`;
    return tool.defaultTitle;
  };

  const getToolHref = (tool: ToolItemDef) => {
    if (selectedCountry === "all") return tool.baseSlug;
    return `${tool.baseSlug}/${selectedCountry}`;
  };

  const faqs: FAQItem[] = [
    {
      question: "Are these financial calculators completely free to use?",
      answer: "Yes, 100% free with no sign-up, no email registration, and no credit card required. You can run unlimited salary, tax, and employment calculations directly in your web browser.",
    },
    {
      question: "Which countries are officially supported?",
      answer: "We support verified statutory calculation rules for the United States (IRS / FLSA), United Kingdom (HMRC / PAYE), Australia (ATO Stage 3 / Superannuation), Canada (CRA / CPP / EI), India (Section 115BAC / EPF / Gratuity), Sri Lanka (IRD APIT / EPF / ETF), Singapore (IRAS / CPF / GST), and the United Arab Emirates (FTA / UAE Labour Law 0% Income Tax).",
    },
    {
      question: "Does Saviora store or transmit my financial data?",
      answer: "No. All calculations run completely client-side in your web browser using modern JavaScript engines. Saviora never sends, logs, or stores your salary or personal financial numbers on any server.",
    },
    {
      question: "How accurate are the tax brackets and statutory rates?",
      answer: "Our calculation engines are meticulously configured with official statutory rates published by government revenue departments (IRS, HMRC, ATO, CRA, EPFO, IRD, IRAS, FTA). We continuously update rules for new assessment years.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-16 md:pb-24 border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Breadcrumb items={[{ label: "Free Tools" }]} />

          <div className="text-center max-w-3xl mx-auto mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free, Interactive & Browser-Based</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight sm:leading-none">
              Global Salary &amp; Tax <span className="text-emerald-700">Calculators</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Calculate salaries, progressive income taxes, retirement contributions, overtime, and statutory benefits across 8 major economies with zero registration.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Free & No Sign-up</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Data Storage (100% Private)</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>8 Target Markets Supported</span>
              </div>
            </div>
          </div>

          {/* Market Filter Tabs */}
          <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-2.5 max-w-4xl mx-auto shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedCountry("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  selectedCountry === "all"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                All Markets
              </button>
              {ALL_COUNTRY_IDS.map((id) => {
                const p = COUNTRY_PROFILES[id];
                const isActive = selectedCountry === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedCountry(id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <CountryFlag code={p.code} className="w-4 h-3 rounded-2xs shrink-0" />
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {activeProfile ? `${activeProfile.name} Calculators & Tools` : "All 8 Free Financial Calculators"}
            </h2>
            <p className="text-sm text-gray-700 mt-1">
              {activeProfile
                ? `Calculations tailored to official ${activeProfile.taxAuthorityName} regulations and ${activeProfile.defaultCurrency} currency.`
                : "Select any tool below to calculate your figures in real-time."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS_CONFIG.map((tool) => {
            const Icon = tool.icon;
            const title = getToolTitle(tool);
            const href = getToolHref(tool);

            return (
              <Link
                key={tool.id}
                href={href}
                className="group bg-white border border-gray-200/90 hover:border-emerald-500/60 rounded-3xl p-6 transition duration-200 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    {tool.badge && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition mb-2">
                    {title}
                  </h3>

                  <p className="text-xs text-gray-700 leading-relaxed mb-4">
                    {tool.defaultDesc}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {tool.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-900">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-4 h-4 transition transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Statutory Authorities Shelf */}
      <section className="bg-gray-50/70 border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-gray-900">
              Verified Against Official Statutory Authorities
            </h3>
            <p className="text-xs text-gray-700 mt-1">
              Every formula is benchmarked against statutory publications and tax schedules.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {ALL_COUNTRY_IDS.map((id) => {
              const p = COUNTRY_PROFILES[id];
              return (
                <div
                  key={id}
                  className="bg-white border border-gray-200/80 rounded-2xl p-3.5 text-center shadow-2xs hover:border-emerald-400 transition"
                >
                  <CountryFlag code={p.code} className="w-8 h-6 rounded shadow-xs mx-auto mb-1 shrink-0" />
                  <div className="text-xs font-bold text-gray-900 mt-1.5 truncate">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-gray-700 mt-0.5 truncate">
                    {p.defaultCurrency} ({p.currencySymbol.trim()})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ & CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <CalculatorFAQ
          title="Frequently Asked Questions: Global Salary & Tax Tools"
          subtitle="Learn more about browser-based calculations, privacy, and statutory compliance."
          items={faqs}
        />

        <ToolFinalCTA />
      </div>
    </div>
  );
}
