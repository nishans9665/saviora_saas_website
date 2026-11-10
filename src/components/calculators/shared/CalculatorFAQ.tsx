"use client";

import React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorFAQProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  items?: FAQItem[];
}

export function CalculatorFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Common questions about calculations, statutory regulations, and deductions.",
  faqs,
  items,
}: CalculatorFAQProps) {
  const activeFaqs = faqs || items || [];
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-white" id="faq">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E104E] tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">{subtitle}</p>
        </div>

        <div className="space-y-3">
          {activeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "border-emerald-200 bg-emerald-50/20 shadow-2xs"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200",
                      isOpen && "transform rotate-180 text-emerald-600"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
