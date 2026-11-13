"use client";

import React from "react";
import {
  ALL_CURRENCY_CODES,
  SUPPORTED_CURRENCIES,
  SupportedCurrency,
} from "@/lib/loan-calculators/currencies";
import { Coins } from "lucide-react";

interface CurrencySelectorProps {
  selectedCurrency: SupportedCurrency;
  onSelectCurrency: (currency: SupportedCurrency) => void;
  className?: string;
}

export function CurrencySelector({
  selectedCurrency,
  onSelectCurrency,
  className = "",
}: CurrencySelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="loan-currency-select" className="text-xs font-medium text-gray-700 flex items-center gap-1 whitespace-nowrap">
        <Coins className="w-3.5 h-3.5 text-emerald-600" />
        <span>Currency:</span>
      </label>
      <select
        id="loan-currency-select"
        value={selectedCurrency}
        onChange={(e) => onSelectCurrency(e.target.value as SupportedCurrency)}
        className="text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer hover:border-gray-300 transition"
      >
        {ALL_CURRENCY_CODES.map((code) => {
          const cfg = SUPPORTED_CURRENCIES[code];
          return (
            <option key={code} value={code}>
              {cfg.code} ({cfg.symbol.trim()}) – {cfg.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
