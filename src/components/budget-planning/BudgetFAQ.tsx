"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { FAQItem, budgetFaqData } from "./faq-data";

export function BudgetFAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-budget-1": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const leftFaqs = budgetFaqData.slice(0, 4);
  const rightFaqs = budgetFaqData.slice(4, 8);

  const renderColumn = (items: FAQItem[]) => (
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
              className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-inset cursor-pointer"
            >
              <h3 className="font-semibold text-base sm:text-lg text-slate-900 leading-snug">
                {item.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-emerald-600" : ""
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
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Frequently Asked Questions About Monthly Budget Planning
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Need personal assistance?</span>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>

        {/* 2-Column Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          {renderColumn(leftFaqs)}
          {renderColumn(rightFaqs)}
        </div>
      </div>
    </section>
  );
}
