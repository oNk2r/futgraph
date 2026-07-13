"use client";

import React, { useState } from "react";
import { Settings, Save, ShieldAlert, Cpu, Database, User } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@futgraph.ai");
  const [org, setOrg] = useState("Athletico Analytics");
  const [apiKey, setApiKey] = useState("sb_live_8f0a202dff8e9102cba");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            System Settings <Settings className="w-5 h-5 text-blue-500" />
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Configure data ingestion keys, system preferences, and user credentials.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#27272A]/50 pb-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>User Credentials</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-semibold font-mono">Full Name</label>
              <input
                className="w-full bg-[#141416] border border-[#27272A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-semibold font-mono">Email Address</label>
              <input
                className="w-full bg-[#141416] border border-[#27272A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-700"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs text-zinc-400 font-semibold font-mono">Organization</label>
              <input
                className="w-full bg-[#141416] border border-[#27272A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-700"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Data Integrations */}
        <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#27272A]/50 pb-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Telemetry Integrations</span>
          </h3>

          <div className="space-y-4 text-xs font-mono">
            {/* StatsBomb */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-[#27272A] bg-[#141416]/40 rounded-xl">
              <div>
                <h4 className="text-xs font-bold text-white uppercase">StatsBomb Ingestion API</h4>
                <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Live feed integration for positional event tracking.</p>
              </div>
              <input
                className="bg-[#09090B] border border-[#27272A] rounded-lg px-3 py-1.5 text-zinc-300 w-64 focus:outline-none focus:border-zinc-700"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            {/* Opta */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-[#27272A] bg-[#141416]/40 rounded-xl opacity-60">
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Opta XML Ingestion</h4>
                <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Connect to Opta Sports live feed servers.</p>
              </div>
              <span className="text-[10px] border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 px-2.5 py-1 rounded">
                Credentials Needed
              </span>
            </div>

            {/* Wyscout */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-[#27272A] bg-[#141416]/40 rounded-xl">
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Wyscout API Integration</h4>
                <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Automated raw tracking sync scheduler.</p>
              </div>
              <span className="text-[10px] border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 px-2.5 py-1 rounded">
                Active & Connected
              </span>
            </div>
          </div>
        </div>

        {/* System Theme Preferences */}
        <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#27272A]/50 pb-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Theme Preferences</span>
          </h3>

          <div className="flex items-center justify-between p-4 border border-dashed border-[#27272A] rounded-xl text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white">System Theme Lock</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5">FutGraph AI is optimized exclusively for premium dark theme.</p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-zinc-400 border border-[#27272A] px-2.5 py-1 bg-zinc-900 rounded select-none cursor-not-allowed">
              Dark Only (Locked)
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
}
