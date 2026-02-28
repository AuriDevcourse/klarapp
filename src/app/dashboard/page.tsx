"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Droplets,
  Clock,
  ChevronRight,
  Zap,
} from "lucide-react";
import { ProgressRing } from "@/components/klar/progress-ring";
import { BottomNav } from "@/components/klar/bottom-nav";

// Current lesson the user left off on
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
};

export default function DashboardPage() {
  const Icon = currentLesson.icon;

  return (
    <div className="min-h-dvh bg-klar-bg pb-24">
      {/* Header */}
      <motion.header
        className="px-5 pt-14 pb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-klar-primary flex items-center justify-center shadow-sm">
              <Image src="/logo/Klariconwhite.svg" alt="Klar" width={22} height={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Welcome, Arun
              </h1>
              <p className="text-sm text-muted-foreground">Get ready for anything</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-klar-accent/20 px-2.5 py-1.5 rounded-full">
            <Zap size={16} className="text-klar-warning fill-klar-warning" />
            <span className="text-sm font-bold text-klar-primary">3</span>
          </div>
        </div>
      </motion.header>

      {/* Your Level */}
      <motion.section
        className="px-5 py-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex items-center gap-6">
          <ProgressRing percentage={42} size={120} label="Level 3" />
          <div className="flex-1">
            <h2 className="font-semibold text-foreground mb-1">
              Your Level
            </h2>
            <p className="text-sm text-muted-foreground">
              Complete lessons to level up your preparedness
            </p>
          </div>
        </div>
      </motion.section>

      {/* Continue where you left off */}
      <motion.section
        className="px-5 pt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-lg font-bold text-foreground mb-3">
          Continue
        </h2>

        <Link href={`/lesson/${currentLesson.id}`}>
          <motion.div
            className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 active:scale-[0.98]"
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
                <h3 className="font-semibold text-foreground">
                  {currentLesson.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentLesson.subtitle}
                </p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground shrink-0" />
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">
                    {currentLesson.duration} min
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {currentLesson.completedSteps}/{currentLesson.totalSteps} steps
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
              <div className="w-full h-11 rounded-xl bg-klar-primary flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Continue lesson</span>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.section>

      <BottomNav />
    </div>
  );
}
