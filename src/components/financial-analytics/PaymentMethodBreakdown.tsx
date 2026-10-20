"use client";

import React from "react";
import { Sparkles, CreditCard, Landmark, Wallet, Layers, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const paymentMethods = [
  {
    name: "Credit Card",
    amount: "$2,635.00",
    percentage: "62.0%",
    count: "48 transactions",
    icon: CreditCard,
    color: "bg-blue-600",
    barHeight: "85%",
  },
  {
    name: "Bank Transfer",
    amount: "$1,360.00",
    percentage: "32.0%",
    count: "4 transactions",
    icon: Landmark,
    color: "bg-purple-500",
    barHeight: "44%",
  },
  {
    name: "Cash",
    amount: "$255.00",
    percentage: "6.0%",
    count: "27 transactions",
    icon: Wallet,
    color: "bg-emerald-500",
    barHeight: "15%",
  },
];

export function PaymentMethodBreakdown() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative overflow-hidden" id="payment-methods">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>PAYMENT BREAKDOWN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Understand How You Pay
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore recorded expenses by payment method to see how your transactions are distributed across the payment options you use.
          </p>
        </AnimatedSection>

        {/* 2-Column Section: Chart on Left, Detail Cards on Right */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Chart Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-lg shadow-slate-900/5">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Spending by Payment Method
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Reporting: Oct 1 - Oct 20</span>
            </div>

            {/* Vertical Bar Chart visualization */}
            <div className="h-64 flex items-end justify-around gap-6 pt-6 pb-2 px-4 border-b border-slate-100">
              {paymentMethods.map((method, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <span className="text-[11px] font-bold text-slate-900 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {method.amount}
                  </span>
                  <div className="w-full max-w-[70px] bg-slate-100 rounded-t-xl flex items-end overflow-hidden h-44">
                    <div
                      className={`w-full rounded-t-xl ${method.color} transition-all duration-700 group-hover:brightness-110`}
                      style={{ height: method.barHeight }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 mt-3 text-center truncate w-full">
                    {method.name}
                  </span>
                  <span className="text-[10px] text-slate-400">{method.percentage}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Primary payment driver: Credit Card (62%)</span>
              <span className="font-bold text-slate-800">Total: $4,250.00</span>
            </div>
          </div>

          {/* Right Detail Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                <h4 className="text-sm font-bold text-slate-900">Payment Channel Allocation</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review which payment methods handle the bulk of your expenditure to optimize rewards, reduce transfer fees, and balance your debit and credit accounts.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">Categorized Records</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every transaction logged in Saviora captures the associated payment method, ensuring smooth auditing during monthly budget reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
