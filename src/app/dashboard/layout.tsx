"use client";

import React from "react";
import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { CommandMenu } from "@/components/common/CommandMenu";
import { motion } from "framer-motion";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen flex bg-[#09090B] text-[#FAFAFA] antialiased">
      {/* Floating Sidebar */}
      <Sidebar />

      {/* Main Panel wrapper */}
      <motion.div
        animate={{
          paddingLeft: collapsed ? "100px" : "280px",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col flex-1 min-w-0 pr-4 pt-4 pb-4 transition-all"
      >
        <div className="flex flex-col flex-1 bg-[#111113]/30 border border-[#27272A] rounded-2xl overflow-hidden min-h-[calc(100vh-32px)] backdrop-blur-xs">
          {/* Header/Navbar */}
          <Navbar />

          {/* Inner Content scroll pane */}
          <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {children}
          </main>
        </div>
      </motion.div>

      {/* Global Command Palette */}
      <CommandMenu />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
