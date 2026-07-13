"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bot, Send, Sparkles, ChevronRight, User, Cpu, Terminal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function AiInsightsPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Hello! I am the FutGraph AI Neural Engine. Ask me any questions about tactical setups, pressing patterns, player heatmaps, or squad matchups.",
      timestamp: "10:30 AM",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Analyze Haaland's shooting efficiency from xG timeline",
    "How does Man City bypass a high 4-4-2 press?",
    "Compare Mbappé and Haaland attributes radar",
    "Identify weak zones in Arsenal's rest defense",
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const simulateAiResponse = (userPrompt: string) => {
    setIsTyping(true);
    setTimeout(() => {
      let aiText = "";
      if (userPrompt.toLowerCase().includes("haaland")) {
        aiText = `### Erling Haaland - Tactical Profile Analysis
Based on current telemetry, Haaland exhibits extreme shot-conversion efficiency:
- **xG Overperformance**: Haaland has converted **28% more low-probability chances** (xG < 0.12) than league average.
- **Shot Selection**: 82% of his shots occur in the 'Golden Zone' (central area of the penalty box).
- **Recommendation**: To limit his threat, block the low cross-key channels (half-space cutbacks) and deploy a physical defender to deny him early chest-down control in transitions.`;
      } else if (userPrompt.toLowerCase().includes("press")) {
        aiText = `### Bypassing a 4-4-2 Mid-Block Press
Modern teams (e.g. Manchester City) bypass a structured 4-4-2 mid-block using these mechanisms:
- **Inverted Center-Back / Double Pivot**: John Stones steps up into midfield alongside Rodri to form a 3-2 box structure, creating a 3v2 overload against the opponents' central midfielders.
- **Winger Width Locking**: Staying high and wide forces opposition fullbacks to widen, opening vertical passing corridors directly into the half-spaces for De Bruyne and Foden.
- **Third Man Runs**: Bouncing the ball from pivot to fullback and playing it first-time into the central pocket.`;
      } else if (userPrompt.toLowerCase().includes("radar") || userPrompt.toLowerCase().includes("mbappé")) {
        aiText = `### Mbappé vs Haaland: Radar Breakdown
Our spatial profiles suggest a massive tactical divergence:
- **Kylian Mbappé**: Relies on wing isolation, 1v1 dribbles (9.2 dribbles/90), and high-velocity progressive carries. Plays as a left-inside forward moving inside.
- **Erling Haaland**: Relies on box occupation, physical screen plays, and rapid final-third burst runs. Strictly operates as a vertical focus point.
- **Strategic Verdict**: Play Mbappé when attacking a low-block that requires individual dribble breaks; play Haaland to exploit space behind high lines.`;
      } else {
        aiText = `### Match Analytics Assessment
I have processed the match data. Here are the core insights:
- **Pressing Trigger**: The opponent triggers their press when the left center-back receives the ball with back to goal.
- **Vertical Spacing**: There is a 12-meter gap between the opponent's midfield and defensive lines during transitions.
- **Recommendation**: Deploy rapid vertical runs through the half-spaces during turnovers to exploit this gap.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-ai-${Date.now()}`,
          sender: "ai",
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `m-user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    simulateAiResponse(textToSend);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            AI Tactical Engine <Bot className="w-5 h-5 text-blue-500" />
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Query our natural language neural parser for advanced team matchups and tactical adjustments.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 bg-[#111113] border border-[#27272A] px-3 py-1.5 rounded-xl font-mono">
          <Terminal className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          <span>llm-model: gemini-3.5-flash</span>
        </div>
      </div>

      {/* Main Terminal Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Suggested Queries Side Bar */}
        <div className="lg:col-span-1 bg-[#111113] border border-[#27272A] rounded-2xl p-5 flex flex-col justify-between hidden lg:flex">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Suggested Prompts</span>
            </h3>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-3 rounded-xl border border-[#27272A] bg-[#141416]/50 hover:bg-white/5 hover:border-zinc-700 text-xs text-zinc-400 hover:text-white transition-all flex items-start gap-2 cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-500 group-hover:text-white mt-0.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-3 bg-zinc-900/50 border border-[#27272A] rounded-xl text-[10px] text-zinc-500 font-mono">
            💡 Custom instructions can be modified in dashboard settings.
          </div>
        </div>

        {/* Chat Terminal Area */}
        <div className="lg:col-span-3 bg-[#111113] border border-[#27272A] rounded-2xl flex flex-col min-h-0 justify-between overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-60" />

          {/* Messages Panel */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((m) => {
              const isAi = m.sender === "ai";
              return (
                <div
                  key={m.id}
                  className={`flex gap-4 ${isAi ? "justify-start" : "justify-end"}`}
                >
                  {isAi && (
                    <Avatar className="w-8 h-8 border border-blue-500/20 bg-blue-500/5 text-blue-400 shrink-0">
                      <AvatarFallback className="bg-blue-600/10 text-blue-400">
                        <Cpu className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                      isAi
                        ? "bg-zinc-900/40 border-[#27272A] text-zinc-300 font-sans"
                        : "bg-blue-600/10 border-blue-500/20 text-white font-sans"
                    }`}
                  >
                    {/* Render formatting placeholders simply */}
                    <div className="whitespace-pre-line prose prose-invert max-w-none prose-sm">
                      {m.text}
                    </div>
                    <div className="text-[9px] text-zinc-600 text-right mt-1.5 font-mono">
                      {m.timestamp}
                    </div>
                  </div>

                  {!isAi && (
                    <Avatar className="w-8 h-8 border border-zinc-700 bg-zinc-800 shrink-0">
                      <AvatarFallback className="text-zinc-300 text-[10px] font-bold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-4 justify-start">
                <Avatar className="w-8 h-8 border border-blue-500/20 bg-blue-500/5 text-blue-400 shrink-0 animate-pulse">
                  <AvatarFallback className="bg-blue-600/10 text-blue-400">
                    <Cpu className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-zinc-900/40 border-[#27272A] rounded-2xl px-4 py-3 border text-zinc-500 text-xs flex items-center gap-1.5 font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                  <span>neural parser analyzing tactical zones...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Form Input Action Panel */}
          <div className="border-t border-[#27272A] bg-zinc-900/10 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                className="w-full bg-[#141416]/80 border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                placeholder="Ask AI for tactical recommendations (e.g. 'How does Man City press?')"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="p-3 bg-white text-black hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
