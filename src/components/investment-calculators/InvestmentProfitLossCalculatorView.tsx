"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateInvestmentProfitLoss } from "@/lib/investment-calculators/engines/investmentProfitLoss";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, TrendingUp, TrendingDown, DollarSign, Tag, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is the difference between gross profit and net profit in trading?",
    answer: "Gross profit represents the simple price spread between your selling price and purchase price multiplied by unit quantity. Net profit subtracts all purchase commissions, exchange fees, selling brokerages, and adds any collected dividend income.",
  },
  {
    question: "How is the break-even selling price calculated?",
    answer: "Break-even price is the exact share price you must sell at to recover 100% of your total purchase outlay plus selling commissions and fees. Selling above this price yields a net profit.",
  },
  {
    question: "Can I use this tool for crypto, commodities, or foreign stocks?",
    answer: "Yes. The mathematical logic applies universally to any asset with a purchase price, selling price, unit quantity, and trading fee structure.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "ROI Calculator",
    href: "/free-tools/roi-calculator",
    description: "Calculate standard percentage return on capital deployed.",
    tag: "ROI",
  },
  {
    name: "Investment Return Calculator",
    href: "/free-tools/investment-return-calculator",
    description: "Calculate multi-year annualized CAGR returns across portfolios.",
    tag: "CAGR",
  },
  {
    name: "Investment Growth Calculator",
    href: "/free-tools/investment-growth-calculator",
    description: "Simulate long-term compound wealth accumulation.",
    tag: "Growth",
  },
];

