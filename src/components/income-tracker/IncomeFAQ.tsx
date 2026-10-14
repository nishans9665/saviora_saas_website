"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const leftFaqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is an income tracker?",
    answer:
      "An income tracker is a tool for recording and reviewing money you receive. It helps you keep income records organized and understand your earnings over time.",
  },
  {
    id: "faq-2",
    question: "How can I track my income with Saviora?",
    answer:
      "Use Saviora to record income entries, organize them using the available categories, and review your income history and financial summaries.",
  },
  {
    id: "faq-3",
    question: "Can I track income from different sources?",
    answer:
      "Saviora's income tracking feature helps you organize income from different sources. Record each income entry using the details supported by the application.",
  },
];

const rightFaqs: FAQItem[] = [
  {
    id: "faq-4",
    question: "Why should I track my income and expenses together?",
    answer:
      "Tracking both helps you compare the money coming in with the money going out. This provides a clearer foundation for planning budgets and setting savings goals.",
  },
  {
    id: "faq-5",
    question: "Can income tracking help me plan a budget?",
    answer:
      "Keeping accurate income records can help you understand the money available for planned expenses and savings. Saviora's budget planning features can support this process.",
  },
  {
    id: "faq-6",
    question: "Is my income data secure?",
    answer: (
      <span>
        Saviora uses industry-standard encryption and secure cloud infrastructure to protect your personal financial records. Your data remains private and confidential. Please refer to our official{" "}
        <Link href="/privacy-policy" className="text-[#16a34a] underline hover:text-[#15803d] font-medium">
          Privacy Policy
        </Link>{" "}
        for more information on our data protection practices.
      </span>
    ),
  },
];

export function IncomeFAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-1": false,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderFaqColumn = (items: FAQItem[]) => (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = !!openItems[item.id];
        return (
          <div
            key={item.id}
            className="border border-slate-200/90 rounded-2xl bg-white overflow-hidden transition-shadow duration-200 hover:shadow-xs"
          >
            <button
              type="button"
              id={`button-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              onClick={() => toggleItem(item.id)}
              className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-inset cursor-pointer"
            >
              <h3 className="font-semibold text-base sm:text-lg text-slate-900 leading-snug">
                {item.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#22c55e]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div
                id={`panel-${item.id}`}
                role="region"
                aria-labelledby={`button-${item.id}`}
                className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="py-20 sm:py-24 bg-white relative" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Header with Contact Support button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Income Tracking FAQs
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Still have questions?</span>
            <Button asChild variant="outline" size="sm" className="rounded-full border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50">
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        {/* 2-Column Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          {renderFaqColumn(leftFaqs)}
          {renderFaqColumn(rightFaqs)}
        </div>

      </div>
    </section>
  );
}
