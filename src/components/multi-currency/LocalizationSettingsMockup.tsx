"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Globe,
  Coins,
  Languages,
  Clock,
  Calendar,
  Save,
  Check,
  ChevronDown,
  ChevronRight,
  Sliders,
  LayoutDashboard,
  Wallet,
  Receipt,
  CreditCard,
  BarChart3,
  Target,
  Sparkles,
  Moon,
  LogOut,
  PanelLeftClose,
  User,
  Bell,
  Tag,
  Shield,
  Layers,
} from "lucide-react";
import logoIcon from "@/assets/logo/icon.svg";

const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$", label: "USD ($) - US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR (€) - Euro" },
  { code: "GBP", symbol: "£", label: "GBP (£) - British Pound" },
  { code: "CAD", symbol: "C$", label: "CAD (C$) - Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "AUD (A$) - Australian Dollar" },
  { code: "JPY", symbol: "¥", label: "JPY (¥) - Japanese Yen" },
];

export function LocalizationSettingsMockup() {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  const handleSave = () => {
    setSaveStatus("saved");
    setTimeout(() => {
      setSaveStatus("idle");
    }, 2200);
  };

  return (
    <div className="w-full bg-[#f8fafc] rounded-b-2xl sm:rounded-b-3xl overflow-hidden select-none text-slate-800">
      
      {/* App Workspace Frame */}
      <div className="flex min-h-[460px] bg-[#f8fafc] border-t border-slate-100">
        
        {/* Closed / Collapsed Mini Sidebar (Icon-only close-type menu matching Saviora product UI) */}
        <div className="w-12 sm:w-14 bg-white border-r border-slate-200/80 py-4 flex flex-col items-center justify-between flex-shrink-0">
          
          {/* Top: Logo & Nav Icons */}
          <div className="flex flex-col items-center gap-3 w-full">
            
            {/* Saviora Leaf Mark */}
            <div className="w-7 h-7 flex items-center justify-center mb-1">
              <Image
                src={logoIcon}
                alt="Saviora"
                className="w-5 h-5 object-contain"
                priority
              />
            </div>

            {/* Sidebar Collapse Toggle Button */}
            <div className="w-7 h-7 rounded-lg border border-slate-200/70 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer mb-2 transition-colors">
              <PanelLeftClose className="w-3.5 h-3.5" />
            </div>

            {/* Navigation Icons (Clean, closed-type menu) */}
            <div className="flex flex-col items-center gap-2.5 w-full">
              <div className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors" title="Dashboard">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              
              <div className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors" title="Income">
                <Wallet className="w-4 h-4" />
              </div>

              <div className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors" title="Expenses">
                <CreditCard className="w-4 h-4" />
              </div>

              <div className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors" title="Analytics">
                <BarChart3 className="w-4 h-4" />
              </div>

              <div className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors" title="Budgets">
                <Clock className="w-4 h-4" />
              </div>

              <div className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors" title="Savings Goals">
                <Target className="w-4 h-4" />
              </div>

              {/* Active Settings Pill */}
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center shadow-2xs" title="Settings (Active)">
                <Sliders className="w-4 h-4 text-[#16a34a]" />
              </div>
            </div>
          </div>

          {/* Bottom Icons: AI Assistant, Dark Mode & Logout */}
          <div className="flex flex-col items-center gap-2.5 w-full pt-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 border border-blue-100/80 flex items-center justify-center cursor-pointer hover:bg-blue-100/70 transition-colors" title="AI Assistant">
              <Sparkles className="w-4 h-4" />
            </div>
            
            <div className="w-7 h-7 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer transition-colors" title="Dark Mode Toggle">
              <Moon className="w-3.5 h-3.5" />
            </div>

            <div className="w-7 h-7 text-rose-500 hover:text-rose-600 flex items-center justify-center cursor-pointer transition-colors" title="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Main Settings Panel Area: Spacious, Simple Layout */}
        <div className="flex-1 p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-x-auto">
          
          <div>
            {/* Header: Account Settings */}
            <div className="mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Account Settings
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage your profile, preferences, and security settings
              </p>
            </div>

            {/* Layout: Sub-Tabs Menu + Clean Form Card */}
            <div className="flex flex-col md:flex-row gap-5 items-start">
              
              {/* Settings Submenu Tabs */}
              <div className="w-full md:w-44 lg:w-48 flex-shrink-0 space-y-1 text-xs">
                
                <div className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-white font-medium flex items-center gap-2.5 transition-colors cursor-pointer">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Overview</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-white font-medium flex items-center justify-between transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profile</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
                
                {/* Active Localization Submenu Tab */}
                <div className="px-3.5 py-2 rounded-xl bg-[#16a34a] text-white font-bold flex items-center justify-between shadow-xs cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-3.5 h-3.5 text-white" />
                    <span>Localization</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-100" />
                </div>

                <div className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-white font-medium flex items-center gap-2.5 transition-colors cursor-pointer">
                  <Bell className="w-3.5 h-3.5 text-slate-400" />
                  <span>Notifications Settings</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-white font-medium flex items-center gap-2.5 transition-colors cursor-pointer">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Custom Categories</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-white font-medium flex items-center gap-2.5 transition-colors cursor-pointer">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Password</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-white font-medium flex items-center gap-2.5 transition-colors cursor-pointer">
                  <Receipt className="w-3.5 h-3.5 text-slate-400" />
                  <span>Billing & Subscription</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-white font-medium flex items-center gap-2.5 transition-colors cursor-pointer">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  <span>Payment Methods</span>
                </div>

              </div>

              {/* Localization Form Card (Spacious, Clean, Simple Layout) */}
              <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs relative">
                
                {/* 2-Column Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
                  
                  {/* Field: Country */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#16a34a]" />
                      <span>Country</span>
                    </label>
                    <div className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between cursor-default shadow-2xs hover:border-slate-300 transition-colors">
                      <span>Search country...</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                    </div>
                  </div>

                  {/* Field: Main Currency (Interactive) */}
                  <div className="relative">
                    <label className="text-xs font-semibold text-slate-800 flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-[#16a34a]" />
                        <span>Main Currency</span>
                      </span>
                    </label>
                    
                    <button
                      type="button"
                      onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                      className="w-full px-3.5 py-2.5 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-slate-900 flex items-center justify-between transition-colors shadow-2xs cursor-pointer"
                    >
                      <span className="truncate">{selectedCurrency.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#16a34a] flex-shrink-0 ml-1 transition-transform ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Currency Options Dropdown */}
                    {isCurrencyDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-emerald-200 rounded-xl shadow-xl z-30 py-1 max-h-48 overflow-y-auto">
                        {CURRENCY_OPTIONS.map((curr) => (
                          <button
                            key={curr.code}
                            type="button"
                            onClick={() => {
                              setSelectedCurrency(curr);
                              setIsCurrencyDropdownOpen(false);
                            }}
                            className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
                              selectedCurrency.code === curr.code
                                ? "bg-emerald-50 text-[#16a34a] font-bold"
                                : "text-slate-700"
                            }`}
                          >
                            <span>{curr.label}</span>
                            {selectedCurrency.code === curr.code && (
                              <Check className="w-3.5 h-3.5 text-[#16a34a]" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Field: Language */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                      <Languages className="w-3.5 h-3.5 text-[#16a34a]" />
                      <span>Language</span>
                    </label>
                    <div className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between cursor-default shadow-2xs hover:border-slate-300 transition-colors">
                      <span>Search language...</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                    </div>
                  </div>

                  {/* Field: Timezone */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#16a34a]" />
                      <span>Timezone</span>
                    </label>
                    <div className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between cursor-default shadow-2xs hover:border-slate-300 transition-colors">
                      <span className="truncate">Asia/Colombo (GMT+05:30)</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                    </div>
                  </div>

                </div>

                {/* Sub-Section: Financial Year & Cycle */}
                <div className="pt-4 border-t border-slate-100 mb-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>Financial Year & Cycle</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        FINANCIAL YEAR
                      </span>
                      <div className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center justify-between cursor-default shadow-2xs">
                        <span>January - December</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        BUDGET CYCLE
                      </span>
                      <div className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center justify-between cursor-default shadow-2xs">
                        <span>Monthly</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Settings Button */}
                <div className="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleSave}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm cursor-pointer ${
                      saveStatus === "saved"
                        ? "bg-emerald-700 shadow-emerald-700/20"
                        : "bg-[#16a34a] hover:bg-[#15803d] shadow-emerald-600/25 active:scale-95"
                    }`}
                  >
                    {saveStatus === "saved" ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Saved Settings</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Settings</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
