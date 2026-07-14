"use client";

import React from "react";
import { KPICard } from "./kpi-card";
import { RecentMatches } from "./recent-matches";
import { TopPlayers } from "./top-players";
import { TopTeams } from "./top-teams";
import { AIInsightCard } from "./ai-insight-card";
import { LineChart } from "./charts/line-chart";
import { BarChart } from "./charts/bar-chart";
import { PieChart } from "./charts/pie-chart";
import { AreaChart } from "./charts/area-chart";
import { DashboardTelemetry } from "../types/dashboard";

interface DashboardLayoutProps {
  data: DashboardTelemetry | null;
  isLoading: boolean;
}

export function DashboardLayout({ data, isLoading }: DashboardLayoutProps) {
  if (isLoading || !data) {
    return <SkeletonLayout />;
  }

  return (
    <div className="space-y-6">
      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data.kpis.map((kpi) => (
          <KPICard key={kpi.id} data={kpi} />
        ))}
      </div>

      {/* Row 2: Goals Timeline & Tournament Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Goals Timeline</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Goals scored over the course of the tournament timeline.</p>
          </div>
          <LineChart data={data.goalsTimeline} />
        </div>

        <div className="p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Tournament Progress</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Distribution of match occurrences categorized by tournament stage.</p>
          </div>
          <BarChart data={data.matchesByStage} />
        </div>
      </div>

      {/* Row 2b: Goals Distribution (Pie) & Team Performance (Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Confederation Contribution</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Share of total goals scored by team confederation.</p>
          </div>
          <PieChart data={data.goalsDistribution} />
        </div>

        <div className="lg:col-span-2 p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Goals vs Expected Goals (xG)</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Aggregated actual goals compared to Expected Goals (xG) per match for top teams.</p>
          </div>
          <AreaChart data={data.teamPerformance} />
        </div>
      </div>

      {/* Row 3: Top Standings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl">
          <TopTeams teams={data.topTeams} />
        </div>
        <div className="p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl">
          <TopPlayers players={data.topPlayers} />
        </div>
      </div>

      {/* Row 4: Recent Matches & AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl">
          <RecentMatches matches={data.recentMatches} />
        </div>
        <div className="lg:col-span-1">
          <AIInsightCard insights={data.aiInsights} />
        </div>
      </div>
    </div>
  );
}

function SkeletonLayout() {
  return (
    <div className="space-y-6 animate-pulse select-none">
      {/* KPI Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-5 bg-[#111113] border border-[#27272A] rounded-2xl h-[120px] flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 bg-zinc-800 rounded" />
              <div className="h-7 w-7 bg-zinc-800 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-6 w-12 bg-zinc-800 rounded" />
              <div className="h-3 w-20 bg-zinc-800 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl h-[400px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-4 w-28 bg-zinc-800 rounded" />
              <div className="h-3 w-48 bg-zinc-800 rounded" />
            </div>
            <div className="h-[280px] bg-zinc-900/50 rounded-xl border border-zinc-900 flex items-center justify-center">
              <div className="text-[10px] text-zinc-600 font-semibold tracking-widest uppercase">Initializing Telemetry...</div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 3 Standings Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="p-5 bg-[#111113]/30 border border-[#27272A] rounded-2xl h-[340px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-zinc-800 rounded" />
              <div className="h-3 w-56 bg-zinc-800 rounded" />
            </div>
            <div className="flex-1 mt-4 space-y-3">
              <div className="h-8 bg-zinc-850 rounded" />
              <div className="h-8 bg-zinc-900 rounded" />
              <div className="h-8 bg-zinc-900 rounded" />
              <div className="h-8 bg-zinc-900 rounded" />
              <div className="h-8 bg-zinc-900 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
