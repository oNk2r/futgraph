"use client";

import React from "react";
import { BarChart3, Filter, RefreshCw, Layers, Compass, Crosshair } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Advanced Analytics <BarChart3 className="w-5 h-5 text-blue-500" />
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Telemetry reports, shot models, and spatial-temporal pass analytics.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#111113] border border-[#27272A] hover:bg-white/5 text-zinc-300 hover:text-white px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>Select Match</span>
          </button>
          <button className="p-2 bg-[#111113] border border-[#27272A] hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Analytics Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline xG Plot Card */}
        <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Expected Goals (xG) Timeline Flow</h3>
              <p className="text-xs text-zinc-500">Cumulative shot quality progression over 90 mins</p>
            </div>
            <Layers className="w-4 h-4 text-zinc-500" />
          </div>

          {/* SVG Line Chart Plot */}
          <div className="h-[220px] w-full bg-[#141416]/50 border border-[#27272A] rounded-xl relative p-4 flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
            </div>

            <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 50">
              {/* Home Team Line (Blue) */}
              <path
                d="M 0 45 L 20 45 L 35 40 L 50 35 L 60 22 L 75 22 L 90 10"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="60" cy="22" r="1.5" fill="#3b82f6" />
              <circle cx="90" cy="10" r="1.5" fill="#3b82f6" />

              {/* Away Team Line (Emerald) */}
              <path
                d="M 0 45 L 15 42 L 30 42 L 45 42 L 65 30 L 80 30 L 90 28"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="65" cy="30" r="1.5" fill="#10b981" />

              {/* Axis labels */}
              <text x="2" y="48" className="text-[2px] fill-zinc-500 font-mono">0'</text>
              <text x="48" y="48" className="text-[2px] fill-zinc-500 font-mono">45'</text>
              <text x="92" y="48" className="text-[2px] fill-zinc-500 font-mono">90'</text>
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs mt-4 pt-3 border-t border-[#27272A]/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="font-semibold text-white">Man City (2.45 xG)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Real Madrid (1.82 xG)</span>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Shot Zone Conversion Map */}
        <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Shot Accuracy Zone Plot</h3>
              <p className="text-xs text-zinc-500">Shot results mapped inside the penalty box</p>
            </div>
            <Crosshair className="w-4 h-4 text-zinc-500" />
          </div>

          {/* Goal/Box SVG */}
          <div className="h-[220px] w-full bg-[#141416]/50 border border-[#27272A] rounded-xl relative p-4 flex items-center justify-center overflow-hidden">
            <svg className="w-[80%] h-full text-zinc-800" viewBox="0 0 80 50">
              {/* Penalty box outline */}
              <rect x="5" y="0" width="70" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
              <rect x="25" y="0" width="30" height="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
              {/* Goal outline */}
              <rect x="32" y="-2" width="16" height="2" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />

              {/* Goals (emerald circles) */}
              <circle cx="34" cy="8" r="2" fill="#10b981" fillOpacity="0.8" stroke="#10b981" strokeWidth="0.5" className="animate-pulse" />
              <circle cx="45" cy="4" r="2" fill="#10b981" fillOpacity="0.8" stroke="#10b981" strokeWidth="0.5" />
              <circle cx="40" cy="12" r="2" fill="#10b981" fillOpacity="0.8" stroke="#10b981" strokeWidth="0.5" />

              {/* Missed / Saved (rose circles) */}
              <circle cx="15" cy="25" r="1.5" fill="#ef4444" fillOpacity="0.6" stroke="#ef4444" strokeWidth="0.5" />
              <circle cx="28" cy="18" r="1.5" fill="#ef4444" fillOpacity="0.6" stroke="#ef4444" strokeWidth="0.5" />
              <circle cx="58" cy="22" r="1.5" fill="#ef4444" fillOpacity="0.6" stroke="#ef4444" strokeWidth="0.5" />
              <circle cx="47" cy="20" r="1.5" fill="#ef4444" fillOpacity="0.6" stroke="#ef4444" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs mt-4 pt-3 border-t border-[#27272A]/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-zinc-400">Goals (3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-zinc-400">Blocked / Saved / Missed (4)</span>
            </div>
          </div>
        </div>

        {/* Spatial Possession Share Card */}
        <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Spatial Possession Share</h3>
              <p className="text-xs text-zinc-500">Possession weight breakdown by vertical third of the field</p>
            </div>
            <Compass className="w-4 h-4 text-zinc-500" />
          </div>

          <div className="space-y-4">
            {/* Defensive third */}
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Defensive Third (Build-up Phase)</span>
                <span>35% Share</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "35%" }} />
              </div>
            </div>

            {/* Midfield third */}
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Middle Third (Progression / Control Phase)</span>
                <span>48% Share</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: "48%" }} />
              </div>
            </div>

            {/* Attacking third */}
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Attacking Third (Final Third Penetration)</span>
                <span>17% Share</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "17%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
