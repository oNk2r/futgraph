"use client";

import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TopPlayer } from "../types/dashboard";

interface TopPlayersProps {
  players: TopPlayer[];
}

type SortField = "name" | "teamName" | "goals" | "assists" | "minutes";
type SortOrder = "asc" | "desc";

export function TopPlayers({ players }: TopPlayersProps) {
  const [sortField, setSortField] = useState<SortField>("goals");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc"); // Default to desc for stats
    }
  };

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        // numeric values
        return sortOrder === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      }
    });
  }, [players, sortField, sortOrder]);

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 ml-1 text-emerald-400" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 ml-1 text-emerald-400" />
    );
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
          Top Player Standings
        </h3>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Leaderboard of elite individual performances in the tournament.
        </p>
      </div>

      <div className="overflow-x-auto w-full border border-[#27272A] rounded-2xl bg-[#111113]/30">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#27272A] text-zinc-400 bg-zinc-900/40 select-none">
              <th
                onClick={() => handleSort("name")}
                className="py-3 px-4 font-medium hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <span>Player</span>
                  <SortIndicator field="name" />
                </div>
              </th>
              <th
                onClick={() => handleSort("teamName")}
                className="py-3 px-4 font-medium hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <span>Country</span>
                  <SortIndicator field="teamName" />
                </div>
              </th>
              <th
                onClick={() => handleSort("goals")}
                className="py-3 px-4 font-medium text-right hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-end">
                  <span>Goals</span>
                  <SortIndicator field="goals" />
                </div>
              </th>
              <th
                onClick={() => handleSort("assists")}
                className="py-3 px-4 font-medium text-right hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-end">
                  <span>Assists</span>
                  <SortIndicator field="assists" />
                </div>
              </th>
              <th
                onClick={() => handleSort("minutes")}
                className="py-3 px-4 font-medium text-right hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-end">
                  <span>Mins Played</span>
                  <SortIndicator field="minutes" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]/50">
            {sortedPlayers.map((player) => (
              <tr
                key={player.id}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="py-3 px-4 font-medium text-white flex items-center gap-3">
                  <Avatar className="w-7 h-7 border border-[#27272A] bg-zinc-950 shrink-0">
                    <AvatarFallback className="text-[10px] text-zinc-400 bg-zinc-900 group-hover:text-emerald-400 group-hover:bg-zinc-800 transition-colors">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="truncate max-w-[120px] sm:max-w-[160px]">
                      {player.name}
                    </span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">
                      {player.position}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-zinc-300">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[9px] font-mono text-zinc-400">
                      {player.fifaCode}
                    </span>
                    <span className="truncate">{player.teamName}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-bold text-emerald-400 font-mono text-sm">
                  {player.goals}
                </td>
                <td className="py-3 px-4 text-right text-zinc-300 font-mono">
                  {player.assists}
                </td>
                <td className="py-3 px-4 text-right text-zinc-500 font-mono">
                  {player.minutes}'
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
