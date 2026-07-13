"use client";

import React from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TacticalFieldCard } from "@/components/dashboard/TacticalFieldCard";
import { RadarChartCard } from "@/components/dashboard/RadarChartCard";
import { RecentMatchesCard } from "@/components/dashboard/RecentMatchesCard";
import {
  TrendingUp,
  Activity,
  Goal,
  Compass,
  Download,
  CalendarDays,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Dashboard Overview <Sparkles className="w-5 h-5 text-blue-500" />
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time analytics pipelines and neural engine match reports.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#111113] border border-[#27272A] hover:border-zinc-700 hover:bg-white/5 text-zinc-300 hover:text-white px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Match Win Rate"
          value="74.2%"
          change="+4.8%"
          changeType="positive"
          description="vs last season average"
          icon={TrendingUp}
          sparklineData={[45, 50, 52, 60, 58, 65, 74.2]}
        />
        <MetricCard
          title="Goals Per Game"
          value="2.84"
          change="+12.3%"
          changeType="positive"
          description="vs league target of 2.1"
          icon={Goal}
          sparklineData={[60, 58, 65, 72, 70, 80, 85]}
        />
        <MetricCard
          title="Expected Goals (xG)"
          value="2.41"
          change="+2.1%"
          changeType="positive"
          description="average xG generated per game"
          icon={Activity}
          sparklineData={[30, 45, 52, 48, 60, 58, 62]}
        />
        <MetricCard
          title="Possession Share"
          value="58.6%"
          change="-1.2%"
          changeType="negative"
          description="average possession share"
          icon={Compass}
          sparklineData={[70, 68, 65, 62, 64, 60, 58.6]}
        />
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1: Tactical Field View */}
        <div className="lg:col-span-1 h-full">
          <TacticalFieldCard />
        </div>

        {/* Col 2: Player Radar Comparison */}
        <div className="lg:col-span-1 h-full">
          <RadarChartCard />
        </div>

        {/* Col 3: Recent Match Activity */}
        <div className="lg:col-span-1 h-full">
          <RecentMatchesCard />
        </div>
      </div>
    </div>
  );
}