export function InvestmentProfitLossCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [purchasePricePerUnit, setPurchasePricePerUnit] = useState<number>(150);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<number>(195);
  const [quantity, setQuantity] = useState<number>(100);
  const [purchaseFees, setPurchaseFees] = useState<number>(15);
  const [sellingFees, setSellingFees] = useState<number>(15);
  const [additionalCosts, setAdditionalCosts] = useState<number>(0);
  const [dividendsIncome, setDividendsIncome] = useState<number>(200);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateInvestmentProfitLoss({
      purchasePricePerUnit,
      sellingPricePerUnit,
      quantity,
      purchaseFees,
      sellingFees,
      additionalCosts,
      dividendsIncome,
      currency,
    });
  }, [purchasePricePerUnit, sellingPricePerUnit, quantity, purchaseFees, sellingFees, additionalCosts, dividendsIncome, currency]);

  const handleReset = () => {
    setPurchasePricePerUnit(150);
    setSellingPricePerUnit(195);
    setQuantity(100);
    setPurchaseFees(15);
    setSellingFees(15);
    setAdditionalCosts(0);
    setDividendsIncome(200);
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "investment-profit-loss-calculator" });
    const summary = [
      "=== Saviora Investment Profit & Loss Summary ===",
      `Quantity: ${quantity} units @ ${formatInvestmentCurrency(purchasePricePerUnit, currency)} purchase price`,
      `Total Purchase Outlay: ${formatInvestmentCurrency(result.totalPurchaseCost, currency)}`,
      `Selling Price: ${formatInvestmentCurrency(sellingPricePerUnit, currency)} per unit`,
      `Net Sale Realized: ${formatInvestmentCurrency(result.netSaleValue, currency)}`,
      `Net Profit/Loss: ${result.isProfit ? "+" : ""}${formatInvestmentCurrency(result.netProfit, currency)}`,
      `Return %: ${result.profitPercentage.toFixed(2)}%`,
      `Break-Even Selling Price: ${formatInvestmentCurrency(result.breakEvenSellingPrice, currency)} per unit`,
      "Generated at: https://saviora.app/free-tools/investment-profit-loss-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "investment-profit-loss-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Purchase Price Per Unit", value: formatInvestmentCurrency(purchasePricePerUnit, currency) },
    { label: "Selling Price Per Unit", value: formatInvestmentCurrency(sellingPricePerUnit, currency) },
    { label: "Units / Share Quantity", value: quantity.toString() },
    { label: "Brokerage & Transaction Fees", value: formatInvestmentCurrency(purchaseFees + sellingFees + additionalCosts, currency) },
    { label: "Dividends / Distributions", value: formatInvestmentCurrency(dividendsIncome, currency) },
    { label: "Reporting Currency", value: currency },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI */}
      <div className="print:hidden">
        <InvestmentBreadcrumb items={[{ label: "Investment Profit & Loss Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Stock, Share & Asset Trading Engine"
          title="Investment Profit & Loss Calculator"
          description="Calculate exact realized or unrealized trading profits, percentage gains, brokerage commissions, dividend additions, and your break-even selling price."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Trade &amp; Asset Parameters</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Buy Price / Unit ({currency})
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="1"
                    value={purchasePricePerUnit || ""}
                    onChange={(e) => setPurchasePricePerUnit(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sell Price / Unit ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={sellingPricePerUnit || ""}
                    onChange={(e) => setSellingPricePerUnit(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quantity (Shares/Units)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={quantity || ""}
                    onChange={(e) => setQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Fees and Dividends */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Buy Fee / Brokerage ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={purchaseFees || ""}
                    onChange={(e) => setPurchaseFees(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Sell Fee / Exit ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={sellingFees || ""}
                    onChange={(e) => setSellingFees(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Dividends Earned ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={dividendsIncome || ""}
                    onChange={(e) => setDividendsIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>

          {/* Right Column: Profit/Loss Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`rounded-2xl p-6 sm:p-7 border shadow-xs ${
              result.isProfit
                ? "bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-emerald-200/80"
                : "bg-gradient-to-br from-rose-50 via-white to-red-50 border-rose-200/80"
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Net Profit / Loss
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  result.isProfit ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                }`}>
                  {result.isProfit ? "Profit" : "Loss"} ({result.profitPercentage.toFixed(2)}%)
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${
                  result.isProfit ? "text-emerald-700" : "text-rose-600"
                }`}>
                  {result.isProfit ? "+" : ""}{formatInvestmentCurrency(result.netProfit, currency)}
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Break-even price: {formatInvestmentCurrency(result.breakEvenSellingPrice, currency)} / unit
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-2xs cursor-pointer"
                  title="Print or Save as Official PDF Assessment Report"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print / PDF Report</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-2xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Summary"}</span>
                </button>
              </div>

              {/* Metrics */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/60 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
                  <p className="text-slate-500">Total Purchase Cost</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.totalPurchaseCost, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
                  <p className="text-slate-500">Net Sale Value</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.netSaleValue, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
                  <p className="text-slate-500">Target for +10% Profit</p>
                  <p className="text-xs font-bold text-emerald-700 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.priceFor10PercentTarget, currency)} / unit
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
                  <p className="text-slate-500">Target for +20% Profit</p>
                  <p className="text-xs font-bold text-emerald-700 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.priceFor20PercentTarget, currency)} / unit
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown */}
            <InvestmentVisualBreakdown
              title="Trade Cash Flow Allocation"
              currency={currency}
              segments={[
                { label: "Invested Capital", amount: result.totalPurchaseCost, color: "bg-indigo-600" },
                { label: "Net Gain", amount: Math.max(0, result.netProfit), color: "bg-emerald-500" },
                { label: "Trading Fees", amount: result.totalFees, color: "bg-amber-400" },
              ]}
            />
          </div>
        </div>

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["investment-profit-loss-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["investment-profit-loss-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Trading & Asset Gains" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Investment Profit &amp; Loss Assessment Report"
        calculatorName="Investment Profit &amp; Loss Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Net Profit / Loss Realized",
          value: `${result.isProfit ? "+" : ""}${formatInvestmentCurrency(result.netProfit, currency)}`,
          subtext: `Return: ${result.profitPercentage.toFixed(2)}% | Break-Even Price: ${formatInvestmentCurrency(result.breakEvenSellingPrice, currency)}`,
        }}
        keyMetrics={[
          { label: "Total Purchase Outlay", value: formatInvestmentCurrency(result.totalPurchaseCost, currency) },
          { label: "Net Sale Proceeds", value: formatInvestmentCurrency(result.netSaleValue, currency) },
          { label: "Total Brokerage Fees", value: formatInvestmentCurrency(result.totalFees, currency) },
          { label: "Dividends Received", value: formatInvestmentCurrency(result.dividendsIncome, currency) },
          { label: "Unit Quantity", value: quantity.toString() },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.totalPurchaseCost, currency),
          investedPercent: `${result.netSaleValue > 0 ? ((result.totalPurchaseCost / result.netSaleValue) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(Math.max(0, result.netProfit), currency),
          growthPercent: `${result.netSaleValue > 0 ? ((Math.max(0, result.netProfit) / result.netSaleValue) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.netSaleValue, currency),
        }}
      />
    </div>
  );
}
