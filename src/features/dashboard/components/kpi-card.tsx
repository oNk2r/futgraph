"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Goal,
  Users,
  Shield,
  MapPin,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { KPICardData } from "../types/dashboard";

interface KPICardProps {
  data: KPICardData;
}

const iconMap = {
  matches: CalendarDays,
  goals: Goal,
  players: Users,
  teams: Shield,
  venues: MapPin,
  referees: UserCheck,
};

export function KPICard({ data }: KPICardProps) {
  const Icon = iconMap[data.iconName] || Users;

  // Set trend colors and icons
  let TrendIcon = Minus;
  let trendColorClass = "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";

  if (data.trendType === "positive") {
    TrendIcon = ArrowUpRight;
    trendColorClass = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  } else if (data.trendType === "negative") {
    TrendIcon = ArrowDownRight;
    trendColorClass = "text-rose-400 bg-rose-500/10 border-rose-500/20";
  }

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="relative flex flex-col justify-between p-5 bg-[#111113] border border-[#27272A] rounded-2xl transition-all group overflow-hidden select-none hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)]"
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-radial from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-zinc-400 tracking-wide uppercase">
          {data.label}
        </span>
        <div className="p-2 bg-zinc-800/40 border border-[#27272A] rounded-xl text-zinc-300 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <span className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-50 font-mono">
          {data.value}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className={`flex items-center gap-0.5 px-2 py-0.5 border rounded-full text-[10px] font-semibold tracking-wide ${trendColorClass}`}>
            <TrendIcon className="w-3 h-3 shrink-0" />
            <span>{data.trend}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
