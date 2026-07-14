"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Trophy } from "lucide-react";
import { RecentMatch } from "../types/dashboard";

interface RecentMatchesProps {
  matches: RecentMatch[];
}

export function RecentMatches({ matches }: RecentMatchesProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between pb-2 border-b border-[#27272A]/60">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
            Recent Fixtures
          </h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Latest completed match statistics.
          </p>
        </div>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold uppercase">
          Live Data
        </span>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[380px] pr-1 scrollbar-thin">
        {matches.map((match, idx) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="flex flex-col gap-3 p-4 bg-[#111113]/40 border border-[#27272A] rounded-2xl hover:border-zinc-700 transition-colors"
          >
            {/* Match Teams Row */}
            <div className="grid grid-cols-7 items-center justify-center text-center gap-1">
              {/* Home Team */}
              <div className="col-span-3 flex items-center justify-end gap-3 pr-2">
                <span className="text-xs font-semibold text-white truncate max-w-[100px] md:max-w-[120px]">
                  {match.homeTeam}
                </span>
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300 font-mono shrink-0 select-none">
                  {match.homeCode}
                </div>
              </div>

              {/* Score Indicator */}
              <div className="col-span-1 flex items-center justify-center">
                {match.homeScore !== null && match.awayScore !== null ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-white font-mono shadow-md">
                    <span>{match.homeScore}</span>
                    <span className="text-zinc-600">:</span>
                    <span>{match.awayScore}</span>
                  </div>
                ) : (
                  <div className="text-[10px] text-zinc-500 font-semibold px-2 py-1 bg-zinc-950 rounded-lg border border-zinc-800 uppercase tracking-wider">
                    VS
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className="col-span-3 flex items-center justify-start gap-3 pl-2">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300 font-mono shrink-0 select-none">
                  {match.awayCode}
                </div>
                <span className="text-xs font-semibold text-white truncate max-w-[100px] md:max-w-[120px]">
                  {match.awayTeam}
                </span>
              </div>
            </div>

            {/* Match Meta Row */}
            <div className="flex flex-wrap items-center justify-between text-[10px] text-zinc-500 border-t border-[#27272A]/40 pt-2 gap-2">
              <div className="flex items-center gap-1 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="truncate">{match.venue} ({match.city})</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-emerald-500/80 shrink-0" />
                  <span>{match.stage}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-500 shrink-0" />
                  <span>{match.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
