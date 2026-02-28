"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { House, BookOpen, Package, Bot } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { id: "home", href: "/dashboard", icon: House, label: "Home", match: "/dashboard" },
  { id: "lessons", href: "/lessons", icon: BookOpen, label: "Lessons", match: "/lessons" },
  { id: "kit", href: "/kit", icon: Package, label: "My Kit", match: "/kit" },
  { id: "agent", href: "/agent", icon: Bot, label: "AI Agent", match: "/agent" },
];

function getActiveId(pathname: string): string {
  if (pathname === "/lessons" || pathname.startsWith("/lesson/")) return "lessons";
  if (pathname === "/kit") return "kit";
  if (pathname === "/agent") return "agent";
  return "home";
}

export function BottomNav() {
  const pathname = usePathname();
  const activeId = getActiveId(pathname);

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-[430px]">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-border/50 px-2 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-klar-primary rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                size={20}
                className={`relative z-10 ${
                  isActive ? "text-white" : "text-muted-foreground"
                }`}
              />
              <span
                className={`relative z-10 text-[10px] font-medium ${
                  isActive ? "text-white" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
