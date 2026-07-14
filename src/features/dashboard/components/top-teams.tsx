"use client";

import React from "react";
import { TopTeam } from "../types/dashboard";

interface TopTeamsProps {
  teams: TopTeam[];
}

export function TopTeams({ teams }: TopTeamsProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
          Top Team Standings
        </h3>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          General standings based on cumulative group stage and knockout performance.
        </p>
      </div>

      <div className="overflow-x-auto w-full border border-[#27272A] rounded-2xl bg-[#111113]/30">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#27272A] text-zinc-400 bg-zinc-900/40 select-none">
              <th className="py-3 px-4 font-medium">Team</th>
              <th className="py-3 px-4 font-medium text-center">Played</th>
              <th className="py-3 px-4 font-medium text-center">Won</th>
              <th className="py-3 px-4 font-medium text-center">Goal Diff</th>
              <th className="py-3 px-4 font-medium text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]/50">
            {teams.map((team, idx) => {
              const gdSign = team.gd > 0 ? "+" : "";
              let gdClass = "text-zinc-400";
              if (team.gd > 0) gdClass = "text-emerald-400";
              else if (team.gd < 0) gdClass = "text-rose-400";

              return (
                <tr
                  key={team.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-3">
                    <span className="w-5 text-zinc-500 font-mono text-[10px] text-center">
                      {idx + 1}
                    </span>
                    <span className="w-8 h-5 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[9px] font-mono text-zinc-300 font-bold">
                      {team.fifaCode}
                    </span>
                    <span>{team.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-300">
                    {team.played}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-300">
                    {team.won}
                  </td>
                  <td className={`py-3.5 px-4 text-center font-mono font-medium ${gdClass}`}>
                    {gdSign}
                    {team.gd}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-white font-mono text-sm">
                    {team.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
