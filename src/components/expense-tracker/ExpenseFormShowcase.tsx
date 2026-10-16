"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  X, 
  FileText, 
  DollarSign, 
  Tag, 
  Info, 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  ChevronDown
} from "lucide-react";

const benefitsList = [
  "Record an expense title and amount.",
  "Choose a category.",
  "Select a payment method.",
  "Set the expense date and status.",
  "Add tags and optional notes.",
  "Mark recurring expenses when appropriate.",
];

const demoPresets = [
  {
    name: "Starbucks Coffee",
    title: "Starbucks Morning Latte",
    amount: "6.50",
    category: "Food & Groceries",
    paymentMethod: "Cash",
    date: "October 16, 2026",
    status: "Completed",
    tags: "coffee, morning, starbucks",
    notes: "Meeting coffee with design team",
    isRecurring: false,
  },
  {
    name: "Monthly Cloud Server",
    title: "Cloud Infrastructure Hosting",
    amount: "149.00",
    category: "Utilities",
    paymentMethod: "Credit Card",
    date: "October 16, 2026",
    status: "Completed",
    tags: "hosting, server, monthly",
    notes: "Production cluster monthly subscription",
    isRecurring: true,
  },
  {
    name: "Supermarket Groceries",
    title: "Weekly Organic Groceries",
    amount: "128.40",
    category: "Food & Groceries",
    paymentMethod: "Debit Card",
    date: "October 16, 2026",
    status: "Completed",
    tags: "groceries, organic, pantry",
    notes: "Weekly pantry restock",
    isRecurring: false,
  },
];

