"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, Minus, ArrowRight, Shield, Zap, Globe, Lock, RefreshCw, Star, Circle, Gem } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    id: "free-trial",
    // emoji: "🟢",
    name: "Free Trial",
    tagline: "Perfect for trying every Saviora feature.",
    price: "$0",
    period: "",
    subLabel: "30-Day Free Trial · No Credit Card Required",
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    recommended: false,
    badge: null,
    features: [
      "Full Premium Access",
      "Unlimited Income Tracking",
      "Unlimited Expense Tracking",
      "Unlimited Budgets",
      "Unlimited Savings Goals",
      "Financial Dashboard",
      "Analytics & Reports",
      "PDF / Excel Export",
      "Multi Currency",
      "Google Login",
      "Email Notifications",
    ],
  },
  {
    id: "pro-monthly",
    // emoji: "⭐",
    name: "Saviora Pro",
    tagline: "Everything you need to manage your finances for life.",
    price: "$2.99",
    period: "/month",
    subLabel: "Billed monthly · Cancel anytime",
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    recommended: true,
    badge: "Most Popular",
    features: [
      "Unlimited Everything",
      "Financial Analytics",
      "Budget Management",
      "Savings Goals",
      "Month-End Closing",
      "Advanced Reports",
      "PDF Export",
      "Excel Export",
      "Cloud Sync",
      "Mobile App",
      "Priority Support",
    ],
  },
  {
    id: "pro-yearly",
    // emoji: "💎",
    name: "Pro Yearly",
    tagline: "Best value for long-term planning.",
    price: "$29.99",
    period: "/year",
    subLabel: "Only $2.50/month • Save 16%",
    buttonText: "Start Yearly Plan",
    buttonVariant: "outline" as const,
    recommended: false, 
    badge: "Best Value",
    features: [
      "Everything in Pro Monthly",
      "Save $5.89 Every Year",
      "Priority Feature Access",
      "Early Access to New Features",
      "Unlimited Everything",
      "Financial Analytics",
      "Advanced Reports",
      "Cloud Sync",
      "Mobile App",
      "Priority Support",
      "Budget Management",
    ],
  },
];

const comparisonFeatures = [
  { name: "30-Day Full Access",           freeTrial: true,  proMonthly: false, proYearly: false },
  { name: "Unlimited Income",             freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Unlimited Expenses",           freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Unlimited Budgets",            freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Unlimited Savings Goals",      freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Financial Dashboard",          freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Advanced Analytics",           freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Month-End Closing",            freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "PDF Reports",                  freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Excel Export",                 freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "CSV Export",                   freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Mobile App",                   freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Cloud Sync",                   freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Email Notifications",          freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Multi Currency",               freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Google Login",                 freeTrial: true,  proMonthly: true,  proYearly: true  },
  { name: "Priority Support",             freeTrial: true,  proMonthly: true,  proYearly: true  },
];

const trustPoints = [
  { icon: Star,      text: "30-Day Full Premium Trial" },
  { icon: Shield,    text: "No Credit Card Required" },
  { icon: RefreshCw, text: "Cancel Anytime" },
  { icon: Lock,      text: "SSL Encrypted" },
  { icon: Zap,       text: "Secure Cloud Storage" },
  { icon: Globe,     text: "Global Currency Support" },
];

function CheckCell({ value }: { value: boolean }) {
  return (
    <td className="text-center py-3 px-4">
      {value ? (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/15">
          <Check className="w-4 h-4 text-primary-500" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-7 h-7">
          <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600" />
        </span>
      )}
    </td>
  );
}

