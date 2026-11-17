"use client";

import * as React from "react";
import Link from "next/link";
import {
  Wallet,
  Scale,
  Coins,
  ShieldCheck,
  Building2,
  Receipt,
  Award,
  Timer,
  Calculator,
  UserCheck,
  Home,
  Car,
  Percent,
  Layers,
  Landmark,
  CreditCard,
  ArrowDownRight,
  TrendingUp,
  Repeat,
  Target,
  Umbrella,
  BarChart3,
  Flame,
  PiggyBank,
  PieChart,
  LineChart,
  Shield,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MegaMenuToolItem {
  name: string;
  shortDescription: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

export interface MegaMenuCategory {
  id: string;
  title: string;
  subtitle: string;
  hubHref: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  headerBg: string;
  headerBorder: string;
  iconColor: string;
  tools: MegaMenuToolItem[];
}

export const FREE_TOOLS_CATEGORIES: MegaMenuCategory[] = [
  {
    id: "salary-tax",
    title: "Salary & Tax Calculators",
    subtitle: "Tax brackets, take-home pay & statutory payroll deductions.",
    hubHref: "/free-tools/salary-tax-calculators",
    badge: "8 Tools",
    icon: Wallet,
    headerBg: "bg-emerald-50 dark:bg-emerald-950/50",
    headerBorder: "border-emerald-200/80 dark:border-emerald-800/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    tools: [
      {
        name: "Salary Calculator",
        shortDescription: "Gross to net pay & deductions breakdown",
        href: "/free-tools/salary-calculator",
        icon: Wallet,
        tag: "Popular",
      },
      {
        name: "Income Tax Calculator",
        shortDescription: "Progressive tax brackets & allowances",
        href: "/free-tools/income-tax-calculator",
        icon: Scale,
        tag: "Updated",
      },
      {
        name: "Take-Home Salary",
        shortDescription: "Net in-hand salary after taxes",
        href: "/free-tools/take-home-salary-calculator",
        icon: Coins,
      },
      {
        name: "EPF & Pension",
        shortDescription: "Provident fund & employee retirement",
        href: "/free-tools/epf-calculator",
        icon: ShieldCheck,
      },
      {
        name: "Employer ETF Contributions",
        shortDescription: "Statutory employer trust fund calculation",
        href: "/free-tools/etf-calculator",
        icon: Building2,
      },
      {
        name: "VAT / GST Calculator",
        shortDescription: "Add or remove value-added sales tax",
        href: "/free-tools/vat-calculator",
        icon: Receipt,
      },
      {
        name: "Gratuity Calculator",
        shortDescription: "Statutory end-of-service severance benefit",
        href: "/free-tools/gratuity-calculator",
        icon: Award,
      },
      {
        name: "Overtime (OT) Pay",
        shortDescription: "Normal & holiday overtime hourly rate",
        href: "/free-tools/overtime-calculator",
        icon: Timer,
      },
    ],
  },
  {
    id: "loan-financial",
    title: "Loan & Financial Calculators",
    subtitle: "Monthly EMI payments, interest math & payoff schedules.",
    hubHref: "/free-tools/loan-financial-tools",
    badge: "9 Tools",
    icon: Landmark,
    headerBg: "bg-blue-50 dark:bg-blue-950/50",
    headerBorder: "border-blue-200/80 dark:border-blue-800/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    tools: [
      {
        name: "Loan EMI Calculator",
        shortDescription: "Monthly payment & full amortization schedule",
        href: "/free-tools/loan-emi-calculator",
        icon: Calculator,
        tag: "Popular",
      },
      {
        name: "Personal Loan Calculator",
        shortDescription: "Borrowing costs & monthly repayments",
        href: "/free-tools/personal-loan-calculator",
        icon: UserCheck,
      },
      {
        name: "Home Loan Calculator",
        shortDescription: "Mortgage instalments & interest cost",
        href: "/free-tools/home-loan-calculator",
        icon: Home,
      },
      {
        name: "Vehicle Loan Calculator",
        shortDescription: "Auto finance, down payment & trade-in",
        href: "/free-tools/vehicle-loan-calculator",
        icon: Car,
      },
      {
        name: "Simple Interest Calculator",
        shortDescription: "Flat rate interest over tenure",
        href: "/free-tools/simple-interest-calculator",
        icon: Percent,
      },
      {
        name: "Compound Interest",
        shortDescription: "Compounding growth & future balance",
        href: "/free-tools/compound-interest-calculator",
        icon: Layers,
        tag: "Popular",
      },
      {
        name: "Fixed Deposit (FD)",
        shortDescription: "Maturity value & accrued interest",
        href: "/free-tools/fixed-deposit-calculator",
        icon: Landmark,
      },
      {
        name: "Credit Card Interest",
        shortDescription: "Payoff time & interest charges",
        href: "/free-tools/credit-card-interest-calculator",
        icon: CreditCard,
      },
      {
        name: "Debt Repayment Calculator",
        shortDescription: "Snowball vs. Avalanche payoff strategy",
        href: "/free-tools/debt-repayment-calculator",
        icon: ArrowDownRight,
      },
    ],
  },
  {
    id: "investment-savings",
    title: "Investment & Savings Tools",
    subtitle: "Wealth forecasting, SIP investments & target savings goals.",
    hubHref: "/free-tools/investment-savings-tools",
    badge: "10 Tools",
    icon: TrendingUp,
    headerBg: "bg-amber-50 dark:bg-amber-950/50",
    headerBorder: "border-amber-200/80 dark:border-amber-800/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    tools: [
      {
        name: "Investment Return",
        shortDescription: "Total return & annualized CAGR growth",
        href: "/free-tools/investment-return-calculator",
        icon: TrendingUp,
      },
      {
        name: "SIP Calculator",
        shortDescription: "Systematic investment plan wealth growth",
        href: "/free-tools/sip-calculator",
        icon: Repeat,
        tag: "Popular",
      },
      {
        name: "Savings Goal Calculator",
        shortDescription: "Required monthly deposit for target goal",
        href: "/free-tools/savings-goal-calculator",
        icon: Target,
      },
      {
        name: "Retirement Calculator",
        shortDescription: "Retirement nest egg & pension needs",
        href: "/free-tools/retirement-calculator",
        icon: Umbrella,
      },
      {
        name: "Investment Profit / Loss",
        shortDescription: "Buy & sell trade profit, ROI percentage",
        href: "/free-tools/investment-profit-loss-calculator",
        icon: BarChart3,
      },
      {
        name: "Inflation Calculator",
        shortDescription: "Purchasing power loss over years",
        href: "/free-tools/inflation-calculator",
        icon: Flame,
      },
      {
        name: "Monthly Savings Calculator",
        shortDescription: "Compound growth of regular savings",
        href: "/free-tools/monthly-savings-calculator",
        icon: PiggyBank,
      },
      {
        name: "ROI Calculator",
        shortDescription: "Financial return on investment ratio",
        href: "/free-tools/roi-calculator",
        icon: PieChart,
      },
      {
        name: "Investment Growth",
        shortDescription: "Multi-year compounding projections",
        href: "/free-tools/investment-growth-calculator",
        icon: LineChart,
      },
      {
        name: "Emergency Fund Calculator",
        shortDescription: "Calculate 3 to 12 months safety reserve",
        href: "/free-tools/emergency-fund-calculator",
        icon: Shield,
      },
    ],
  },
];

