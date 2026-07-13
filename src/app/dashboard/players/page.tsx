"use client";

import React, { useState } from "react";
import { Search, Plus, Filter, User, BarChart2, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PlayerItem {
  id: string;
  name: string;
  club: string;
  position: string;
  rating: number;
  skills: string[];
  metrics: {
    pace: number;
    shooting: number;
    passing: number;
    defending: number;
  };
}

export default function PlayersPage() {
  const [search, setSearch] = useState("");

  const players: PlayerItem[] = [
    {
      id: "p-1",
      name: "Erling Haaland",
      club: "Manchester City",
      position: "ST (Target Forward)",
      rating: 9.3,
      skills: ["Finishing", "Off-the-ball Movement", "Physical Strength"],
      metrics: { pace: 89, shooting: 95, passing: 72, defending: 45 },
    },
    {
      id: "p-2",
      name: "Jude Bellingham",
      club: "Real Madrid",
      position: "AM / CM (Box-to-Box)",
      rating: 8.9,
      skills: ["Late Runs", "Dribbling", "Pressing Density"],
      metrics: { pace: 84, shooting: 86, passing: 85, defending: 78 },
    },
    {
      id: "p-3",
      name: "Rodri Hernandez",
      club: "Manchester City",
      position: "DM (Deep Lying Playmaker)",
      rating: 9.4,
      skills: ["Positional Discipline", "Interceptions", "Line-breaking Passes"],
      metrics: { pace: 70, shooting: 78, passing: 92, defending: 89 },
    },
    {
      id: "p-4",
      name: "Bukayo Saka",
      club: "Arsenal FC",
      position: "RW (Inside Forward)",
      rating: 8.8,
      skills: ["1v1 Isolation", "Shot Creation", "Tactical Tracking"],
      metrics: { pace: 90, shooting: 84, passing: 86, defending: 64 },
    },
  ];

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Player Rosters <User className="w-5 h-5 text-blue-500" />
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Analyze individual telemetry, attribute graphs, and match ratings.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Player Profile</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            placeholder="Search players by name..."
            className="w-full bg-[#111113] border border-[#27272A] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border border-[#27272A] hover:bg-white/5 hover:border-zinc-700 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer">
          <Filter className="w-4 h-4" />
          <span>Attributes Filter</span>
        </button>
      </div>

      {/* Players List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border border-[#27272A]">
                  <AvatarFallback className="bg-zinc-800 text-white font-bold text-sm">
                    {player.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {player.name}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {player.position} • {player.club}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  <span>{player.rating}</span>
                </div>
                <p className="text-[8px] text-zinc-500 uppercase tracking-wider font-semibold">
                  Match Rating
                </p>
              </div>
            </div>

            {/* Core Stats Progress Bars */}
            <div className="mt-6 space-y-3">
              <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                Core Attributes
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[10px]">
                {/* Pace */}
                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Pace</span>
                    <span>{player.metrics.pace}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${player.metrics.pace}%` }}
                    />
                  </div>
                </div>
                {/* Shooting */}
                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Shooting</span>
                    <span>{player.metrics.shooting}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${player.metrics.shooting}%` }}
                    />
                  </div>
                </div>
                {/* Passing */}
                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Passing</span>
                    <span>{player.metrics.passing}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="bg-violet-500 h-full rounded-full"
                      style={{ width: `${player.metrics.passing}%` }}
                    />
                  </div>
                </div>
                {/* Defending */}
                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Defending</span>
                    <span>{player.metrics.defending}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full"
                      style={{ width: `${player.metrics.defending}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Strengths tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-6 border-t border-[#27272A]/50 pt-4">
              <span className="text-[9px] text-zinc-500 font-bold uppercase mr-1">STRENGTHS:</span>
              {player.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[9px] bg-zinc-800/60 border border-[#27272A] text-zinc-300 px-2 py-0.5 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
