"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, Bot, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

interface MatchStatDetail {
  possession: [number, number]; // [Home, Away]
  shots: [number, number];
  corners: [number, number];
  fouls: [number, number];
}

interface MatchItem {
  id: string;
  competition: string;
  date: string;
  homeTeam: string;
  homeScore: number;
  awayTeam: string;
  awayScore: number;
  homeXG: number;
  awayXG: number;
  details: MatchStatDetail;
}

export function RecentMatchesCard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const matches: MatchItem[] = [
    {
      id: "match-1",
      competition: "UEFA Champions League",
      date: "Jul 11, 2026",
      homeTeam: "Manchester City",
      homeScore: 3,
      awayTeam: "Real Madrid",
      awayScore: 2,
      homeXG: 2.45,
      awayXG: 1.82,
      details: {
        possession: [58, 42],
        shots: [18, 12],
        corners: [7, 4],
        fouls: [8, 11],
      },
    },
    {
      id: "match-2",
      competition: "UEFA Champions League",
      date: "Jul 08, 2026",
      homeTeam: "FC Barcelona",
      homeScore: 1,
      awayTeam: "Paris SG",
      awayScore: 3,
      homeXG: 1.12,
      awayXG: 2.58,
      details: {
        possession: [45, 55],
        shots: [10, 16],
        corners: [3, 8],
        fouls: [14, 9],
      },
    },
    {
      id: "match-3",
      competition: "Premier League",
      date: "Jul 05, 2026",
      homeTeam: "Arsenal",
      homeScore: 2,
      awayTeam: "Bayern Munich",
      awayScore: 0,
      homeXG: 1.95,
      awayXG: 0.65,
      details: {
        possession: [52, 48],
        shots: [14, 8],
        corners: [6, 3],
        fouls: [10, 12],
      },
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col h-full group">
      <div className="flex items-center justify-between mb-5 border-b border-[#27272A] pb-4">
        <div>
          <h4 className="text-sm font-bold text-white tracking-tight">Recent Match Activity</h4>
          <p className="text-xs text-zinc-500">Live feed and analytics breakdowns</p>
        </div>
        <Trophy className="w-4 h-4 text-zinc-500" />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {matches.map((match) => {
          const isExpanded = expandedId === match.id;
          return (
            <div
              key={match.id}
              className="border border-[#27272A] rounded-xl overflow-hidden bg-[#141416]/40 transition-colors"
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleExpand(match.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors cursor-pointer select-none"
              >
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-semibold tracking-wide uppercase">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span>{match.date}</span>
                    <span>•</span>
                    <span className="truncate">{match.competition}</span>
                  </div>
                  {/* Matchline */}
                  <div className="flex items-center justify-between mt-1 pr-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {match.homeTeam}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          (xG {match.homeXG.toFixed(2)})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {match.awayTeam}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          (xG {match.awayXG.toFixed(2)})
                        </span>
                      </div>
                    </div>
                    {/* Score */}
                    <div className="flex flex-col items-end gap-1 font-bold font-mono text-base pr-4 text-white">
                      <span>{match.homeScore}</span>
                      <span>{match.awayScore}</span>
                    </div>
                  </div>
                </div>
                {/* Accordion Arrow Icon */}
                <div className="text-zinc-500">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Content Details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-[#27272A] bg-[#0c0c0d]/50"
                  >
                    <div className="p-4 space-y-4 text-xs font-mono">
                      <h5 className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                        Match Performance Comparison
                      </h5>

                      {/* Possession Bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-zinc-400">
                          <span>{match.details.possession[0]}% Possession</span>
                          <span>{match.details.possession[1]}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                          <div
                            className="bg-blue-500 h-full"
                            style={{ width: `${match.details.possession[0]}%` }}
                          />
                          <div
                            className="bg-emerald-500 h-full"
                            style={{ width: `${match.details.possession[1]}%` }}
                          />
                        </div>
                      </div>

                      {/* Stat Lines */}
                      <div className="space-y-2 text-[11px]">
                        <div className="flex justify-between border-b border-[#27272A]/40 pb-1 text-zinc-400">
                          <span className="text-white font-medium">
                            {match.details.shots[0]}
                          </span>
                          <span>Total Shots</span>
                          <span className="text-white font-medium">
                            {match.details.shots[1]}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-[#27272A]/40 pb-1 text-zinc-400">
                          <span className="text-white font-medium">
                            {match.details.corners[0]}
                          </span>
                          <span>Corners</span>
                          <span className="text-white font-medium">
                            {match.details.corners[1]}
                          </span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span className="text-white font-medium">
                            {match.details.fouls[0]}
                          </span>
                          <span>Fouls Committed</span>
                          <span className="text-white font-medium">
                            {match.details.fouls[1]}
                          </span>
                        </div>
                      </div>

                      {/* Quick AI Action Link */}
                      <div className="pt-2">
                        <Link
                          href={`/dashboard/ai?matchId=${match.id}`}
                          className="flex items-center justify-between w-full p-2.5 bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-all font-semibold text-[10px]"
                        >
                          <span className="flex items-center gap-1.5">
                            <Bot className="w-3.5 h-3.5" />
                            <span>Request FutGraph AI Tactical Breakdown</span>
                          </span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
