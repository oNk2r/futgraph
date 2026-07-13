"use client";

import React, { useState } from "react";
import { BarChart2, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PlayerStat {
  label: string;
  valA: number;
  valB: number;
}

export function RadarChartCard() {
  const [playerA] = useState({ name: "E. Haaland", team: "MCI", color: "#3b82f6" });
  const [playerB] = useState({ name: "K. Mbappé", team: "RMA", color: "#10b981" });

  const stats: PlayerStat[] = [
    { label: "Pace", valA: 89, valB: 97 },
    { label: "Shooting", valA: 95, valB: 90 },
    { label: "Passing", valA: 72, valB: 83 },
    { label: "Dribbling", valA: 80, valB: 92 },
    { label: "Defending", valA: 45, valB: 39 },
    { label: "Physical", valA: 88, valB: 78 },
  ];

  // Radar math helpers: center is at (50, 50), radius is 40
  const cx = 50;
  const cy = 48;
  const maxVal = 100;
  const radius = 35;

  const getCoordinates = (statIndex: number, value: number) => {
    const angle = (Math.PI * 2 / stats.length) * statIndex - Math.PI / 2;
    const valPercent = value / maxVal;
    const r = radius * valPercent;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x},${y}`;
  };

  // Build grid paths (5 concentric rings)
  const gridRings = [0.2, 0.4, 0.6, 0.8, 1.0].map((ringScale) => {
    const points = stats.map((_, idx) => {
      const angle = (Math.PI * 2 / stats.length) * idx - Math.PI / 2;
      const r = radius * ringScale;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    });
    return points.join(" ");
  });

  // Build axes lines
  const axes = stats.map((_, idx) => {
    const angle = (Math.PI * 2 / stats.length) * idx - Math.PI / 2;
    const x2 = cx + radius * Math.cos(angle);
    const y2 = cy + radius * Math.sin(angle);
    return { x1: cx, y1: cy, x2, y2 };
  });

  // Build player polygon points
  const pointsA = stats.map((s, idx) => getCoordinates(idx, s.valA)).join(" ");
  const pointsB = stats.map((s, idx) => getCoordinates(idx, s.valB)).join(" ");

  // Text label positions
  const labelPositions = stats.map((s, idx) => {
    const angle = (Math.PI * 2 / stats.length) * idx - Math.PI / 2;
    const textRadius = radius + 6;
    const x = cx + textRadius * Math.cos(angle);
    const y = cy + textRadius * Math.sin(angle) + 1; // vertical shift offset
    return { label: s.label, x, y };
  });

  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between h-full group">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white tracking-tight">Attributes Profile</h4>
          <p className="text-xs text-zinc-500">Overlay metrics radar comparison</p>
        </div>
        <BarChart2 className="w-4 h-4 text-zinc-500" />
      </div>

      {/* SVG Radar Graph */}
      <div className="relative w-full aspect-square bg-[#141416]/50 border border-[#27272A] rounded-xl flex items-center justify-center p-4">
        <svg className="w-full h-full text-zinc-700" viewBox="0 0 100 100">
          {/* Concentric grid lines */}
          {gridRings.map((r, i) => (
            <polygon
              key={i}
              points={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.25"
              strokeOpacity="0.3"
            />
          ))}

          {/* Axes */}
          {axes.map((axis, i) => (
            <line
              key={i}
              x1={axis.x1}
              y1={axis.y1}
              x2={axis.x2}
              y2={axis.y2}
              stroke="currentColor"
              strokeWidth="0.25"
              strokeOpacity="0.4"
            />
          ))}

          {/* Player A Polygon */}
          <polygon
            points={pointsA}
            fill={`${playerA.color}`}
            fillOpacity="0.15"
            stroke={playerA.color}
            strokeWidth="1"
          />

          {/* Player B Polygon */}
          <polygon
            points={pointsB}
            fill={`${playerB.color}`}
            fillOpacity="0.15"
            stroke={playerB.color}
            strokeWidth="1"
          />

          {/* Category Labels */}
          {labelPositions.map((lp, idx) => (
            <text
              key={idx}
              x={lp.x}
              y={lp.y}
              className="text-[3px] fill-zinc-400 font-semibold font-mono tracking-wider"
              textAnchor="middle"
            >
              {lp.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Player Legends and Summary Metrics */}
      <div className="mt-4 space-y-3">
        <div className="flex justify-between items-center text-xs">
          {/* Player A Legend */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="font-semibold text-white">{playerA.name}</span>
            <span className="text-[9px] text-zinc-500 px-1 border border-[#27272A] rounded">
              {playerA.team}
            </span>
          </div>

          <span className="text-[10px] text-zinc-500 font-mono">VS</span>

          {/* Player B Legend */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-zinc-500 px-1 border border-[#27272A] rounded">
              {playerB.team}
            </span>
            <span className="font-semibold text-white">{playerB.name}</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* Small Data Comparison Table */}
        <div className="border-t border-[#27272A] pt-3 text-[10px] space-y-1.5 font-mono">
          <div className="flex justify-between text-zinc-500">
            <span className="text-blue-400 font-semibold">95</span>
            <span>Shooting Profile</span>
            <span className="text-emerald-400 font-semibold">90</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span className="text-blue-400 font-semibold">89</span>
            <span>Sprint Velocity</span>
            <span className="text-emerald-400 font-semibold">97</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span className="text-blue-400 font-semibold">80</span>
            <span>Dribble Success</span>
            <span className="text-emerald-400 font-semibold">92</span>
          </div>
        </div>
      </div>
    </div>
  );
}
