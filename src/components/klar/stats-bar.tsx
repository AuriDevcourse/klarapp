"use client";

import { useState } from "react";
import { Flame, Star, Shield, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState, getLevel, getLevelProgress, getLast5Days } from "@/lib/game-state";

export function StatsBar() {
  const { state } = useGameState();
  const level = getLevel(state.xp);
  const progress = getLevelProgress(state.xp);
  const [open, setOpen] = useState(false);
  const last5 = getLast5Days(state.activeDays);

  return (
    <div className="px-5 pt-14 pb-2">
      <motion.div
        className="flex items-center justify-end"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            state.streak > 0 ? "bg-orange-100 text-orange-600" : "bg-muted text-muted-foreground"
          }`}
        >
          <Flame size={16} className={state.streak > 0 ? "fill-orange-500 text-orange-500" : ""} />
          <span>{state.streak}</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mt-2 bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          >
            <div className="p-4">
              {/* Streak header */}
              <div className="flex items-center gap-2 mb-3">
                <Flame size={18} className="fill-orange-500 text-orange-500" />
                <p className="text-sm font-bold text-foreground">{state.streak} day streak</p>
              </div>

              {/* Last 5 days */}
              <div className="flex items-center justify-between mb-4">
                {last5.map((day) => (
                  <div key={day.date} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      day.active
                        ? "bg-orange-100"
                        : "bg-muted"
                    }`}>
                      <Flame
                        size={16}
                        className={day.active
                          ? "fill-orange-500 text-orange-500"
                          : "text-muted-foreground/40"
                        }
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{day.dayLabel}</span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Flame size={12} className="text-orange-500" />
                    <span className="text-sm font-bold text-foreground">{state.maxStreak}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Max streak</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-amber-500 text-amber-500" />
                    <span className="text-sm font-bold text-foreground">{state.xp}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Total XP</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} className="text-klar-primary" />
                    <span className="text-sm font-bold text-foreground">{state.lessonsCompleted.length}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Lessons</span>
                </div>
              </div>

              {/* Level progress */}
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1">
                    <Shield size={12} className="text-klar-primary" />
                    <span className="text-xs font-semibold text-foreground">Level {level.level}, {level.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {level.maxXp === Infinity
                      ? "Max level"
                      : `${level.maxXp - state.xp + 1} XP to next`}
                  </span>
                </div>
                <div className="w-full h-2 bg-border/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-klar-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
