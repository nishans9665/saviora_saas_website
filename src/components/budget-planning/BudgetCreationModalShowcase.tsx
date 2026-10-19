"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  X,
  Calendar,
  Tag,
  DollarSign,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const capabilities = [
  "Create a new budget with a custom title.",
  "Select an existing expense category.",
  "Set a monthly spending limit.",
  "Choose the target month.",
  "Customize the budget color and icon.",
  "Add optional notes or descriptions.",
  "Enable Strict Limit when required.",
];

const presets = [
  {
    name: "Groceries",
    title: "Weekly Groceries",
    category: "Food & Groceries",
    amount: "850.00",
    month: "October 2026",
    color: "Green",
    icon: "shopping-bag",
    notes: "Includes supermarket pantry and fresh produce",
    strictLimit: false,
  },
  {
    name: "Transportation",
    title: "Car & Commute",
    category: "Transportation",
    amount: "500.00",
    month: "October 2026",
    color: "Orange",
    icon: "car",
    notes: "Fuel, highway tolls, and parking permits",
    strictLimit: true,
  },
  {
    name: "Housing",
    title: "Monthly Rent & Bills",
    category: "Housing",
    amount: "1,800.00",
    month: "October 2026",
    color: "Blue",
    icon: "home",
    notes: "Fixed apartment lease and essential utilities",
    strictLimit: true,
  },
];

export function BudgetCreationModalShowcase() {
  const [activePreset, setActivePreset] = useState(0);
  const [formData, setFormData] = useState({ ...presets[0] });
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const selectPreset = (index: number) => {
    setActivePreset(index);
    setFormData({ ...presets[index] });
    setSubmittedNotice(false);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedNotice(true);
    setTimeout(() => {
      setSubmittedNotice(false);
    }, 3500);
  };

  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative overflow-hidden" id="budget-creation">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Content & Capabilities */}
          <div className="lg:col-span-5 text-left flex flex-col items-start order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>CUSTOM BUDGET SETUP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Create a Separate Budget for Every Spending Category
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              Organize your finances with individual budgets for the expenses you want to manage. Select a category, define a monthly limit, and customize the budget to match your needs.
            </p>

            {/* Capabilities list */}
            <div className="space-y-3 w-full mb-8">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100/80 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    {cap}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-emerald-700/20 hover:shadow-lg hover:shadow-emerald-700/30 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <span>Create Your First Budget</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Demonstration inspired by Screenshot 1 Create New Budget Modal */}
          <div className="lg:col-span-7 w-full order-1 lg:order-2">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Preset Selector Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Interactive Preview Presets:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {presets.map((preset, index) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => selectPreset(index)}
                      className={`text-xs px-3 py-1 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                        activePreset === index
                          ? "bg-emerald-700 text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Visual Mockup matching Screenshot 1 */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 p-4 sm:p-7 text-left">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Create New Budget
                    </h3>
                    <p className="text-xs text-slate-400">
                      Set up parameters for your monthly spending category
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Modal close button preview"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  {/* Row 1: Budget Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Budget Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                        placeholder="e.g. Weekly Groceries"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white appearance-none pr-9 cursor-pointer"
                        >
                          <option value="Food & Groceries">Food &amp; Groceries</option>
                          <option value="Transportation">Transportation</option>
                          <option value="Housing">Housing</option>
                          <option value="Utilities">Utilities</option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Healthcare">Healthcare</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Monthly Limit Amount & Target Month */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Monthly Limit Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">
                          $
                        </span>
                        <input
                          type="text"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Target Month
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.month}
                          onChange={(e) =>
                            setFormData({ ...formData, month: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white pr-9"
                        />
                        <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Budget Color & Budget Icon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Budget Color
                      </label>
                      <div className="relative">
                        <select
                          value={formData.color}
                          onChange={(e) =>
                            setFormData({ ...formData, color: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white appearance-none pr-9 cursor-pointer"
                        >
                          <option value="Green">Green</option>
                          <option value="Orange">Orange</option>
                          <option value="Blue">Blue</option>
                          <option value="Purple">Purple</option>
                          <option value="Rose">Rose</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Budget Icon
                      </label>
                      <div className="relative">
                        <select
                          value={formData.icon}
                          onChange={(e) =>
                            setFormData({ ...formData, icon: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white appearance-none pr-9 cursor-pointer"
                        >
                          <option value="tag">tag</option>
                          <option value="shopping-bag">shopping-bag</option>
                          <option value="car">car</option>
                          <option value="home">home</option>
                          <option value="utensils">utensils</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Notes / Description (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Notes / Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                      placeholder="Any specific rules or goals for this budget?"
                    />
                  </div>

                  {/* Row 5: Enable Strict Limit Checkbox Card */}
                  <div
                    onClick={() =>
                      setFormData({
                        ...formData,
                        strictLimit: !formData.strictLimit,
                      })
                    }
                    className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      id="enable-strict-limit-input"
                      checked={formData.strictLimit}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          Enable Strict Limit
                        </span>
                        {formData.strictLimit && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                        Block any new expenses from being added if they exceed this budget limit.
                      </p>
                    </div>
                  </div>

                  {/* Submission Notice for Interactive Demo */}
                  {submittedNotice && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in fade-in duration-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>
                        Illustrative demo: Budget configuration saved! Sign up to apply your budgets in your live Saviora account.
                      </span>
                    </div>
                  )}

                  {/* Action buttons matching Screenshot 1 */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => selectPreset(0)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    >
                      Save Budget (Preview)
                    </button>
                  </div>
                </form>

                <div className="mt-3 pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <Info className="w-3 h-3" />
                  <span>Visual demonstration of Saviora&apos;s budget creation modal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
