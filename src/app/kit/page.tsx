"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Flashlight,
  Radio,
  Heart,
  Users,
  PawPrint,
  Check,
  ChevronLeft,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/klar/bottom-nav";
import { ProgressRing } from "@/components/klar/progress-ring";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  Droplets,
  Flashlight,
  Radio,
  Heart,
};

interface KitItem {
  id: string;
  label: string;
  quantity: string;
  essential: boolean;
  category: string;
}

const defaultKit: KitItem[] = [
  { id: "water", label: "Drinking water", quantity: "18L", essential: true, category: "Water & Food" },
  { id: "canned", label: "Canned food", quantity: "12 cans", essential: true, category: "Water & Food" },
  { id: "can-opener", label: "Manual can opener", quantity: "1 pc", essential: true, category: "Water & Food" },
  { id: "snacks", label: "Energy bars", quantity: "6 pcs", essential: false, category: "Water & Food" },
  { id: "flashlight", label: "Flashlight", quantity: "1 pc", essential: true, category: "Light & Power" },
  { id: "batteries", label: "Extra batteries", quantity: "2 sets", essential: true, category: "Light & Power" },
  { id: "candles", label: "Candles", quantity: "10 pcs", essential: true, category: "Light & Power" },
  { id: "matches", label: "Matches or lighter", quantity: "2 boxes", essential: true, category: "Light & Power" },
  { id: "powerbank", label: "Power bank", quantity: "1 pc", essential: true, category: "Light & Power" },
  { id: "radio", label: "Battery FM radio", quantity: "1 pc", essential: true, category: "Info & Communication" },
  { id: "cash", label: "Cash (small bills)", quantity: "1,000 DKK", essential: true, category: "Info & Communication" },
  { id: "cards", label: "Payment cards + PIN", quantity: "1 set", essential: true, category: "Info & Communication" },
  { id: "contacts", label: "Phone numbers (paper)", quantity: "1 list", essential: true, category: "Info & Communication" },
  { id: "documents", label: "ID & insurance copies", quantity: "1 set", essential: true, category: "Info & Communication" },
  { id: "first-aid", label: "First aid kit", quantity: "1 pc", essential: true, category: "Health & Safety" },
  { id: "blankets", label: "Warm blankets", quantity: "2 pcs", essential: true, category: "Health & Safety" },
  { id: "hygiene", label: "Hygiene supplies", quantity: "1 bag", essential: false, category: "Health & Safety" },
];

const categoryIcons: Record<string, string> = {
  "Water & Food": "Droplets",
  "Light & Power": "Flashlight",
  "Info & Communication": "Radio",
  "Health & Safety": "Heart",
};

export default function KitPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const readiness = Math.round(
    (checkedItems.size / defaultKit.filter((i) => i.essential).length) * 100
  );

  const toggle = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = [...new Set(defaultKit.map((i) => i.category))];

  return (
    <div className="min-h-dvh bg-klar-bg pb-24">
      {/* Header */}
      <header className="px-5 pt-14 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/dashboard" className="p-1 -ml-1">
            <ChevronLeft size={24} className="text-foreground" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">
            My Emergency Kit
          </h1>
        </div>
      </header>

      {/* Household summary + readiness */}
      <section className="px-5 mb-4">
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProgressRing
            percentage={Math.min(readiness, 100)}
            size={100}
            strokeWidth={8}
            label="ready"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-foreground mb-2">
              Household
            </h2>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>2 adults</span>
              </div>
              <div className="flex items-center gap-1">
                <PawPrint size={14} />
                <span>0 pets</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 rounded-lg text-xs h-8"
            >
              <Settings size={12} className="mr-1" />
              Update household
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Kit grid */}
      <section className="px-5">
        <div className="flex flex-col gap-4">
          {categories.map((cat) => {
            const catItems = defaultKit.filter((i) => i.category === cat);
            const iconName = categoryIcons[cat] ?? "Droplets";
            const Icon = iconMap[iconName] ?? Droplets;

            return (
              <motion.div
                key={cat}
                className="bg-white rounded-2xl p-4 shadow-sm border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={18} className="text-klar-primary" />
                  <h3 className="font-semibold text-sm text-foreground">
                    {cat}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {catItems.map((item) => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                          isChecked
                            ? "border-klar-success bg-klar-success/5"
                            : "border-border bg-klar-bg/50"
                        }`}
                        whileTap={{ scale: 0.96 }}
                      >
                        {isChecked && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-klar-success flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                        <p
                          className={`text-xs font-medium ${
                            isChecked
                              ? "text-klar-success"
                              : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {item.quantity}
                        </p>
                        {item.essential && !isChecked && (
                          <div className="mt-1">
                            <span className="text-[9px] font-bold text-klar-danger uppercase">
                              Required
                            </span>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
