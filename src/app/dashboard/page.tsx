"use client";

import React from "react";
import { Sparkles, CalendarDays, Download, RefreshCw } from "lucide-react";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"
          >
            Dashboard Overview{" "}
            <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="text-xs text-zinc-500 mt-1"
          >
            Real-time analytics pipelines and database telemetry reports.
          </motion.p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex items-center justify-center p-2 bg-[#111113] border border-[#27272A] hover:border-zinc-700 hover:bg-white/5 text-zinc-400 hover:text-white rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-emerald-400" : ""}`} />
          </button>

          <button className="flex items-center gap-2 bg-[#111113] border border-[#27272A] hover:border-zinc-700 hover:bg-white/5 text-zinc-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer select-none">
            <CalendarDays className="w-3.5 h-3.5 text-zinc-500" />
            <span>FIFA World Cup 2026</span>
          </button>

          <button className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer select-none">
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-6 bg-red-500/5 border border-red-500/20 text-red-400 rounded-2xl flex flex-col items-center justify-center min-h-[300px] gap-3">
          <span className="text-sm font-semibold">Telemetry Retrieval Failed</span>
          <p className="text-xs text-red-400/80 text-center max-w-md">
            {error.message || "An error occurred while connecting to the analytics engine."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all border border-red-500/30 cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <DashboardLayout data={data} isLoading={isLoading} />
      )}
    </div>
  );
}
