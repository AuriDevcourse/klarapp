"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 400);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="min-h-dvh flex flex-col items-center justify-center px-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #e8f0fe 0%, #f8fafc 50%, #ffffff 100%)",
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          {/* Faded background icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/logo/KlariconBlue.svg"
              alt=""
              width={500}
              height={500}
              className="opacity-[0.03] select-none"
              aria-hidden="true"
            />
          </div>

          {/* Klar branding */}
          <motion.div
            className="mb-10 flex flex-col items-center relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Mobile-only icon */}
            <div className="w-16 h-16 rounded-2xl bg-klar-primary flex items-center justify-center mb-4 shadow-lg sm:hidden">
              <Image
                src="/logo/Klariconwhite.svg"
                alt="Klar"
                width={36}
                height={36}
              />
            </div>
            <Image
              src="/logo/KlarLogoBlue.svg"
              alt="Klar"
              width={120}
              height={50}
              className="mb-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Emergency preparedness for everyone
            </p>
          </motion.div>

          {/* MitID card */}
          <motion.div
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-border/50 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* MitID logo area */}
            <div className="mb-6 flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-2xl font-extrabold text-[#0060e6] tracking-tight">
                  Mit
                </span>
                <span className="text-2xl font-extrabold text-[#002855] tracking-tight">
                  ID
                </span>
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#0060e6] to-[#002855] rounded-full" />
            </div>

            <p className="text-sm text-muted-foreground mb-6 text-center">
              Sign in to start your emergency training
            </p>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-base font-semibold bg-[#0060e6] hover:bg-[#0050c8] text-white shadow-md transition-all active:scale-[0.97]"
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Verifying...
                </motion.div>
              ) : (
                "Sign in with MitID"
              )}
            </Button>

          </motion.div>

          {/* Footer */}
          <motion.p
            className="mt-8 text-xs text-muted-foreground/60 text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            In partnership with the Danish Emergency Management Agency
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
