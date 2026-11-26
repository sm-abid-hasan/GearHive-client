// "use client";


// import {
//   Area,
//   AreaChart,
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Legend,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { formatCurrency } from "@/lib/format";

// export const CHART_COLORS = {
//   primary: "#0b9a7e",
//   accent: "#f5a524",
//   blue: "#3b82f6",
//   purple: "#8b5cf6",
//   red: "#ef4444",
// };

// const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.accent, CHART_COLORS.blue, CHART_COLORS.purple, CHART_COLORS.red];

// const tooltipStyle = {
//   background: "var(--color-base-100)",
//   border: "1px solid var(--color-base-300)",
//   borderRadius: 12,
//   color: "var(--color-base-content)",
// };

// const axisTick = { fill: "currentColor", fontSize: 12, opacity: 0.7 };


// export function ChartCard({ title, subtitle, children, isEmpty }) {
//   return (
//     <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
//       <h2 className="text-lg font-bold">{title}</h2>
//       {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
//       <div className="mt-4 h-72 w-full text-base-content">
//         {isEmpty ? (
//           <div className="flex h-full items-center justify-center text-base-content/60">No data to show yet.</div>
//         ) : (
//           children
//         )}
//       </div>
//     </section>
//   );
// }


// export function SimpleBarChart({ data, xKey, yKey, color = CHART_COLORS.primary, money = false, label }) {
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
//         <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.12} vertical={false} />
//         <XAxis dataKey={xKey} tick={axisTick} axisLine={false} tickLine={false} />
//         <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} />
//         <Tooltip
//           contentStyle={tooltipStyle}
//           cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
//           formatter={(value) => [money ? formatCurrency(value) : value, label || yKey]}
//         />
//         <Bar dataKey={yKey} fill={color} radius={[8, 8, 0, 0]} maxBarSize={48} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }


// export function SimpleAreaChart({ data, xKey, yKey, color = CHART_COLORS.accent, money = false, label }) {
//   const gradientId = `gradient-${yKey}`;

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
//         <defs>
//           <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor={color} stopOpacity={0.45} />
//             <stop offset="95%" stopColor={color} stopOpacity={0.02} />
//           </linearGradient>
//         </defs>
//         <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.12} vertical={false} />
//         <XAxis dataKey={xKey} tick={axisTick} axisLine={false} tickLine={false} />
//         <YAxis tick={axisTick} axisLine={false} tickLine={false} />
//         <Tooltip contentStyle={tooltipStyle} formatter={(value) => [money ? formatCurrency(value) : value, label || yKey]} />
//         <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={3} fill={`url(#${gradientId})`} />
//       </AreaChart>
//     </ResponsiveContainer>
//   );
// }


// export function SimplePieChart({ data }) {
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <PieChart>
//         <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={3}>
//           {data.map((entry, index) => (
//             <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
//           ))}
//         </Pie>
//         <Tooltip contentStyle={tooltipStyle} />
//         <Legend />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }


"use client";

import { useId } from "react";
import { FiBarChart2 } from "react-icons/fi";
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

const PIE_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.red,
];

const tooltipStyle = {
  backgroundColor: "var(--color-base-100)",
  border: "1px solid var(--color-base-300)",
  borderRadius: "14px",
  boxShadow: "0 12px 28px -6px rgba(0, 0, 0, 0.14)",
  padding: "10px 14px",
  color: "var(--color-base-content)",
  fontSize: "13px",
};

const tooltipLabelStyle = {
  fontWeight: 700,
  marginBottom: "4px",
  color: "var(--color-base-content)",
};

const tooltipItemStyle = {
  fontWeight: 600,
  padding: 0,
};

const axisTick = {
  fill: "currentColor",
  fontSize: 12,
  fontWeight: 500,
  opacity: 0.65,
};

export function ChartCard({ title, subtitle, children, isEmpty }) {
  return (
    <section className="group relative overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:border-primary/35 hover:shadow-xl hover:shadow-base-content/5 sm:p-6">
      {/* Subtle Top Gradient Accent Line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Card Header */}
      <div className="flex items-start justify-between gap-3 border-b border-base-300/60 pb-4">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/15"
          />
          <div>
            <h2 className="text-base font-extrabold tracking-tight text-base-content sm:text-lg">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-xs font-medium text-base-content/65 sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Chart Canvas or Styled Empty State */}
      <div className="mt-5 h-72 w-full text-base-content">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-base-300/80 bg-base-200/40 px-4 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-base-200 text-base-content/45">
              <FiBarChart2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold text-base-content/60">
              No data to show yet.
            </p>
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

export function SimpleBarChart({
  data,
  xKey,
  yKey,
  color = CHART_COLORS.primary,
  money = false,
  label,
}) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `bar-grad-${uid}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={1} />
            <stop offset="100%" stopColor={color} stopOpacity={0.72} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="4 4"
          stroke="currentColor"
          strokeOpacity={0.1}
          vertical={false}
        />
        <XAxis
          dataKey={xKey}
          tick={axisTick}
          axisLine={false}
          tickLine={false}
          dy={6}
        />
        <YAxis
          tick={axisTick}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          cursor={{ fill: "currentColor", fillOpacity: 0.05, radius: 8 }}
          formatter={(value) => [
            money ? formatCurrency(value) : value,
            label || yKey,
          ]}
        />
        <Bar
          dataKey={yKey}
          fill={`url(#${gradientId})`}
          radius={[10, 10, 4, 4]}
          maxBarSize={44}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SimpleAreaChart({
  data,
  xKey,
  yKey,
  color = CHART_COLORS.accent,
  money = false,
  label,
}) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `area-grad-${uid}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
            <stop offset="95%" stopColor={color} stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="4 4"
          stroke="currentColor"
          strokeOpacity={0.1}
          vertical={false}
        />
        <XAxis
          dataKey={xKey}
          tick={axisTick}
          axisLine={false}
          tickLine={false}
          dy={6}
        />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          cursor={{ stroke: color, strokeWidth: 1.5, strokeDasharray: "4 4" }}
          formatter={(value) => [
            money ? formatCurrency(value) : value,
            label || yKey,
          ]}
        />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={3}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
          activeDot={{
            r: 6,
            fill: color,
            stroke: "var(--color-base-100)",
            strokeWidth: 2.5,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SimplePieChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + (Number(item?.value) || 0), 0);

  return (
    <div className="relative h-full w-full">
      {/* Center Total Readout inside Donut Hole */}
      {total > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex -translate-y-4 flex-col items-center justify-center text-center"
        >
          <span className="text-[11px] font-bold tracking-wider uppercase text-base-content/50">
            Total
          </span>
          <span className="text-xl font-black tracking-tight text-base-content">
            {total.toLocaleString()}
          </span>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="46%"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={4}
            cornerRadius={6}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            itemStyle={tooltipItemStyle}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={9}
            wrapperStyle={{ fontSize: "12px", fontWeight: 600, paddingTop: "8px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