export function Pricing() {

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* ── LAUNCH BANNER ─────────────────────────────── */}
        <AnimatedSection className="mb-14">
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-primary-500/30 bg-gradient-to-r from-primary-600/10 via-primary-500/5 to-emerald-500/10 backdrop-blur-sm p-6 text-center">
              <p className="text-sm font-semibold text-primary-500 uppercase tracking-widest mb-2">🎉 Launch Offer</p>
              <p className="text-slate-700 dark:text-slate-200 text-base font-medium">
                Start your <span className="font-bold text-slate-900 dark:text-white">30-Day Free Trial</span> today.
                Then continue for only{" "}
                <span className="font-bold text-primary-500">$2.99/month</span>{" "}
                or{" "}
                <span className="font-bold text-primary-500">$29.99/year</span>{" "}
                <span className="inline-block bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-bold px-2 py-0.5 rounded-full ml-1">Save 16%</span>
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ── HEADLINE ──────────────────────────────────── */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            Simple, Transparent{" "}
            <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            Choose the perfect plan to take control of your finances.
            Start with a <strong className="text-slate-800 dark:text-slate-200">30-day free trial</strong> and upgrade anytime.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">
            No hidden fees. Cancel anytime.
          </p>
        </AnimatedSection>

        {/* ── PRICING CARDS ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.id} delay={index * 0.1} className="h-full">
              <div
                className={`relative h-full rounded-3xl flex flex-col transition-all duration-300 ${
                  plan.recommended
                    ? "bg-slate-900 dark:bg-slate-800 border-2 border-primary-500/60 shadow-2xl shadow-primary-500/20 scale-[1.02] md:scale-105"
                    : "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/10"
                }`}
              >
                {/* Badges */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg ${
                        plan.recommended
                          ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white"
                          : "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  {/* Plan header */}
                  <div className="mb-6">
                    {/* <div className="text-3xl mb-3">{plan.emoji}</div> */}
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        plan.recommended ? "text-white" : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        plan.recommended ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-5xl font-extrabold tracking-tight ${
                          plan.recommended ? "text-white" : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span
                          className={`text-lg mb-1 font-medium ${
                            plan.recommended ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-1 font-medium ${
                        plan.recommended ? "text-primary-400" : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {plan.subLabel}
                    </p>
                  </div>

                  {/* Divider */}
                  <div
                    className={`h-px my-6 ${
                      plan.recommended ? "bg-slate-700" : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  />

                  {/* CTA Button */}
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full mb-8 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      plan.recommended
                        ? "bg-primary-500 hover:bg-primary-600 text-white border-none shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50"
                        : plan.id === "pro-yearly"
                        ? "border-amber-400/60 text-amber-600 dark:text-amber-400 hover:bg-amber-400/10"
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </Button>

                  {/* Features */}
                  <ul className="space-y-3 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            plan.recommended ? "bg-primary-500/20" : "bg-primary-500/10"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              plan.recommended ? "text-primary-400" : "text-primary-500"
                            }`}
                          />
                        </span>
                        <span
                          className={`text-sm ${
                            plan.recommended
                              ? "text-slate-200"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── TRUST SECTION ─────────────────────────────── */}
        <AnimatedSection className="mt-16 mb-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">
              Why Choose Saviora?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {trustPoints.map((tp, i) => {
                const Icon = tp.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 text-center p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 hover:shadow-md transition-all duration-200"
                  >
                    <span className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary-500" />
                    </span>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-tight">
                      {tp.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ── FEATURE COMPARISON TABLE ──────────────────── */}
        <AnimatedSection className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center text-xl font-bold text-slate-900 dark:text-white mb-8">
              Full Feature Comparison
            </h3>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-4 px-6 font-semibold text-slate-700 dark:text-slate-300 w-1/2">
                        Feature
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-slate-600 dark:text-slate-400 w-1/6">
                        <div className="flex items-center justify-center gap-1.5">
                          <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                          <span>Free Trial</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-primary-500 w-1/6 bg-primary-500/5">
                        <div className="flex items-center justify-center gap-1.5">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>Pro Monthly</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-amber-500 dark:text-amber-400 w-1/6">
                        <div className="flex items-center justify-center gap-1.5">
                          <Gem className="w-3 h-3 fill-blue-500 text-blue-500" />
                          <span>Pro Yearly</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {comparisonFeatures.map((row, i) => (
                      <tr
                        key={i}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors ${
                          i % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-900/20"
                        }`}
                      >
                        <td className="py-3 px-6 font-medium text-slate-700 dark:text-slate-300">
                          {row.name}
                        </td>
                        <CheckCell value={row.freeTrial} />
                        <td className="bg-primary-500/[0.03] text-center py-3 px-4">
                          {row.proMonthly ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/15">
                              <Check className="w-4 h-4 text-primary-500" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-7 h-7">
                              <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                            </span>
                          )}
                        </td>
                        <CheckCell value={row.proYearly} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── BOTTOM CTA ────────────────────────────────── */}
        <AnimatedSection>
          <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden">
            <div className="bg-slate-950 dark:bg-slate-900 border border-slate-800 rounded-3xl px-6 py-10 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary-500/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Ready to Build a Better <br className="hidden md:block" />
                  <span className="text-gradient">Financial Future?</span>
                </h2>
                <p className="text-slate-400 mb-8 text-sm sm:text-base">
                  Join thousands of users building better financial habits with Saviora.
                </p>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white border-none shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 px-6 sm:px-10 py-3.5 sm:py-4 text-base font-semibold rounded-2xl transition-all duration-200"
                >
                  Start Free for 30 Days
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Button>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-4">
                  No credit card required · 30-day full access · Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
