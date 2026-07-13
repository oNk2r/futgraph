"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Search,
  LayoutDashboard,
  Users,
  User,
  BarChart3,
  Bot,
  Settings,
  Command,
  ArrowRight,
} from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface CommandItem {
  id: string;
  name: string;
  category: "Navigation" | "Actions" | "Links";
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string[];
  action: () => void;
}

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Listen to open_command_menu global events (for trigger from navbar)
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-command-menu", handleOpen);
    return () => window.removeEventListener("open-command-menu", handleOpen);
  }, []);

  const items: CommandItem[] = [
    {
      id: "dashboard",
      name: "Go to Dashboard",
      category: "Navigation",
      icon: LayoutDashboard,
      shortcut: ["G", "D"],
      action: () => {
        router.push("/dashboard");
        setOpen(false);
      },
    },
    {
      id: "teams",
      name: "Go to Teams Analytics",
      category: "Navigation",
      icon: Users,
      shortcut: ["G", "T"],
      action: () => {
        router.push("/dashboard/teams");
        setOpen(false);
      },
    },
    {
      id: "players",
      name: "Go to Player Profiles",
      category: "Navigation",
      icon: User,
      shortcut: ["G", "P"],
      action: () => {
        router.push("/dashboard/players");
        setOpen(false);
      },
    },
    {
      id: "analytics",
      name: "Go to Advanced Analytics",
      category: "Navigation",
      icon: BarChart3,
      shortcut: ["G", "A"],
      action: () => {
        router.push("/dashboard/analytics");
        setOpen(false);
      },
    },
    {
      id: "ai",
      name: "Go to AI Insights",
      category: "Navigation",
      icon: Bot,
      shortcut: ["G", "I"],
      action: () => {
        router.push("/dashboard/ai");
        setOpen(false);
      },
    },
    {
      id: "settings",
      name: "Go to Settings",
      category: "Navigation",
      icon: Settings,
      shortcut: ["G", "S"],
      action: () => {
        router.push("/dashboard/settings");
        setOpen(false);
      },
    },
    {
      id: "search-match",
      name: "Search recent matches...",
      category: "Actions",
      icon: Search,
      action: () => {
        alert("Search matches: mock database query initiated");
        setOpen(false);
      },
    },
    {
      id: "ask-ai",
      name: "Ask AI for tactical recommendation",
      category: "Actions",
      icon: Bot,
      action: () => {
        router.push("/dashboard/ai");
        setOpen(false);
      },
    },
    {
      id: "github",
      name: "View Source on GitHub",
      category: "Links",
      icon: GithubIcon,
      action: () => {
        window.open("https://github.com", "_blank");
        setOpen(false);
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(filteredItems.map((i) => i.category))) as Array<
    "Navigation" | "Actions" | "Links"
  >;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="max-w-2xl bg-[#111113]/95 backdrop-blur-xl border border-[#27272A] p-0 overflow-hidden shadow-2xl rounded-2xl">
        <div className="flex items-center border-b border-[#27272A] px-4 py-3 gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 bg-[#1c1c1f] px-2 py-0.5 border border-[#27272A] rounded-md text-[10px] text-zinc-400 font-medium">
            ESC
          </kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2 scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-500">
              No results found for "{search}"
            </div>
          ) : (
            categories.map((category) => (
              <div key={category} className="mb-4 last:mb-1">
                <h3 className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  {category}
                </h3>
                <div className="space-y-0.5">
                  {filteredItems
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={item.action}
                          className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                            <span>{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.shortcut ? (
                              <div className="flex gap-0.5">
                                {item.shortcut.map((key, i) => (
                                  <kbd
                                    key={i}
                                    className="bg-[#1c1c1f] px-1.5 py-0.5 border border-[#27272A] rounded text-[10px] text-zinc-400 font-mono"
                                  >
                                    {key}
                                  </kbd>
                                ))}
                              </div>
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#27272A] bg-[#0c0c0d]/60 px-4 py-2 text-[10px] text-zinc-500">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <kbd className="bg-[#1c1c1f] px-1 rounded text-zinc-400 font-mono">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-[#1c1c1f] px-1 rounded text-zinc-400 font-mono">↵</kbd> Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3 text-zinc-400" />
            <kbd className="bg-[#1c1c1f] px-1 rounded text-zinc-400 font-mono">K</kbd> to toggle
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
