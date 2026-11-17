"use client";

import React from "react";
import {
  SupportedCurrency,
  ALL_CURRENCY_CODES,
  SUPPORTED_CURRENCIES,
} from "@/lib/investment-calculators/currencies";
import { Coins } from "lucide-react";

interface InvestmentCurrencySelectorProps {
  value: SupportedCurrency;
  onChange: (c: SupportedCurrency) => void;
  className?: string;
}

export function InvestmentCurrencySelector({
  value,
  onChange,
  className = "",
}: InvestmentCurrencySelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="currency-select" className="text-xs font-semibold text-slate-600 flex items-center gap-1">
        <Coins className="w-3.5 h-3.5 text-emerald-600" />
        <span>Currency:</span>
      </label>
      <select
        id="currency-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SupportedCurrency)}
        aria-label="Select currency"
        className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
      >
        {ALL_CURRENCY_CODES.map((code) => {
          const cfg = SUPPORTED_CURRENCIES[code];
          return (
            <option key={code} value={code}>
              {cfg.symbol} – {cfg.name} ({code})
            </option>
          );
        })}
      </select>
    </div>
  );
}
