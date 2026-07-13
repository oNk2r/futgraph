"use client";

import React, { useState } from "react";
import { Search, Plus, Filter, Users, Shield, Zap, Target } from "lucide-react";

interface TeamItem {
  id: string;
  name: string;
  country: string;
  archetype: string;
  avgAge: number;
  rating: number;
  recentForm: ("W" | "D" | "L")[];
  logoColor: string;
}

export default function TeamsPage() {
  const [search, setSearch] = useState("");

  const teams: TeamItem[] = [
    {
      id: "t-1",
      name: "Manchester City",
      country: "England",
      archetype: "Positional Play (Juego de Posición)",
      avgAge: 26.8,
      rating: 92,
      recentForm: ["W", "W", "D", "W", "W"],
      logoColor: "from-sky-400 to-blue-500",
    },
    {
      id: "t-2",
      name: "Real Madrid",
      country: "Spain",
      archetype: "Dynamic Counter / Direct Transition",
      avgAge: 25.4,
      rating: 91,
      recentForm: ["W", "L", "W", "W", "D"],
      logoColor: "from-zinc-100 to-zinc-400",
    },
    {
      id: "t-3",
      name: "Arsenal FC",
      country: "England",
      archetype: "High Pressing / Compact Rest Defense",
      avgAge: 24.9,
      rating: 89,
      recentForm: ["W", "W", "W", "D", "W"],
      logoColor: "from-red-500 to-rose-600",
    },
    {
      id: "t-4",
      name: "Bayern Munich",
      country: "Germany",
      archetype: "Wing Overload / Box-to-Box Press",
      avgAge: 26.2,
      rating: 88,
      recentForm: ["W", "D", "L", "W", "W"],
      logoColor: "from-red-600 to-amber-600",
    },
  ];

  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Teams Database <Users className="w-5 h-5 text-blue-500" />
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Browse and compare tactical archetypes across European leagues.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto">
          <Plus className="w-3.5 h-3.5" />
          <span>Ingest Team Data</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            placeholder="Search teams by name..."
            className="w-full bg-[#111113] border border-[#27272A] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border border-[#27272A] hover:bg-white/5 hover:border-zinc-700 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${team.logoColor} opacity-70 group-hover:opacity-90 transition-opacity flex items-center justify-center font-bold text-white text-base shadow-lg`}
                >
                  {team.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{team.country}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white font-mono">{team.rating}</div>
                <p className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">
                  Squad Rating
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 border-y border-[#27272A]/50 py-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-zinc-500 block text-[9px] uppercase font-semibold">
                  Tactical Archetype
                </span>
                <span className="text-zinc-300 font-medium truncate block">
                  {team.archetype}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 block text-[9px] uppercase font-semibold">
                  Average Age
                </span>
                <span className="text-zinc-300 font-medium">{team.avgAge} yrs</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-500 font-semibold font-mono">FORM:</span>
                <div className="flex gap-1">
                  {team.recentForm.map((f, i) => (
                    <span
                      key={i}
                      className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold font-mono ${
                        f === "W"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : f === "D"
                          ? "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <button className="text-xs font-semibold text-blue-400 hover:text-white transition-colors cursor-pointer">
                View Reports &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
