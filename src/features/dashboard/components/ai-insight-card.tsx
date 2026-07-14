"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, BrainCircuit } from "lucide-react";

interface AIInsightCardProps {
  insights: string[];
}

export function AIInsightCard({ insights }: AIInsightCardProps) {
  const [index, setIndex] = useState(0);

  // Auto-play insights carousel
  useEffect(() => {
    if (insights.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % insights.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [insights]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % insights.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + insights.length) % insights.length);
  };

  if (insights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-[#111113]/40 border border-[#27272A] rounded-2xl h-full min-h-[160px] text-zinc-500">
        <BrainCircuit className="w-6 h-6 mb-2 text-zinc-600 animate-pulse" />
        <span className="text-xs">Gathering tournament indicators...</span>
      </div>
    );
  }

  const currentInsight = insights[index];

  return (
    <div className="relative flex flex-col justify-between p-5 bg-radial from-[#18181B]/40 to-[#111113]/90 border border-[#27272A] rounded-2xl transition-all hover:border-emerald-500/20 group h-full shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/[0.01] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-[#27272A]/40 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-white tracking-wider uppercase">
            AI Engine Preview
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            Gemini Flash
          </span>
        </div>
      </div>

      {/* Insight Text */}
      <div className="my-6 relative min-h-[72px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-zinc-300 leading-relaxed font-medium"
          >
            "{currentInsight}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between mt-auto border-t border-[#27272A]/40 pt-3">
        <span className="text-[10px] text-zinc-500 font-semibold font-mono">
          INSIGHT {index + 1} OF {insights.length}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="p-1 hover:bg-zinc-850 hover:text-white rounded-lg text-zinc-500 transition-colors border border-transparent hover:border-[#27272A] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 hover:bg-zinc-850 hover:text-white rounded-lg text-zinc-500 transition-colors border border-transparent hover:border-[#27272A] cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
