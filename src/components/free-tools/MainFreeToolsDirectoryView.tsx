"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Zap,
  Lock,
  Calculator,
  Wallet,
  Scale,
  Landmark,
  TrendingUp,
  PiggyBank,
  Coins,
  Receipt,
  Percent,
  ChevronDown,
  Building2,
  PieChart,
  Target,
  BarChart3,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { LAUNCH_OFFER } from "@/lib/offer-config";

interface CategoryCardDef {
  id: string;
  title: string;
  description: string;
  toolCount: number;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  accentBg: string;
  iconBg: string;
  tools: string[];
}

const CATEGORIES: CategoryCardDef[] = [
  {
    id: "salary-tax",
    title: "Salary & Tax Calculators",
    description:
      "Understand your salary, estimate income tax, calculate take-home pay, and explore employment-related deductions and contributions using country-specific salary and tax calculators.",
    toolCount: 8,
    badge: "Country-Specific Rulesets",
    icon: Wallet,
    route: "/free-tools/salary-tax-calculators",
    accentBg: "hover:border-[#22c55e]/50",
    iconBg: "bg-emerald-50 text-[#16a34a] group-hover:bg-[#22c55e] group-hover:text-white",
    tools: [
      "Salary Calculator",
      "Income Tax Calculator",
      "Take-Home Salary Calculator",
      "EPF & Pension Calculator",
      "VAT / GST Calculator",
      "Overtime Calculator",
      "Gratuity Calculator",
      "Employer Contributions (ETF)",
    ],
  },
  {
    id: "loan-financial",
    title: "Loan & Financial Calculators",
    description:
      "Calculate loan repayments, estimate borrowing costs, understand interest, and compare different financial scenarios before making important borrowing decisions.",
    toolCount: 9,
    badge: "Amortization & Payoff",
    icon: Landmark,
    route: "/free-tools/loan-financial-tools",
    accentBg: "hover:border-blue-500/50",
    iconBg: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    tools: [
      "Loan EMI Calculator",
      "Personal Loan Calculator",
      "Home Loan Calculator",
      "Vehicle Loan Calculator",
      "Simple Interest Calculator",
      "Compound Interest Calculator",
      "Fixed Deposit Calculator",
      "Credit Card Interest Calculator",
      "Debt Repayment Calculator",
    ],
  },
  {
    id: "investment-savings",
    title: "Investment & Savings Calculators",
    description:
      "Plan your financial future with practical investment and savings calculators. Estimate investment growth, calculate recurring contributions, plan retirement, and understand how much you need to save to reach your financial goals.",
    toolCount: 10,
    badge: "Wealth & Growth",
    icon: TrendingUp,
    route: "/free-tools/investment-savings-tools",
    accentBg: "hover:border-amber-500/50",
    iconBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    tools: [
      "Investment Return Calculator",
      "SIP Calculator",
      "Savings Goal Calculator",
      "Retirement Calculator",
      "Investment Profit & Loss Calculator",
      "Inflation Calculator",
      "Monthly Savings Calculator",
      "ROI Calculator",
      "Investment Growth Calculator",
      "Emergency Fund Calculator",
    ],
  },
];

