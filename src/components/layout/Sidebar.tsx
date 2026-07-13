"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  User,
  BarChart3,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
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
import { useSidebar } from "./SidebarContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  const mainNav: SidebarItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Teams", href: "/dashboard/teams", icon: Users },
    { name: "Players", href: "/dashboard/players", icon: User },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "AI Insights", href: "/dashboard/ai", icon: Bot, badge: "Beta" },
  ];

  const bottomNav: SidebarItem[] = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-4 left-4 bottom-4 z-40 flex flex-col justify-between",
        "bg-[#111113]/70 border border-[#27272A] rounded-2xl py-6 px-3",
        "backdrop-blur-md shadow-xl select-none"
      )}
    >
      {/* Top Header / Logo */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-2">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 shrink-0 shadow-lg shadow-blue-500/10">
              <TrendingUp className="w-5 h-5" />
              <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-bold tracking-tight text-white text-base"
              >
                FutGraph <span className="text-blue-500">AI</span>
              </motion.span>
            )}
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="relative block">
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "text-white bg-white/5 border border-white/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-blue-400" : "text-zinc-400 group-hover:text-white")} />
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between w-full"
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono font-semibold tracking-wider uppercase border border-blue-500/20">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                  {collapsed && (
                    <div className="absolute left-14 bg-[#111113] border border-[#27272A] text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50 whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions & User Profile */}
      <div className="flex flex-col gap-4">
        {/* Bottom Nav Links */}
        <div className="flex flex-col gap-1">
          {bottomNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="relative block">
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "text-white bg-white/5 border border-white/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                  {collapsed && (
                    <div className="absolute left-14 bg-[#111113] border border-[#27272A] text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50 whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block"
          >
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
              <GithubIcon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>GitHub</span>}
              {collapsed && (
                <div className="absolute left-14 bg-[#111113] border border-[#27272A] text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50 whitespace-nowrap">
                  GitHub
                </div>
              )}
            </div>
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#27272A] mx-2" />

        {/* User Card */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="w-9 h-9 border border-[#27272A] shrink-0">
              <AvatarImage src="/avatar-placeholder.png" alt="User Profile" />
              <AvatarFallback className="bg-zinc-800 text-zinc-300 font-semibold text-xs">
                JD
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col min-w-0 text-left"
              >
                <span className="text-sm font-medium text-white truncate">John Doe</span>
                <span className="text-[10px] text-zinc-500 truncate">john@futgraph.ai</span>
              </motion.div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={toggle}
              className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            onClick={toggle}
            className="flex justify-center py-2.5 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
