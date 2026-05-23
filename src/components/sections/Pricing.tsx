"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with basic finance tracking.",
    features: [
      { name: "Basic tracking", included: true },
      { name: "Limited reports (1 month)", included: true },
      { name: "1 device sync", included: true },
      { name: "AI insights", included: false },
      { name: "Unlimited budgets", included: false },
      { name: "Export reports", included: false },
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    recommended: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    description: "Advanced tools and AI insights for serious wealth growth.",
    features: [
      { name: "Advanced analytics", included: true },
      { name: "Unlimited history", included: true },
      { name: "Unlimited devices", included: true },
      { name: "AI insights & alerts", included: true },
      { name: "Unlimited budgets", included: true },
      { name: "Export reports (CSV/PDF)", included: true },
    ],
    buttonText: "Start 14-Day Trial",
    buttonVariant: "default" as const,
    recommended: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/mo",
    description: "For small teams and shared household finances.",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Up to 5 team members", included: true },
      { name: "Shared household budgets", included: true },
      { name: "Custom categories", included: true },
      { name: "Priority support", included: true },
      { name: "API access", included: true },
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    recommended: false,
  }
];

export function Pricing() {
  return (
    <section className="py-24 relative" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, transparent <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Choose the plan that fits your financial journey. No hidden fees, ever.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection key={index} delay={index * 0.1} className="h-full">
              <div 
                className={`h-full rounded-3xl p-8 border ${
                  plan.recommended 
                    ? "bg-slate-900 border-slate-800 text-white shadow-2xl relative shadow-primary-500/10 dark:bg-slate-800 dark:border-primary-500/30" 
                    : "bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800"
                } flex flex-col`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-primary-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Recommended
                    </span>
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${plan.recommended ? "text-white" : "text-slate-900 dark:text-white"}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.recommended ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                  {plan.description}
                </p>
                
                <div className="mb-8">
                  <span className={`text-5xl font-extrabold ${plan.recommended ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-lg ${plan.recommended ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                
                <Button 
                  variant={plan.buttonVariant} 
                  className={`w-full mb-8 ${plan.recommended ? "bg-primary-500 hover:bg-primary-600 border-none" : ""}`}
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-4 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className={`w-5 h-5 flex-shrink-0 ${plan.recommended ? "text-primary-400" : "text-primary-500"}`} />
                      ) : (
                        <X className={`w-5 h-5 flex-shrink-0 ${plan.recommended ? "text-slate-500" : "text-slate-300 dark:text-slate-700"}`} />
                      )}
                      <span className={`${
                        !feature.included 
                          ? (plan.recommended ? "text-slate-500" : "text-slate-400 dark:text-slate-600 line-through")
                          : (plan.recommended ? "text-slate-200" : "text-slate-700 dark:text-slate-300")
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