interface PopularToolDef {
  name: string;
  category: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const POPULAR_TOOLS: PopularToolDef[] = [
  {
    name: "Loan EMI Calculator",
    category: "Loan & Financial",
    description:
      "Calculate monthly loan installments, principal-to-interest ratios, and view year-by-year amortization schedules.",
    href: "/free-tools/loan-emi-calculator",
    icon: Calculator,
    tag: "Most Used",
  },
  {
    name: "Global Salary Calculator",
    category: "Salary & Tax",
    description:
      "Estimate gross-to-net salary breakdown, retirement deductions, income tax, and total employer Cost to Company.",
    href: "/free-tools/salary-calculator",
    icon: Wallet,
    tag: "Essential",
  },
  {
    name: "Income Tax Calculator",
    category: "Salary & Tax",
    description:
      "Compute personal income tax liabilities across progressive tax brackets, standard allowances, and tax bands.",
    href: "/free-tools/income-tax-calculator",
    icon: Scale,
    tag: "Updated 2024/2025",
  },
  {
    name: "SIP Calculator",
    category: "Investment & Savings",
    description:
      "Project future wealth accumulation from recurring monthly mutual fund and index fund Systematic Investment Plans.",
    href: "/free-tools/sip-calculator",
    icon: TrendingUp,
    tag: "Wealth Building",
  },
  {
    name: "Compound Interest Calculator",
    category: "Loan & Financial",
    description:
      "Forecast exponential compound growth with custom deposit intervals, annual return rates, and compounding cycles.",
    href: "/free-tools/compound-interest-calculator",
    icon: Percent,
    tag: "Compounding",
  },
  {
    name: "Savings Goal Calculator",
    category: "Investment & Savings",
    description:
      "Determine the exact monthly savings deposit required to hit your house deposit, wedding, or target milestone on time.",
    href: "/free-tools/savings-goal-calculator",
    icon: PiggyBank,
    tag: "Target Planner",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const DIRECTORY_FAQS: FAQItem[] = [
  {
    question: "Are Saviora's financial calculators free to use?",
    answer:
      "Yes, 100% free with no hidden charges, paywalls, or limits on how many calculations you can run. Every calculator is publicly available for personal or professional financial planning.",
  },
  {
    question: "Do I need to create an account to use the calculators?",
    answer:
      "No. All calculators work directly in your web browser with zero registration required. You do not need to enter an email, create a password, or provide credit card information.",
  },
  {
    question: "Which financial calculators are available on Saviora?",
    answer:
      "Saviora offers 27 interactive calculators grouped into three dedicated categories: Salary & Tax Tools (8 tools), Loan & Financial Tools (9 tools), and Investment & Savings Tools (10 tools).",
  },
  {
    question: "Can I use Saviora calculators from different countries?",
    answer:
      "Yes. Our Salary & Tax calculators feature verified statutory rulesets for 8 major economies (United States, United Kingdom, Australia, Canada, India, Sri Lanka, Singapore, and the United Arab Emirates). Our Loan and Investment calculators are universal and work for users worldwide.",
  },
  {
    question: "Do the calculators support multiple currencies?",
    answer:
      "Yes. Our loan and investment calculators support 11 international currencies including USD ($), GBP (£), EUR (€), AUD (A$), CAD (C$), INR (₹), LKR (Rs.), SGD (S$), AED (AED), NZD (NZ$), and JPY (¥) with localized number formatting.",
  },
  {
    question: "Are the calculator results accurate?",
    answer:
      "Yes. All calculation engines are built on standard financial mathematics, reducing-balance loan amortization schedules, annuity due formulas, and statutory tax publications. Results are reliable estimates for financial planning.",
  },
  {
    question: "Can I use these tools on my mobile phone?",
    answer:
      "Yes. Every tool is built with a responsive, mobile-first design, making it fast and easy to calculate on smartphones, tablets, laptops, and desktop computers.",
  },
  {
    question: "Can I save or export my calculations?",
    answer:
      "Yes. Many calculators offer one-click features to copy calculation summaries to your clipboard, download full amortization tables as CSV spreadsheets, or print official assessment reports.",
  },
  {
    question: "Are the calculator results financial advice?",
    answer:
      "No. All calculator results and informational guides are provided for educational and illustrative planning purposes only. They do not constitute certified financial, tax, investment, or legal advice.",
  },
];

export function MainFreeToolsDirectoryView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleScrollToCategories = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById("tools-categories");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-white">
        {/* Subtle Ambient Background Glow matching Homepage Hero */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[480px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.12),transparent_75%)]" />
          <div className="absolute top-10 -left-20 w-[400px] h-[400px] bg-emerald-400/8 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute top-10 -right-20 w-[400px] h-[400px] bg-emerald-300/8 rounded-full blur-[110px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            {/* Top Pill Badge */}
            <div className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-2 py-1 px-3.5 sm:py-1.5 sm:px-4 rounded-full bg-emerald-50 text-[#16a34a] text-xs sm:text-sm font-semibold border border-[#22c55e]/25 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
                <span>FREE FINANCIAL TOOLS</span>
              </span>
            </div>

            {/* Main Headline - Balanced & Device-Responsive */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.2] mb-4 sm:mb-6 max-w-3xl lg:max-w-4xl mx-auto">
              Free Financial Calculators &amp;{" "}
              <span className="text-[#22c55e] inline-block">
                Money Management Tools
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 font-normal">
              Explore Saviora&apos;s collection of free online financial calculators and money management tools.
              Calculate loan payments, estimate income taxes, plan investments, track savings goals, and make smarter
              financial decisions with easy-to-use tools. No registration required.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <a
                href="#tools-categories"
                onClick={handleScrollToCategories}
                className="w-full sm:w-auto text-sm sm:text-base bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold shadow-md shadow-[#22c55e]/20 hover:shadow-lg hover:shadow-[#22c55e]/30 hover:-translate-y-0.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Free Tools</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href={LAUNCH_OFFER.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-sm sm:text-base bg-white border border-slate-200 text-slate-800 shadow-2xs hover:shadow-xs hover:border-slate-300 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Managing Your Money</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="w-full max-w-3xl pt-6 sm:pt-7 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div className="p-2">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">27</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">Free Calculators</p>
              </div>
              <div className="p-2">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#16a34a]">3</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">Core Categories</p>
              </div>
              <div className="p-2">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">11</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">Supported Currencies</p>
              </div>
              <div className="p-2">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#16a34a]">100%</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">Free &amp; Browser-Based</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & BENEFITS SECTION */}
      <section className="py-12 bg-slate-50/60 border-y border-slate-200/80" aria-label="Tool Benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16a34a] flex items-center justify-center mb-2.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">100% Free to Use</h3>
              <p className="text-[11px] text-slate-500 mt-1">Zero paywalls or limits</p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">No Sign-up Needed</h3>
              <p className="text-[11px] text-slate-500 mt-1">Instant browser access</p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Instant Calculations</h3>
              <p className="text-[11px] text-slate-500 mt-1">Real-time math engines</p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Browser-Based Tools</h3>
              <p className="text-[11px] text-slate-500 mt-1">Desktop &amp; mobile ready</p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16a34a] flex items-center justify-center mb-2.5">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Privacy-Focused</h3>
              <p className="text-[11px] text-slate-500 mt-1">Calculations run client-side</p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">11 Currencies</h3>
              <p className="text-[11px] text-slate-500 mt-1">USD, GBP, EUR, &amp; more</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE FINANCIAL TOOLS (CATEGORY CARDS) */}
      <section id="tools-categories" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#16a34a] border border-[#22c55e]/20 mb-3">
            <span>TOOL DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Our Free Financial Tools
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Find the right financial calculator for your needs. Whether you want to understand your salary, calculate
            monthly loan payments, or plan your long-term savings, Saviora provides practical tools to help you make
            informed financial decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group bg-white rounded-3xl p-7 border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${cat.iconBg} flex items-center justify-center transition duration-200 shadow-2xs`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                      {cat.toolCount} Tools Available
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {cat.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {cat.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      Included Calculators
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {cat.tools.slice(0, 6).map((tool, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                          <span className="truncate">{tool}</span>
                        </li>
                      ))}
                      {cat.tools.length > 6 && (
                        <li className="text-xs font-medium text-slate-500 pl-5 pt-0.5">
                          + {cat.tools.length - 6} more specialized tools
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100">
                  <Link
                    href={cat.route}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm bg-slate-900 hover:bg-[#16a34a] text-white transition shadow-sm group-hover:shadow-md cursor-pointer"
                  >
                    <span>Explore {cat.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. POPULAR FREE FINANCIAL CALCULATORS */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#16a34a] border border-[#22c55e]/20 mb-2">
                <span>MOST REQUESTED</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Popular Free Financial Calculators
              </h2>
              <p className="mt-1.5 text-base text-slate-600 max-w-xl font-normal">
                Start with our most frequently used calculation tools for loans, salaries, tax estimation, and wealth building.
              </p>
            </div>
            <a
              href="#tools-categories"
              onClick={handleScrollToCategories}
              className="text-sm font-semibold text-[#16a34a] hover:text-[#15803d] flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <span>View all categories</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_TOOLS.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={idx}
                  href={tool.href}
                  className="group bg-white hover:bg-white border border-slate-200/80 hover:border-[#22c55e]/50 rounded-2xl p-6 transition duration-200 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#16a34a] flex items-center justify-center group-hover:bg-[#22c55e] group-hover:text-white transition shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#16a34a] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {tool.tag}
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      {tool.category}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#16a34a] transition mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#16a34a] group-hover:text-[#15803d]">
                    <span>Calculate Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW DO SAVIORA FREE TOOLS WORK? */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#16a34a] border border-[#22c55e]/20 mb-2">
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple Financial Calculations in Three Steps
          </h2>
          <p className="mt-2 text-base text-slate-600 font-normal">
            No complex sign-up forms, downloads, or software installations required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs relative">
            <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#16a34a] font-extrabold text-sm flex items-center justify-center mb-5">
              01
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Choose Your Calculator
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Find the financial tool that matches your specific need — whether calculating monthly loan instalments,
              evaluating salary deductions, planning a mutual fund SIP, or setting up a 6-month emergency cushion.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs relative">
            <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 font-extrabold text-sm flex items-center justify-center mb-5">
              02
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Enter Your Details
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Add your loan amounts, interest rates, tenure, pay frequency, or target dates. Customise your preferred
              currency and toggle calculation assumptions in real-time.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs relative">
            <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 font-extrabold text-sm flex items-center justify-center mb-5">
              03
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Get Instant Results
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              View your calculation results immediately with interactive breakdown bars, year-by-year amortization
              schedules, printable PDF assessment reports, and downloadable CSV spreadsheets.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 font-medium">
            💡 All calculations are executed completely inside your web browser. Your numbers are never stored on any server.
          </p>
        </div>
      </section>

      {/* 6. WHY USE SAVIORA FINANCIAL TOOLS? (SEO-FRIENDLY CONTENT) */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700 leading-relaxed">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Use Saviora Financial Tools?
            </h2>
            <p className="text-base text-slate-600 mt-2 font-normal">
              Clear mathematical insights for everyday personal and household financial choices.
            </p>
          </div>

          <p className="text-base text-slate-600 font-normal">
            Managing money becomes easier when you understand the numbers behind your financial decisions.
            Saviora&apos;s free financial calculators help you estimate expenses, understand borrowing costs, plan
            savings, and explore investment scenarios.
          </p>

          <p className="text-base text-slate-600 font-normal">
            Whether you are an employee calculating your net take-home pay with our{" "}
            <Link href="/free-tools/salary-tax-calculators" className="text-[#16a34a] font-semibold underline hover:text-[#15803d]">
              Salary &amp; Tax Calculators
            </Link>
            , someone comparing mortgage and vehicle financing with our{" "}
            <Link href="/free-tools/loan-financial-tools" className="text-[#16a34a] font-semibold underline hover:text-[#15803d]">
              Loan &amp; Financial Calculators
            </Link>
            , or an individual building wealth with our{" "}
            <Link href="/free-tools/investment-savings-tools" className="text-[#16a34a] font-semibold underline hover:text-[#15803d]">
              Investment &amp; Savings Calculators
            </Link>
            , these tools provide a convenient starting point for financial planning.
          </p>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs my-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Connect Free Projections with Real-World Tracking
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              While our free calculators give you forward-looking mathematical models, achieving financial security
              requires continuous daily tracking. Saviora links forward projections with actual cash flow tools like our{" "}
              <Link href="/savings-goals" className="text-[#16a34a] font-semibold hover:underline">Savings Goals Planner</Link>,{" "}
              <Link href="/expense-tracker" className="text-[#16a34a] font-semibold hover:underline">Daily Expense Tracker</Link>,{" "}
              <Link href="/monthly-budget-planning" className="text-[#16a34a] font-semibold hover:underline">Monthly Budget Planner</Link>, and{" "}
              <Link href="/financial-analytics" className="text-[#16a34a] font-semibold hover:underline">Net Worth Analytics</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FROM FREE CALCULATIONS TO BETTER MONEY MANAGEMENT */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E104E] via-[#1E104E] to-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SAVIORA PERSONAL FINANCE APP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Go Beyond Calculations with Saviora
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Free financial calculators help you understand individual financial decisions. Saviora helps you manage
              your everyday finances in one place. Track your income and expenses, manage monthly budgets, monitor savings
              goals, and understand your financial progress with Saviora.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-200">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <Receipt className="w-4 h-4 text-[#4ade80] shrink-0" />
                <span>Income &amp; Expense Tracking</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <PieChart className="w-4 h-4 text-[#4ade80] shrink-0" />
                <span>Monthly Budget Planning</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <Target className="w-4 h-4 text-[#4ade80] shrink-0" />
                <span>Savings Goals Milestones</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <BarChart3 className="w-4 h-4 text-[#4ade80] shrink-0" />
                <span>Financial Analytics &amp; Net Worth</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 sm:col-span-2">
                <Clock className="w-4 h-4 text-[#4ade80] shrink-0" />
                <span>Recurring Transactions &amp; Bill Reminders</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={LAUNCH_OFFER.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm sm:text-base bg-[#22c55e] hover:bg-[#16a34a] text-white transition shadow-lg shadow-[#22c55e]/25 hover:shadow-xl hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get Started with Saviora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-sm sm:text-base text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition cursor-pointer"
              >
                <span>View 90-Day Free Trial</span>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
                90-Day Pro Trial Included
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#4ade80]" />
                No Credit Card Required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#16a34a] border border-[#22c55e]/20 mb-2">
              <span>FREQUENT QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-base text-slate-600 font-normal">
              Everything you need to know about Saviora free calculators, privacy, and supported features.
            </p>
          </div>

          <div className="space-y-3">
            {DIRECTORY_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-base text-slate-900 hover:text-[#16a34a] transition cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "transform rotate-180 text-[#16a34a]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 pt-3 font-normal">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
