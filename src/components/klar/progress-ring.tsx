"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({
  percentage,
  size = 160,
  strokeWidth = 12,
  label,
}: ProgressRingProps) {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const rafRef = useRef<number>(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercent / 100) * circumference;

  useEffect(() => {
    let current = animatedPercent;
    const target = percentage;
    if (current === target) return;

    let lastTime = 0;
    const tick = (time: number) => {
      if (time - lastTime >= 15) {
        lastTime = time;
        current += current < target ? 1 : -1;
        setAnimatedPercent(current);
        if (current === target) return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="font-bold text-klar-primary"
          style={{ fontSize: Math.max(10, size * 0.18) }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          {animatedPercent}%
        </motion.span>
        {label && (
          <span className="text-muted-foreground" style={{ fontSize: Math.max(8, size * 0.08), marginTop: 2 }}>{label}</span>
        )}
      </div>
    </div>
  );
}
