"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  ChevronDown,
  ArrowRight,
  Landmark,
  CreditCard,
  Wallet,
  FileSpreadsheet,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const sampleTransactions = [
  { date: "10/20/2026", title: "Apple Flagship Store - Hardware & Display", category: "SHOPPING", payment: "Bank Transfer", amount: "-$8,946.00", status: "Completed" },
  { date: "10/19/2026", title: "Apex Memorial Health Clinic - Annual Checkup", category: "HEALTHCARE", payment: "Bank Transfer", amount: "-$892.00", status: "Received" },
  { date: "10/18/2026", title: "Adobe Creative Cloud - Enterprise Suite", category: "SUBSCRIPTIONS", payment: "Credit Card", amount: "-$484.00", status: "Completed" },
  { date: "10/17/2026", title: "FedEx Express - Business Freight & Shipping", category: "MISCELLANEOUS", payment: "Bank Transfer", amount: "-$245.00", status: "Completed" },
  { date: "10/16/2026", title: "Pacific Gas & Electric - Commercial Utility", category: "UTILITIES", payment: "Bank Transfer", amount: "-$945.00", status: "Completed" },
  { date: "10/15/2026", title: "Equinox Fitness - Quarterly Health Membership", category: "PERSONAL CARE", payment: "Credit Card", amount: "-$515.00", status: "Completed" },
  { date: "10/14/2026", title: "Spotify Family - Annual Premium Streaming", category: "SUBSCRIPTIONS", payment: "Credit Card", amount: "-$85.00", status: "Completed" },
  { date: "10/12/2026", title: "IKEA Workspace - Ergonomic Office Setup", category: "SHOPPING", payment: "Bank Transfer", amount: "-$589.00", status: "Completed" },
  { date: "10/10/2026", title: "Stanford Online - Data Analysis Certification", category: "EDUCATION", payment: "Bank Transfer", amount: "-$884.00", status: "Completed" },
  { date: "10/08/2026", title: "Sallie Mae Education - Monthly Loan Payment", category: "DEBT & LOANS", payment: "Bank Transfer", amount: "-$845.00", status: "Completed" },
  { date: "10/05/2026", title: "National Association - Annual Professional Dues", category: "MISCELLANEOUS", payment: "Bank Transfer", amount: "-$741.00", status: "Completed" },
  { date: "10/02/2026", title: "Namecheap Cloud - Annual Hosting & Domains", category: "BUSINESS", payment: "Cash", amount: "-$84.00", status: "Completed" },
];

export function DetailedExpenseReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPayment, setSelectedPayment] = useState("All Payments");

  const filtered = sampleTransactions.filter((tx) => {
    const matchesSearch =
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.payment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      tx.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPayment =
      selectedPayment === "All Payments" ||
      tx.payment.toLowerCase() === selectedPayment.toLowerCase();
    return matchesSearch && matchesCategory && matchesPayment;
  });

  const handleExportCSV = () => {
    const headers = ["Date", "Title", "Category", "Payment Method", "Amount", "Status"];
    const rows = filtered.map((tx) => [
      tx.date,
      `"${tx.title.replace(/"/g, '""')}"`,
      tx.category,
      `"${tx.payment}"`,
      `"${tx.amount}"`,
      tx.status,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `saviora-expense-report-oct-2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPaymentIcon = (payment: string) => {
    if (payment === "Credit Card") return <CreditCard className="w-3.5 h-3.5 text-purple-500" />;
    if (payment === "Cash") return <Wallet className="w-3.5 h-3.5 text-emerald-500" />;
    return <Landmark className="w-3.5 h-3.5 text-blue-500" />;
  };

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="detailed-reports">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>EXPLORE THE DETAILS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Get More Detail from Your Expense Reports
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Move beyond the overview and examine individual expense records. Use the available search and filters to find transactions and review the details behind your spending totals.
          </p>
        </div>

        {/* Detailed Expense Report Table (Matches Screenshot 1) */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-5 sm:p-8 mb-10 overflow-hidden">
          {/* Top Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Detailed Expense Report</h3>
                <p className="text-xs text-slate-400">Searchable ledger of recorded outflows</p>
              </div>
            </div>

            {/* Search & Filter Inputs */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative min-w-[180px] sm:min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="SHOPPING">Shopping</option>
                  <option value="HEALTHCARE">Healthcare</option>
                  <option value="SUBSCRIPTIONS">Subscriptions</option>
                  <option value="UTILITIES">Utilities</option>
                  <option value="PERSONAL CARE">Personal Care</option>
                  <option value="EDUCATION">Education</option>
                  <option value="DEBT & LOANS">Debt & Loans</option>
                  <option value="BUSINESS">Business</option>
                  <option value="MISCELLANEOUS">Miscellaneous</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Payments Dropdown */}
              <div className="relative">
                <select
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="All Payments">All Payments</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Export Button */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                title="Download CSV of current records"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Title</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3 text-right">Amount</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900 whitespace-nowrap">{tx.title}</td>
                    <td className="py-3.5 px-3">
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md whitespace-nowrap">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        {getPaymentIcon(tx.payment)}
                        <span>{tx.payment}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-extrabold text-[#ef4444] whitespace-nowrap">
                      {tx.amount}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          tx.status === "Completed"
                            ? "bg-emerald-50 text-[#16a34a] border border-emerald-200/60"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filtered.length} of {sampleTransactions.length} sample entries</span>
            {/* <span>Illustrative product demonstration</span> */}
          </div>
        </div>

        {/* 6 Supported Controls Summary & CTA */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Search Transactions</h4>
            <p className="text-xs text-slate-600">Instantly locate entries by payee, note, or transaction title.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Filter by Category</h4>
            <p className="text-xs text-slate-600">Isolate specific areas like Utilities, Shopping, or Subscriptions.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Payment Method Filtering</h4>
            <p className="text-xs text-slate-600">Review expenses tied directly to Bank Transfer or other channels.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Transaction Details</h4>
            <p className="text-xs text-slate-600">Inspect exact date stamps, amounts, categories, and status tags.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Select Reporting Period</h4>
            <p className="text-xs text-slate-600">Define custom start and end date ranges for precise accounting.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Export Reports</h4>
            <p className="text-xs text-slate-600">Download report files for tax records and spreadsheet analysis.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-8 py-3.5 shadow-md shadow-[#22c55e]/25 hover:shadow-lg hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
          >
            <Link href="https://cloud.saviora.app/register" target="_blank" className="inline-flex items-center">
              <span>Explore Saviora</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
