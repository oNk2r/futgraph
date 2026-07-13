"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  sparklineData: number[]; // Array of 0-100 values to draw an SVG sparkline
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  description,
  icon: Icon,
  sparklineData,
}: MetricCardProps) {
  // Generate SVG path for sparkline
  const width = 120;
  const height = 40;
  const points = sparklineData.map((val, idx) => {
    const x = (idx / (sparklineData.length - 1)) * width;
    const y = height - (val / 100) * height;
    return `${x},${y}`;
  });
  const pathData = `M ${points.join(" L ")}`;

  // Color mapping based on trend type
  const trendColors = {
    positive: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    negative: "text-rose-400 border-rose-500/20 bg-rose-500/5",
    neutral: "text-zinc-400 border-zinc-500/20 bg-zinc-500/5",
  };

  const lineColors = {
    positive: "#34d399", // emerald-400
    negative: "#f87171", // rose-400
    neutral: "#a1a1aa", // zinc-400
  };

  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-5 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
            {title}
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className="p-2.5 bg-zinc-900 border border-[#27272A] rounded-xl text-zinc-400 group-hover:text-white transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-end justify-between mt-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs px-2 py-0.5 border rounded-lg font-mono",
                trendColors[changeType]
              )}
            >
              {changeType === "positive" && <ArrowUpRight className="w-3 h-3" />}
              {changeType === "negative" && <ArrowDownRight className="w-3 h-3" />}
              {changeType === "neutral" && <Minus className="w-3 h-3" />}
              {change}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500">{description}</p>
        </div>

        {/* Sparkline Visualization */}
        <div className="w-[120px] h-[40px] opacity-75 group-hover:opacity-100 transition-opacity">
          <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <linearGradient id={`grad-${title.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColors[changeType]} stopOpacity="0.2" />
                <stop offset="100%" stopColor={lineColors[changeType]} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Area under the line */}
            <path
              d={`${pathData} L ${width},${height} L 0,${height} Z`}
              fill={`url(#grad-${title.replace(/\s+/g, "")})`}
            />
            {/* Sparkline path */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={lineColors[changeType]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