interface FreeToolsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function FreeToolsMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: FreeToolsMegaMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[1140px] max-w-[calc(100vw-32px)] z-50 transition-all duration-200 origin-top",
        isOpen
          ? "opacity-100 visible translate-y-0 pointer-events-auto"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      )}
      role="region"
      aria-label="Free Tools Mega Menu"
    >
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/50 p-6 lg:p-7 overflow-hidden backdrop-blur-xl">
        
        {/* Three Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {FREE_TOOLS_CATEGORIES.map((category, idx) => {
            const HeaderIcon = category.icon;
            const isLast = idx === FREE_TOOLS_CATEGORIES.length - 1;

            return (
              <div
                key={category.id}
                className={cn(
                  "flex flex-col justify-between h-full",
                  !isLast && "md:border-r md:border-slate-100 md:dark:border-slate-800/80 md:pr-6 lg:pr-7"
                )}
              >
                {/* Column Header */}
                <div className="mb-3">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center border flex-shrink-0",
                          category.headerBg,
                          category.headerBorder,
                          category.iconColor
                        )}
                      >
                        <HeaderIcon className="w-3.5 h-3.5" />
                      </span>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {category.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                    {category.subtitle}
                  </p>
                  <Link
                    href={category.hubHref}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors group/link pb-1 border-b border-dashed border-primary-200 dark:border-primary-900/60"
                  >
                    <span>View Category Hub</span>
                    <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* List of Tools */}
                <div className="space-y-0.5 mt-1">
                  {category.tools.map((tool) => {
                    const ToolIcon = tool.icon;

                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-1.5 px-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-150 group/item focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover/item:bg-emerald-50 dark:group-hover/item:bg-emerald-950/60 group-hover/item:text-primary-600 dark:group-hover/item:text-emerald-400 transition-colors border border-slate-200/50 dark:border-slate-700/50">
                            <ToolIcon className="w-3 h-3" />
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors truncate">
                                {tool.name}
                              </span>
                              {tool.tag && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex-shrink-0">
                                  {tool.tag}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block leading-tight">
                              {tool.shortDescription}
                            </span>
                          </div>
                        </div>

                        <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 group-hover/item:translate-x-0.5 opacity-0 group-hover/item:opacity-100 transition-all duration-150 flex-shrink-0 ml-1.5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mega Menu Footer Banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/30 -mx-6 -mb-6 p-4 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>
              All 27 calculators are <strong className="font-semibold text-slate-900 dark:text-white">100% free</strong> with no registration, no paywalls, and instant in-browser results.
            </span>
          </div>

          <Link
            href="/free-tools"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 bg-emerald-100/80 hover:bg-emerald-200/80 dark:bg-emerald-950/70 dark:hover:bg-emerald-900/80 px-3.5 py-1.5 rounded-full border border-emerald-300/60 dark:border-emerald-800 transition-all duration-150 shadow-2xs group/all flex-shrink-0"
          >
            <span>Explore All 27 Tools Directory</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/all:translate-x-1 transition-transform duration-150" />
          </Link>
        </div>

      </div>
    </div>
  );
}
