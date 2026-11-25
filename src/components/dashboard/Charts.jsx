"use client";


import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/format";

export const CHART_COLORS = {
  primary: "#0b9a7e",
  accent: "#f5a524",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  red: "#ef4444",
};

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.accent, CHART_COLORS.blue, CHART_COLORS.purple, CHART_COLORS.red];

const tooltipStyle = {
  background: "var(--color-base-100)",
  border: "1px solid var(--color-base-300)",
  borderRadius: 12,
  color: "var(--color-base-content)",
};

const axisTick = { fill: "currentColor", fontSize: 12, opacity: 0.7 };


export function ChartCard({ title, subtitle, children, isEmpty }) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
      <div className="mt-4 h-72 w-full text-base-content">
        {isEmpty ? (
          <div className="flex h-full items-center justify-center text-base-content/60">No data to show yet.</div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}


export function SimpleBarChart({ data, xKey, yKey, color = CHART_COLORS.primary, money = false, label }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.12} vertical={false} />
        <XAxis dataKey={xKey} tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
          formatter={(value) => [money ? formatCurrency(value) : value, label || yKey]}
        />
        <Bar dataKey={yKey} fill={color} radius={[8, 8, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}


export function SimpleAreaChart({ data, xKey, yKey, color = CHART_COLORS.accent, money = false, label }) {
  const gradientId = `gradient-${yKey}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.45} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.12} vertical={false} />
        <XAxis dataKey={xKey} tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [money ? formatCurrency(value) : value, label || yKey]} />
        <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={3} fill={`url(#${gradientId})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}


export function SimplePieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={3}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
