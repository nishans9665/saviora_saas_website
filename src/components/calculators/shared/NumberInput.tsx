"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NumberInputProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  error?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  prefix = "Rs.",
  suffix,
  hint,
  placeholder = "0",
  min = 0,
  max,
  className,
  error,
}: NumberInputProps) {
  const displayVal = value !== 0 && value !== "" && value !== undefined ? String(value) : "";
  const [localVal, setLocalVal] = React.useState<string | null>(null);

  const currentVal = localVal !== null ? localVal : displayVal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || /^[0-9,]*\.?[0-9]*$/.test(raw)) {
      setLocalVal(raw);
      const clean = raw.replace(/,/g, "");
      const num = parseFloat(clean);
      if (!isNaN(num) && isFinite(num)) {
        onChange(Math.max(min, max !== undefined ? Math.min(max, num) : num));
      } else {
        onChange(0);
      }
    }
  };

  const handleBlur = () => {
    setLocalVal(null);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-semibold text-slate-800">
          {label}
        </label>
        {hint && (
          <span className="text-[11px] text-slate-400 font-normal">
            {hint}
          </span>
        )}
      </div>

      <div className="relative rounded-xl shadow-2xs border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs sm:text-sm font-medium">
            {prefix}
          </div>
        )}

        <input
          type="text"
          inputMode="decimal"
          value={currentVal}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-900 bg-transparent placeholder-slate-300 focus:outline-none rounded-xl",
            prefix ? "pl-11 sm:pl-12" : "pl-3.5",
            suffix ? "pr-12" : "pr-3.5"
          )}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs sm:text-sm font-medium">
            {suffix}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
