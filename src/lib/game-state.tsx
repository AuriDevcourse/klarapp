"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

// --- Types ---

export interface GameState {
  xp: number;
  streak: number;
  maxStreak: number;
  activeDays: string[]; // ISO date strings of days with activity
  lastActiveDate: string; // "YYYY-MM-DD"
  lessonsCompleted: string[];
  dailyGoal: { target: number; completed: number };
  lessonProgress: Record<string, { currentStep: number; score: number }>;
}

export interface LevelInfo {
  level: number;
  name: string;
  minXp: number;
  maxXp: number;
}

// --- Level thresholds ---

const LEVELS: LevelInfo[] = [
  { level: 1, name: "Novice", minXp: 0, maxXp: 99 },
  { level: 2, name: "Aware", minXp: 100, maxXp: 299 },
  { level: 3, name: "Prepared", minXp: 300, maxXp: 599 },
  { level: 4, name: "Resilient", minXp: 600, maxXp: 999 },
  { level: 5, name: "Expert", minXp: 1000, maxXp: Infinity },
];

// --- Helpers ---

export function getLevel(xp: number): LevelInfo {
  return LEVELS.find((l) => xp >= l.minXp && xp <= l.maxXp) ?? LEVELS[0];
}

export function getLevelProgress(xp: number): number {
  const level = getLevel(xp);
  if (level.maxXp === Infinity) return 100;
  const range = level.maxXp - level.minXp + 1;
  return Math.min(100, Math.round(((xp - level.minXp) / range) * 100));
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function getLast5Days(activeDays: string[]): { date: string; dayLabel: string; active: boolean }[] {
  const today = new Date(getTodayString());
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (4 - i)); // oldest first
    const dateStr = d.toISOString().split("T")[0];
    const dayLabel = i === 4
      ? "Today"
      : d.toLocaleDateString("en", { weekday: "short" });
    return { date: dateStr, dayLabel, active: activeDays.includes(dateStr) };
  });
}

export function isStreakActive(lastActiveDate: string): boolean {
  const today = new Date(getTodayString());
  const last = new Date(lastActiveDate);
  const diff = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 1;
}

// --- Default state ---

function getRecentDemoActiveDays(): string[] {
  const today = new Date(getTodayString());
  // Active 3 of last 5 days (today, yesterday, 2 days ago)
  return [0, 1, 2].map((d) => {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    return date.toISOString().split("T")[0];
  });
}

const DEFAULT_STATE: GameState = {
  xp: 210,
  streak: 3,
  maxStreak: 5,
  activeDays: getRecentDemoActiveDays(),
  lastActiveDate: getTodayString(),
  lessonsCompleted: [],
  dailyGoal: { target: 1, completed: 0 },
  lessonProgress: {},
};

// --- localStorage persistence ---

const STORAGE_KEY = "klar-game-state";

function loadState(): GameState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently fail
  }
}

// --- Context ---

interface GameContextValue {
  state: GameState;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string, xpEarned: number) => void;
  updateProgress: (lessonId: string, step: number, score: number) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadState();
    // Check if streak is broken
    if (!isStreakActive(saved.lastActiveDate)) {
      saved.streak = 0;
    }
    // Reset daily goal if it's a new day
    if (saved.lastActiveDate !== getTodayString()) {
      saved.dailyGoal = { target: 1, completed: 0 };
    }
    saved.lastActiveDate = getTodayString();
    setState(saved);
    saveState(saved);
    setHydrated(true);
  }, []);

  const addXp = useCallback((amount: number) => {
    setState((prev) => {
      const next = { ...prev, xp: prev.xp + amount };
      saveState(next);
      return next;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, xpEarned: number) => {
    setState((prev) => {
      if (prev.lessonsCompleted.includes(lessonId)) return prev;
      const today = getTodayString();
      const newStreak = prev.streak + (prev.dailyGoal.completed === 0 ? 1 : 0);
      const activeDays = prev.activeDays.includes(today)
        ? prev.activeDays
        : [today, ...prev.activeDays];
      const next: GameState = {
        ...prev,
        xp: prev.xp + xpEarned,
        lessonsCompleted: [...prev.lessonsCompleted, lessonId],
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        activeDays,
        dailyGoal: {
          ...prev.dailyGoal,
          completed: prev.dailyGoal.completed + 1,
        },
        lastActiveDate: today,
      };
      saveState(next);
      return next;
    });
  }, []);

  const updateProgress = useCallback((lessonId: string, step: number, score: number) => {
    setState((prev) => {
      const next: GameState = {
        ...prev,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: { currentStep: step, score },
        },
      };
      saveState(next);
      return next;
    });
  }, []);

  // Avoid hydration mismatch — render children only after client hydration
  if (!hydrated) {
    return <>{children}</>;
  }

  return (
    <GameContext.Provider value={{ state, addXp, completeLesson, updateProgress }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameState(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    // Return a safe fallback for components rendered before hydration
    return {
      state: DEFAULT_STATE,
      addXp: () => {},
      completeLesson: () => {},
      updateProgress: () => {},
    };
  }
  return ctx;
}
