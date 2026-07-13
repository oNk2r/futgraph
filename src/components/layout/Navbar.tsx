"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Bell, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const pathname = usePathname();

  // Helper to split pathname and generate breadcrumbs
  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    return parts.map((part, index) => {
      const href = "/" + parts.slice(0, index + 1).join("/");
      const name = part.charAt(0).toUpperCase() + part.slice(1);
      return { name: name === "Ai" ? "AI Insights" : name, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  const handleSearchClick = () => {
    const event = new CustomEvent("open-command-menu");
    window.dispatchEvent(event);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#27272A] bg-[#09090B]/60 backdrop-blur-md px-6 shadow-sm select-none">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/dashboard"
          className="text-zinc-500 hover:text-white transition-colors font-medium"
        >
          FutGraph
        </Link>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.href}>
            <span className="text-zinc-600">/</span>
            <Link
              href={crumb.href}
              className={
                idx === breadcrumbs.length - 1
                  ? "text-white font-medium pointer-events-none"
                  : "text-zinc-500 hover:text-white transition-colors font-medium"
              }
            >
              {crumb.name}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Raycast-style Search Input Trigger */}
        <button
          onClick={handleSearchClick}
          className="hidden md:flex items-center justify-between w-64 h-9 px-3 text-left rounded-xl bg-[#111113]/60 border border-[#27272A] text-zinc-500 hover:text-zinc-400 hover:border-zinc-700 transition-all text-xs cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-400" />
            <span>Search or command...</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 bg-[#1c1c1f] px-1.5 py-0.5 border border-[#27272A] rounded-md text-[9px] text-zinc-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Small screen Search Button */}
        <button
          onClick={handleSearchClick}
          className="flex md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
        >
          <Search className="w-4.5 h-4.5" />
        </button>

        {/* Dark Mode Icon (Disabled/Static Indicator) */}
        <div className="p-2 text-zinc-500 bg-[#111113]/40 border border-[#27272A] rounded-xl cursor-not-allowed">
          <Moon className="w-4.5 h-4.5" />
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#27272A] rounded-xl transition-all cursor-pointer">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#09090B] animate-pulse" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#27272A]" />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
            <Avatar className="w-9 h-9 border border-[#27272A] hover:border-zinc-600 transition-colors">
              <AvatarImage src="/avatar-placeholder.png" alt="Profile" />
              <AvatarFallback className="bg-zinc-800 text-zinc-300 font-medium text-xs">
                JD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#111113] border border-[#27272A] rounded-xl text-zinc-300 shadow-2xl p-1"
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-zinc-500">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#27272A]" />
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 hover:bg-white/5 hover:text-white rounded-lg text-sm cursor-pointer">
              Profile Details
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 hover:bg-white/5 hover:text-white rounded-lg text-sm cursor-pointer">
              Billing & Subscription
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 hover:bg-white/5 hover:text-white rounded-lg text-sm cursor-pointer">
              Integrations
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#27272A]" />
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-sm cursor-pointer text-red-500">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
