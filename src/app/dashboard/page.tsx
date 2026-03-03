"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Droplets,
  ChevronRight,
  Flame,
  Star,
  BookOpen,
  Target,
  Check,
} from "lucide-react";
import { ProgressRing } from "@/components/klar/progress-ring";
import { StatsBar } from "@/components/klar/stats-bar";
import { BottomNav } from "@/components/klar/bottom-nav";
import { useGameState } from "@/lib/game-state";

const currentLesson = {
  id: "floods-01",
  title: "Flooding",
  subtitle: "Cloudbursts, storm surges & climate risks",
  icon: Droplets,
  iconColor: "#3b82f6",
  iconBg: "#eff6ff",
  duration: 15,
  totalSteps: 10,
  completedSteps: 0,
  xpReward: 50,
};

export default function DashboardPage() {
  const Icon = currentLesson.icon;
  const { state } = useGameState();
  const router = useRouter();
  const [isDiving, setIsDiving] = useState(false);

  const handleContinue = () => {
    setIsDiving(true);
    setTimeout(() => {
      router.push(`/lesson/${currentLesson.id}`);
    }, 350);
  };

  const dailyDone = state.dailyGoal.completed >= state.dailyGoal.target;
  const dailyPercent = Math.min(
    100,
    Math.round((state.dailyGoal.completed / state.dailyGoal.target) * 100)
  );

  return (
    <motion.div
      className="min-h-dvh bg-transparent pb-24"
      animate={isDiving ? { scale: 1.15, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeIn" }}
    >
      <StatsBar />

      {/* Welcome */}
      <motion.div
        className="px-5 pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h1 className="text-xl font-bold text-foreground">Welcome, Auri</h1>
        <p className="text-sm text-muted-foreground">Get ready for anything</p>
      </motion.div>

      {/* Daily Goal */}
      <motion.section
        className="px-5 py-3"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 to-indigo-500">
          <div className="bg-white rounded-[14px] p-4 flex items-center gap-4">
            <ProgressRing
              percentage={dailyPercent}
              size={64}
              strokeWidth={5}
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Target size={14} className="text-klar-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Daily Goal
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {dailyDone
                  ? "Goal complete! Great work today"
                  : `Complete ${state.dailyGoal.target} lesson today`}
              </p>
            </div>
            {dailyDone && (
              <div className="w-8 h-8 rounded-full bg-klar-success flex items-center justify-center">
                <Check size={18} className="text-white" />
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Continue Lesson */}
      <motion.section
        className="px-5 pt-1"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="text-lg font-bold text-foreground mb-3">Continue</h2>

        <div onClick={handleContinue} className="cursor-pointer">
          <motion.div
            className="bg-white rounded-2xl p-5 shadow-sm border border-border/50"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: currentLesson.iconBg }}
              >
                <Icon size={28} style={{ color: currentLesson.iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">
                    {currentLesson.title}
                  </h3>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">
                    +{currentLesson.xpReward} XP
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentLesson.subtitle}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-end mb-1.5">
                <span className="text-[11px] text-muted-foreground">
                  {currentLesson.completedSteps}/{currentLesson.totalSteps}{" "}
                  steps
                </span>
              </div>
              <div className="w-full h-2 bg-border/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-klar-primary rounded-full transition-all"
                  style={{
                    width: `${(currentLesson.completedSteps / currentLesson.totalSteps) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full h-11 rounded-xl bg-klar-primary flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.15)] relative overflow-hidden">
                <span className="text-white font-semibold text-sm relative z-10">
                  Continue lesson
                </span>
                <div className="absolute inset-0 shimmer-btn" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        className="px-5 pt-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-border/50 flex flex-col items-center">
            <BookOpen size={18} className="text-klar-primary mb-1" />
            <span className="text-lg font-bold text-foreground">
              {state.lessonsCompleted.length}
            </span>
            <span className="text-[10px] text-muted-foreground">Lessons</span>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-border/50 flex flex-col items-center">
            <Star
              size={18}
              className="text-amber-500 fill-amber-500 mb-1"
            />
            <span className="text-lg font-bold text-foreground">
              {state.xp}
            </span>
            <span className="text-[10px] text-muted-foreground">Total XP</span>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-border/50 flex flex-col items-center">
            <Flame
              size={18}
              className="text-orange-500 fill-orange-500 mb-1"
            />
            <span className="text-lg font-bold text-foreground">
              {state.streak}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Day streak
            </span>
          </div>
        </div>
      </motion.section>

      {/* View all lessons */}
      <motion.section
        className="px-5 pt-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Link href="/lessons">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/50 flex items-center justify-between active:scale-[0.98] transition-transform">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                View all lessons
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Browse your learning path
              </p>
            </div>
            <ChevronRight
              size={20}
              className="text-muted-foreground shrink-0"
            />
          </div>
        </Link>
      </motion.section>

      <BottomNav />
    </motion.div>
  );
}
