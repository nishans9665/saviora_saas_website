"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, Users, Calendar } from "lucide-react";

interface LeadDayData {
  date: string;
  count: number;
}

interface StatusDistributionItem {
  name: string;
  value: number;
  color: string;
}

interface DashboardAnalyticsChartsProps {
  last7Days: LeadDayData[];
  last30Days: LeadDayData[];
  last90Days: LeadDayData[];
  statusDistribution: StatusDistributionItem[];
}

export function DashboardAnalyticsCharts({
  last7Days,
  last30Days,
  last90Days,
  statusDistribution,
}: DashboardAnalyticsChartsProps) {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

  const activeData =
    range === "7d" ? last7Days : range === "30d" ? last30Days : last90Days;

  const totalLeadsInRange = activeData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lead Inflow Chart (2 Cols) */}
      <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Contact Lead Inflow & Submissions</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {totalLeadsInRange} total inquiries received in the selected time range
            </p>
          </div>

          {/* Time range selector pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setRange("7d")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                range === "7d"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setRange("30d")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                range === "30d"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setRange("90d")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                range === "90d"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="leadAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803D" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#15803D" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#E2E8F0" }}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E2E8F0",
                  borderRadius: "12px",
                  color: "#0F172A",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ fontWeight: 600, color: "#15803D" }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Leads"
                stroke="#15803D"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#leadAreaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Breakdown Donut Chart (1 Col) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">Leads by Status</h2>
          </div>
          <p className="text-xs text-slate-500">Pipeline distribution across leads</p>
        </div>

        <div className="h-56 w-full my-auto flex items-center justify-center">
          {statusDistribution.some((s) => s.value > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E2E8F0",
                    borderRadius: "10px",
                    color: "#0F172A",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-xs text-slate-400 italic text-center">
              No lead distribution data available.
            </div>
          )}
        </div>

        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
          {statusDistribution.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 font-medium">{item.name}:</span>
              <span className="font-bold text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
