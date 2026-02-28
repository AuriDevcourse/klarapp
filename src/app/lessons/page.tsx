"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useAnimation, type PanInfo } from "framer-motion";
import Link from "next/link";
import {
  Droplets,
  Package,
  AlertTriangle,
  Radio,
} from "lucide-react";
import dynamic from "next/dynamic";
import { BottomNav } from "@/components/klar/bottom-nav";
import diverAnim from "@/animations/diver.json";

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
    totalSteps: 10,
    completedSteps: 3,
    lottie: diverAnim,
  },
  {
    id: "kit-72h-01",
    title: "72-Hour Emergency Kit",
    subtitle: "Build your personalized preparedness kit",
    icon: Package,
    iconColor: "#22c55e",
    iconBg: "#f0fdf4",
    duration: 12,
    totalSteps: 10,
    completedSteps: 0,
  },
  {
    id: "sirens-01",
    title: "Sirens & Warnings",
    subtitle: "Understand Denmark's alert systems",
    icon: AlertTriangle,
    iconColor: "#f59e0b",
    iconBg: "#fffbeb",
    duration: 10,
    totalSteps: 8,
    completedSteps: 0,
    locked: true,
  },
  {
    id: "blackout-01",
    title: "Power Outage",
    subtitle: "Survive without electricity",
    icon: Radio,
    iconColor: "#ef4444",
    iconBg: "#fef2f2",
    duration: 12,
    totalSteps: 8,
    completedSteps: 0,
    locked: true,
  },
];

export default function LessonsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const swipeThreshold = 50;

  const snapTo = (index: number) => {
    const width = containerRef.current?.offsetWidth ?? 0;
    controls.start({ x: -index * width, transition: { type: "spring", stiffness: 300, damping: 30 } });
    setCurrentIndex(index);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const width = containerRef.current?.offsetWidth ?? 0;
    let newIndex = currentIndex;
    if (info.offset.x < -swipeThreshold && currentIndex < lessons.length - 1) {
      newIndex = currentIndex + 1;
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }
    snapTo(newIndex);
  };

  return (
    <div className="h-dvh bg-klar-bg flex flex-col">
      <motion.header
        className="px-5 pt-14 pb-2 shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-xl font-bold text-foreground">Lessons</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Swipe to explore all topics
        </p>
      </motion.header>

      {/* Carousel fills remaining space */}
      <div className="flex-1 flex flex-col min-h-0 pb-24">
        <div ref={containerRef} className="relative overflow-hidden flex-1">
          <motion.div
            className="flex h-full"
            style={{ x }}
            animate={controls}
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            {lessons.map((lesson) => (
              <div key={lesson.id} className="w-full shrink-0 px-5 h-full">
                <LessonCard lesson={lesson} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 pt-4 shrink-0">
          {lessons.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => snapTo(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-klar-primary w-6"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function LessonCard({ lesson }: { lesson: (typeof lessons)[number] }) {
  const Icon = lesson.icon;
  const isLocked = "locked" in lesson && lesson.locked;

  if (isLocked) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex flex-col items-center justify-center text-center h-full opacity-60">
        <div
          className="w-20 h-20 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: lesson.iconBg }}
        >
          <Icon size={36} style={{ color: lesson.iconColor }} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          {lesson.title}
        </h3>
        <span className="text-sm text-muted-foreground mt-1">Coming soon</span>
      </div>
    );
  }

  const hasLottie = "lottie" in lesson && lesson.lottie;

  const progress = Math.round((lesson.completedSteps / lesson.totalSteps) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex flex-col items-center text-center h-full">
      {/* Title at top */}
      <h3 className="text-xl font-bold text-foreground shrink-0">
        {lesson.title}
      </h3>
      <p className="text-sm text-muted-foreground mt-1 shrink-0">
        {lesson.subtitle}
      </p>

      {/* Icon/Lottie centered, taking ~40% of space */}
      <div className="flex-1 flex items-center justify-center">
        {hasLottie ? (
          <div className="w-[60%] aspect-square">
            <Lottie animationData={lesson.lottie} loop autoplay />
          </div>
        ) : (
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: lesson.iconBg }}
          >
            <Icon size={48} style={{ color: lesson.iconColor }} />
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full shrink-0 mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium text-foreground">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-border/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-klar-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Continue button pinned to bottom */}
      <Link href={`/lesson/${lesson.id}`} className="w-full shrink-0">
        <div className="w-full h-12 rounded-xl bg-klar-primary flex items-center justify-center active:scale-[0.97] transition-transform">
          <span className="text-white font-semibold">Continue</span>
        </div>
      </Link>
    </div>
  );
}