export function ExpenseFormShowcase() {
  const [formData, setFormData] = useState({
    title: "Starbucks Coffee",
    amount: "6.50",
    category: "Food & Groceries",
    paymentMethod: "Cash",
    date: "October 16, 2026",
    status: "Completed",
    tags: "food, starbucks, coffee",
    notes: "",
    isRecurring: false,
  });

  const [submittedMessage, setSubmittedMessage] = useState(false);

  const applyPreset = (preset: typeof demoPresets[0]) => {
    setFormData({
      title: preset.title,
      amount: preset.amount,
      category: preset.category,
      paymentMethod: preset.paymentMethod,
      date: preset.date,
      status: preset.status,
      tags: preset.tags,
      notes: preset.notes,
      isRecurring: preset.isRecurring,
    });
    setSubmittedMessage(false);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
    }, 3500);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      amount: "0.00",
      category: "Food & Groceries",
      paymentMethod: "Cash",
      date: "October 16, 2026",
      status: "Completed",
      tags: "",
      notes: "",
      isRecurring: false,
    });
    setSubmittedMessage(false);
  };

  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative overflow-hidden" id="add-expense-showcase">
      {/* Subtle ambient light aura */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Saviora Add New Expense Modal (Reference 1) */}
          <div className="lg:col-span-6 w-full order-2 lg:order-1">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Soft glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#ea580c]/10 via-amber-500/10 to-teal-400/10 rounded-3xl blur-lg pointer-events-none" />

              {/* Modal Container (Faithful to Reference 1) */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/10 p-5 sm:p-7 text-left transition-all">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Add New Expense
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                    aria-label="Close modal or reset form"
                    title="Reset demo form"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Interactive Demo Presets Pill Bar */}
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 text-xs no-scrollbar">
                  <span className="text-[11px] font-semibold text-slate-400 flex-shrink-0">Demo presets:</span>
                  {demoPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer flex-shrink-0 ${
                        formData.title === preset.title
                          ? "bg-[#ea580c]/10 border-[#ea580c]/30 text-[#ea580c] font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>

                {/* Form Fields Grid */}
                <form onSubmit={handleDemoSubmit} className="space-y-3.5">
                  
                  {/* Expense Title */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#ea580c]" />
                      <span>Expense Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Starbuck Coffee"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#ea580c] transition-colors shadow-2xs"
                    />
                  </div>

                  {/* Amount & Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Amount */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span>Amount</span>
                      </label>
                      <input
                        type="text"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#ea580c] transition-colors shadow-2xs"
                      />
                    </div>

                    {/* Category with + Custom Category */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Tag className="w-3.5 h-3.5 text-[#ea580c]" />
                          <span>Category</span>
                          <Info className="w-3 h-3 text-slate-400" />
                        </label>
                        <span className="text-[11px] font-bold text-[#ea580c] hover:text-[#c2410c] cursor-pointer">
                          + Custom Category
                        </span>
                      </div>
                      <div className="relative">
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full appearance-none px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#ea580c] transition-colors cursor-pointer shadow-2xs pr-8"
                          aria-label="Select expense category"
                        >
                          <option>Food & Groceries</option>
                          <option>Utilities</option>
                          <option>Shopping</option>
                          <option>Personal Care</option>
                          <option>Debt & Loans</option>
                          <option>Entertainment</option>
                          <option>Transportation</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                  </div>

                  {/* Payment Method & Date Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Payment Method */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span>Payment Method</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.paymentMethod}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-full appearance-none px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#ea580c] transition-colors cursor-pointer shadow-2xs pr-8"
                          aria-label="Select payment method"
                        >
                          <option>Cash</option>
                          <option>Credit Card</option>
                          <option>Debit Card</option>
                          <option>Bank Transfer</option>
                          <option>PayPal</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span>Date</span>
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#ea580c] transition-colors shadow-2xs"
                      />
                    </div>

                  </div>

                  {/* Status & Tags Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Status */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span>Status</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full appearance-none px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#ea580c] transition-colors cursor-pointer shadow-2xs pr-8"
                          aria-label="Select expense status"
                        >
                          <option>Completed</option>
                          <option>Pending</option>
                          <option>Scheduled</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span>Tags</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. food, starbucks, coffee"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#ea580c] transition-colors shadow-2xs"
                      />
                    </div>

                  </div>

                  {/* Description / Notes (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Description / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Add any additional notes here..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#ea580c] transition-colors resize-none shadow-2xs"
                    />
                  </div>

                  {/* Recurring Expense Checkbox Card (Reference 1) */}
                  <div 
                    onClick={() => setFormData({ ...formData, isRecurring: !formData.isRecurring })}
                    className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3 cursor-pointer hover:bg-amber-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id="recurring-expense-toggle"
                      checked={formData.isRecurring}
                      onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                      className="mt-0.5 rounded border-amber-300 text-[#ea580c] focus:ring-[#ea580c] h-4 w-4 cursor-pointer"
                    />
                    <div>
                      <label htmlFor="recurring-expense-toggle" className="text-xs font-bold text-amber-900 block leading-tight cursor-pointer">
                        Recurring Expense
                      </label>
                      <p className="text-[11px] text-amber-700 font-medium">
                        Mark this as a subscription or repeating monthly cost
                      </p>
                    </div>
                  </div>

                  {/* Feedback on Demo Submit */}
                  {submittedMessage && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Interactive preview only. No data was altered.</span>
                    </div>
                  )}

                  {/* Footer Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#ea580c] hover:bg-[#c2410c] rounded-xl shadow-sm shadow-[#ea580c]/25 hover:shadow-[#ea580c]/35 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                      <span>Add Expense</span>
                    </button>
                  </div>

                </form>

                <p className="text-[10px] text-slate-400 text-center mt-3 pt-2 border-t border-slate-100">
                  Interactive preview reproducing Saviora&apos;s real Add Expense form.
                </p>

              </div>
            </div>
          </div>

          {/* Right Column: Marketing Content & Benefit List */}
          <div className="lg:col-span-6 text-left flex flex-col items-start order-1 lg:order-2">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/25 text-[#ea580c] text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
              <span>SIMPLE EXPENSE ENTRY</span>
            </div>

            {/* H2 Headline */}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Record Your Expenses with the Details That Matter
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Keep your expense records organized with a clear entry form. Add the information you need, choose a category and payment method, and maintain a useful record of your spending.
            </p>

            {/* Benefits Checkmark List */}
            <div className="space-y-3.5 w-full">
              {benefitsList.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ea580c]/15 border border-[#ea580c]/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c]" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
