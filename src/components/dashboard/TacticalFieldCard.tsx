"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, RefreshCw } from "lucide-react";

interface PlayerNode {
  id: number;
  x: number; // percentage
  y: number; // percentage
  name: string;
  number: string;
  role: string;
  rating: string;
}

export function TacticalFieldCard() {
  const [activePlayer, setActivePlayer] = useState<PlayerNode | null>(null);

  const players: PlayerNode[] = [
    { id: 1, x: 50, y: 88, name: "Ederson", number: "31", role: "Sweeper Keeper", rating: "7.2" },
    { id: 2, x: 25, y: 70, name: "Gvardiol", number: "24", role: "Ball Winger Def", rating: "7.8" },
    { id: 3, x: 42, y: 72, name: "Dias", number: "3", role: "Stopper Def", rating: "8.1" },
    { id: 4, x: 58, y: 72, name: "Akanji", number: "25", role: "Ball Playing Def", rating: "7.5" },
    { id: 5, x: 75, y: 70, name: "Walker", number: "2", role: "Fullback (Right)", rating: "7.4" },
    { id: 6, x: 50, y: 55, name: "Rodri", number: "16", role: "Deep Midfielder", rating: "8.9" },
    { id: 7, x: 35, y: 40, name: "De Bruyne", number: "17", role: "Advanced Playmaker", rating: "8.6" },
    { id: 8, x: 65, y: 40, name: "Foden", number: "47", role: "Roaming Midfielder", rating: "8.4" },
    { id: 9, x: 20, y: 25, name: "Grealish", number: "10", role: "Inside Forward (Left)", rating: "7.9" },
    { id: 10, x: 80, y: 25, name: "Silva", number: "20", role: "Winger (Right)", rating: "8.2" },
    { id: 11, x: 50, y: 18, name: "Haaland", number: "9", role: "Target Forward", rating: "9.3" },
  ];

  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between h-full relative group">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white tracking-tight">Tactical Pitch Overlay</h4>
          <p className="text-xs text-zinc-500">Live formations & passing zones</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono">
            4-3-3 Attacking
          </span>
          <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Football Field */}
      <div className="relative aspect-[3/4] w-full bg-[#141416]/50 border border-[#27272A] rounded-xl overflow-hidden p-2">
        {/* Heatmap overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.15),transparent_45%)]" />

        <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 120">
          {/* Pitch Lines */}
          <rect
            x="2"
            y="2"
            width="96"
            height="116"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />

          {/* Halfway line & Center Circle */}
          <line x1="2" y1="60" x2="98" y2="60" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="50" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="50" cy="60" r="0.5" fill="currentColor" />

          {/* Penalty Areas */}
          {/* Top Goal Box */}
          <rect x="30" y="2" width="40" height="18" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          <rect x="40" y="2" width="20" height="6" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M 38 20 A 12 12 0 0 0 62 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="50" cy="14" r="0.5" fill="currentColor" />

          {/* Bottom Goal Box */}
          <rect x="30" y="100" width="40" height="18" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          <rect x="40" y="114" width="20" height="6" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M 38 100 A 12 12 0 0 1 62 100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="50" cy="106" r="0.5" fill="currentColor" />

          {/* Draw mock passing routes */}
          <path
            d="M 50 55 Q 35 40 50 18"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.5"
            strokeDasharray="1.5,1.5"
            strokeOpacity="0.8"
          />
          <path
            d="M 50 88 Q 25 70 50 55"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.5"
            strokeDasharray="1.5,1.5"
            strokeOpacity="0.6"
          />

          {/* Interactive Player Nodes */}
          {players.map((p) => (
            <g
              key={p.id}
              className="cursor-pointer group/node"
              onClick={() => setActivePlayer(p)}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r="3"
                className="fill-blue-500/10 stroke-blue-500 hover:fill-blue-500 transition-colors"
                strokeWidth="1"
              />
              <text
                x={p.x}
                y={p.y + 1}
                className="text-[2.5px] fill-white text-center font-semibold font-mono"
                textAnchor="middle"
              >
                {p.number}
              </text>
              <text
                x={p.x}
                y={p.y + 6}
                className="text-[2px] fill-zinc-400 group-hover/node:fill-white font-medium"
                textAnchor="middle"
              >
                {p.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Player Details Overlay */}
        <AnimatePresence>
          {activePlayer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-3 left-3 right-3 bg-[#111113] border border-blue-500/20 p-3 rounded-lg flex items-center justify-between shadow-2xl z-10"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-1.5 py-0.2 rounded font-mono">
                    #{activePlayer.number}
                  </span>
                  <h5 className="text-xs font-semibold text-white truncate">{activePlayer.name}</h5>
                </div>
                <p className="text-[9px] text-zinc-500 mt-1">{activePlayer.role}</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-emerald-400">
                  {activePlayer.rating}
                </div>
                <p className="text-[8px] text-zinc-500">Match Rating</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Field statistics footer */}
      <div className="grid grid-cols-2 gap-4 mt-4 border-t border-[#27272A] pt-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-zinc-900 border border-[#27272A] rounded-lg text-zinc-400">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500">Defensive Width</p>
            <p className="text-xs font-semibold text-white">Compact (48m)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-zinc-900 border border-[#27272A] rounded-lg text-zinc-400">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500">Average Speed</p>
            <p className="text-xs font-semibold text-white">Fast Break</p>
          </div>
        </div>
      </div>
    </div>
  );
}
