"use client";

import React from "react";
import Image from "next/image";
import { 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ChevronDown, 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target, 
  BarChart3, 
  Settings 
} from "lucide-react";
import logoSaviora from "@/assets/logo/logo-saviora-web.svg";

const benefitsList = [
  "Keep all income records in one place",
  "Get a clear view of your total earnings",
  "Use income data for better budget planning",
  "Track progress toward your financial goals",
];

export function IncomeBenefits() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Saviora Add Income Modal / Mockup */}
          <div className="lg:col-span-6 w-full order-2 lg:order-1">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Soft glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-lg pointer-events-none" />

              {/* Form Window Container */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col sm:flex-row">
                
                {/* Mini Sidebar */}
                <div className="hidden sm:flex flex-col w-40 bg-slate-50/80 border-r border-slate-100 p-3 flex-shrink-0 justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 pb-2.5 mb-2 border-b border-slate-200/60">
                      <Image src={logoSaviora} alt="Saviora" className="h-5 w-auto object-contain" />
                    </div>

                    <nav className="space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] font-medium text-slate-500">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] font-semibold text-[#16a34a] bg-[#22c55e]/15">
                        <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>Income</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] font-medium text-slate-500">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>Expenses</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] font-medium text-slate-500">
                        <Wallet className="w-3.5 h-3.5" />
                        <span>Budgets</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] font-medium text-slate-500">
                        <Target className="w-3.5 h-3.5" />
                        <span>Savings Goals</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] font-medium text-slate-500">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Reports</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] font-medium text-slate-500">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Settings</span>
                      </div>
                    </nav>
                  </div>
                </div>

                {/* Add Income Form Card */}
                <div className="flex-1 p-5 sm:p-6 bg-white min-w-0">
                  <div className="mb-4">
                    <div className="text-base font-bold text-slate-900 leading-snug">Add Income</div>
                    <p className="text-xs text-slate-400">Record your income and keep your finances organized</p>
                  </div>

                  <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Amount Field */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                            $
                          </span>
                          <input
                            type="text"
                            readOnly
                            value="1,200.00"
                            className="w-full pl-6 pr-3 py-2 text-xs font-medium text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none select-none cursor-default"
                          />
                        </div>
                      </div>

                      {/* Date Field */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Date
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            readOnly
                            value="May 28, 2024"
                            className="w-full px-3 py-2 text-xs font-medium text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none select-none cursor-default"
                          />
                          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Income Source */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Income Source
                        </label>
                        <div className="relative">
                          <div className="w-full px-3 py-2 text-xs font-medium text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg flex items-center justify-between select-none cursor-default">
                            <span>Freelance Project</span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Category
                        </label>
                        <div className="relative">
                          <div className="w-full px-3 py-2 text-xs font-medium text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg flex items-center justify-between select-none cursor-default">
                            <span>Freelance</span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes Field */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Notes (Optional)
                      </label>
                      <textarea
                        readOnly
                        rows={2}
                        value="Website development payment"
                        className="w-full px-3 py-1.5 text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none resize-none select-none cursor-default"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-1.5">
                      <button
                        type="button"
                        className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
                      >
                        Save Income
                      </button>
                      <button
                        type="button"
                        className="bg-white border border-slate-200 text-slate-600 text-xs font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Benefits Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
              <span>A CLEARER FINANCIAL PICTURE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
              Understand Where Your Money Comes From
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Tracking your income is the first step toward better financial decisions. Saviora helps you keep your earnings organized, so you can plan your budget, manage expenses, and work toward your savings goals with confidence.
            </p>

            <ul className="space-y-3.5">
              {benefitsList.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                  <span className="text-base font-medium text-slate-700">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
