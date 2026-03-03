"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Droplets,
  Package,
  AlertTriangle,
  Radio,
  Check,
  Lock,
} from "lucide-react";
import dynamic from "next/dynamic";
import { StatsBar } from "@/components/klar/stats-bar";
import { BottomNav } from "@/components/klar/bottom-nav";
import { useGameState } from "@/lib/game-state";
import diverAnim from "@/animations/diver.json";
import supplyChainAnim from "@/animations/supply-chain.json";
import megaphoneAnim from "@/animations/megaphone.json";
import powerPlugsAnim from "@/animations/power-plugs.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const lessons = [
  {
    id: "floods-01",
    title: "Flooding",
    subtitle: "Cloudbursts, storm surges & climate risks",
    icon: Droplets,
    iconColor: "#3b82f6",
    iconBg: "#eff6ff",
    duration: 15,
    xpReward: 50,
    lottie: diverAnim,
  },
  {
    id: "kit-72h-01",
    title: "72-Hour Kit",
    subtitle: "Build your preparedness kit",
    icon: Package,
    iconColor: "#22c55e",
    iconBg: "#f0fdf4",
    duration: 12,
    xpReward: 50,
    lottie: supplyChainAnim,
  },
  {
    id: "sirens-01",
    title: "Sirens & Warnings",
    subtitle: "Denmark's alert systems",
    icon: AlertTriangle,
    iconColor: "#f59e0b",
    iconBg: "#fffbeb",
    duration: 10,
    xpReward: 40,
    lottie: megaphoneAnim,
  },
  {
    id: "blackout-01",
    title: "Power Outage",
    subtitle: "Survive without electricity",
    icon: Radio,
    iconColor: "#ef4444",
    iconBg: "#fef2f2",
    duration: 12,
    xpReward: 40,
    lottie: powerPlugsAnim,
  },
];

type NodeStatus = "completed" | "current" | "locked";

function getNodeStatus(
  index: number,
  completedIds: string[]
): NodeStatus {
  const lesson = lessons[index];
  if (completedIds.includes(lesson.id)) return "completed";
  // First incomplete lesson is current
  if (index === 0) return "current";
  if (completedIds.includes(lessons[index - 1].id)) return "current";
  return "locked";
}

export default function LessonsPage() {
  const { state } = useGameState();

  return (
    <div className="min-h-dvh bg-transparent pb-24">
      <StatsBar />

      <motion.header
        className="px-5 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h1 className="text-xl font-bold text-foreground">Learning Path</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Complete lessons to level up
        </p>
      </motion.header>

      {/* Vertical path */}
      <div className="px-5 pb-8">
        {lessons.map((lesson, i) => {
          const status = getNodeStatus(i, state.lessonsCompleted);
          const isLast = i === lessons.length - 1;

          return (
            <motion.div
              key={lesson.id}
              className="flex gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 + i * 0.05 }}
            >
              {/* Node column: circle + line */}
              <div className="flex flex-col items-center shrink-0">
                <PathNode
                  status={status}
                  icon={lesson.icon}
                  iconColor={lesson.iconColor}
                />
                {!isLast && (
                  <div className="w-0.5 flex-1 min-h-4 bg-border" />
                )}
              </div>

              {/* Info card */}
              <div className="flex-1 pb-3">
                <LessonCard lesson={lesson} status={status} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}

function PathNode({
  status,
  icon: Icon,
  iconColor,
}: {
  status: NodeStatus;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
}) {
  if (status === "completed") {
    return (
      <div className="w-14 h-14 rounded-full bg-klar-success flex items-center justify-center shrink-0 shadow-md">
        <Check size={24} className="text-white" />
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className="w-14 h-14 rounded-full bg-klar-primary flex items-center justify-center shrink-0 shadow-lg">
        <Icon size={24} className="text-white" />
      </div>
    );
  }

  // locked
  return (
    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center shrink-0 opacity-50">
      <Lock size={20} className="text-muted-foreground" />
    </div>
  );
}

function LessonCard({
  lesson,
  status,
}: {
  lesson: (typeof lessons)[number];
  status: NodeStatus;
}) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  const card = (
    <motion.div
      className={`flex-1 bg-white rounded-xl p-4 shadow-sm border border-border/50 ${
        isLocked ? "opacity-50" : ""
      } ${!isLocked ? "active:scale-[0.98]" : ""}`}
      whileTap={!isLocked ? { scale: 0.98 } : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground text-sm">
              {lesson.title}
            </h3>
            {!isLocked && (
              <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                +{lesson.xpReward} XP
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {lesson.subtitle}
          </p>
          <div className="flex items-center gap-2 mt-2">
            {isCompleted && (
              <span className="text-[10px] font-semibold text-klar-success bg-green-50 px-2 py-0.5 rounded-full">
                Completed
              </span>
            )}
            {status === "current" && (
              <span className="text-[10px] font-semibold text-klar-primary bg-blue-50 px-2 py-0.5 rounded-full">
                Start
              </span>
            )}
            {isLocked && (
              <span className="text-[10px] text-muted-foreground">
                Coming soon
              </span>
            )}
          </div>
        </div>

        {/* Small Lottie decoration */}
        <div className="w-12 h-12 shrink-0 ml-2">
          <Lottie animationData={lesson.lottie} loop autoplay />
        </div>
      </div>
    </motion.div>
  );

  if (isLocked) return card;

  return <Link href={`/lesson/${lesson.id}`} className="flex-1">{card}</Link>;
}
