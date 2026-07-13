"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface StatsCounterProps {
  value: number;
  suffix?: string;
}

export function StatsCounter({ value, suffix = "" }: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix]);

  return (
    <span ref={ref} className="font-semibold tracking-tight tabular-nums">
      0{suffix}
    </span>
  );
}
