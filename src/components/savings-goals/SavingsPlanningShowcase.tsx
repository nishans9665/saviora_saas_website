"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  X,
  ArrowRight,
  ChevronDown,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const categories = [
  "Emergency Fund",
  "Car Purchase",
  "Vacation",
  "Education",
  "House",
  "Wedding",
  "Electronics",
  "Investment",
  "Business",
  "Other",
];

const checklistItems = [
  "Give each goal a clear name and target amount.",
  "Organize goals using the available categories.",
  "Add an optional monthly target.",
  "Set an optional target deadline.",
  "Choose a priority level.",
  "Add notes to explain the purpose of a goal.",
];

export function SavingsPlanningShowcase() {
  const [goalTitle, setGoalTitle] = useState("New Car");
  const [selectedCategory, setSelectedCategory] = useState("Car Purchase");
  const [targetAmount, setTargetAmount] = useState("25000.00");
  const [monthlyTarget, setMonthlyTarget] = useState("500.00");
  const [deadline, setDeadline] = useState("2027-12-31");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("Down payment for family vehicle");
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
    }, 3500);
  };

  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative overflow-hidden" id="savings-plan">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Form Modal Demonstration (Matches Screenshot 2) */}
          <div className="lg:col-span-6 w-full order-2 lg:order-1">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-teal-500/10 rounded-3xl blur-lg pointer-events-none" />

              {/* Modal Container */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/5">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Create New Goal
                  </h3>
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="Close modal preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  {/* Row 1: Goal Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="goal-title-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Goal Title
                      </label>
                      <input
                        id="goal-title-input"
                        type="text"
                        value={goalTitle}
                        onChange={(e) => setGoalTitle(e.target.value)}
                        placeholder="e.g. New Car"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="goal-category-select" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          id="goal-category-select"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-8 cursor-pointer"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Target Amount & Monthly Target (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="target-amount-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Target Amount
                      </label>
                      <input
                        id="target-amount-input"
                        type="text"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="monthly-target-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Monthly Target (Optional)
                      </label>
                      <input
                        id="monthly-target-input"
                        type="text"
                        value={monthlyTarget}
                        onChange={(e) => setMonthlyTarget(e.target.value)}
                        placeholder="0.00"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Target Deadline & Priority */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="target-deadline-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Target Deadline (Optional)
                      </label>
                      <div className="relative">
                        <input
                          id="target-deadline-input"
                          type="text"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                          placeholder="Select date"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-8"
                        />
                        <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="priority-select" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Priority
                      </label>
                      <div className="relative">
                        <select
                          id="priority-select"
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-8 cursor-pointer"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Description / Notes */}
                  <div>
                    <label htmlFor="goal-notes-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Description / Notes
                    </label>
                    <input
                      id="goal-notes-input"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any notes about this goal ..."
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all cursor-pointer"
                    >
                      Save Goal
                    </button>
                  </div>
                </form>

                {/* Demonstration Notice */}
                {submittedMessage && (
                  <div className="mt-3 p-2.5 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-800 text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Visual demonstration only. No real data or financial goal created.</span>
                  </div>
                )}

                <div className="mt-3 text-[11px] text-slate-400 text-center">
                  Visual product demonstration — forms do not connect to production accounts
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Explanatory Content & Checklist */}
          <div className="lg:col-span-6 text-left flex flex-col items-start order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
              <span>SIMPLE SAVINGS PLANNING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Create a Savings Plan That Fits Your Goals
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Whether you&apos;re building an emergency fund, saving for a car, planning a vacation, or working toward another financial goal, Saviora helps you organize the details in one place.
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 w-full mb-8">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-[#22c55e]/25 hover:shadow-lg hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
            >
              <Link href="https://cloud.saviora.app/register" target="_blank" className="flex items-center">
                <span>Explore Savings Goals</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
