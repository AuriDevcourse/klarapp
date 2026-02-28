"use client";

import { useCallback, useRef } from "react";

export function useSound(src: string, volume = 0.6) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    try {
      // Create a fresh Audio each time so overlapping plays work
      const audio = new Audio(src);
      audio.volume = volume;
      audioRef.current = audio;
      audio.play().catch(() => {
        // Autoplay blocked — silently ignore
      });
    } catch {
      // Audio not supported
    }
  }, [src, volume]);

  return { play };
}

export function useCorrectSound() {
  return useSound("/sounds/correctanswer.mp3");
}

export function useIncorrectSound() {
  return useSound("/sounds/incorrectanswer.wav");
}
