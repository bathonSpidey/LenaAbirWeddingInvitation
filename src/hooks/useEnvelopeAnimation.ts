import { useState } from "react";
import { useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import BridgertonMusic from "../assets/Brigerton.mp3";
import type { Phase } from "../components/envelope/constants";

// Module-level singleton so the Audio object is created only once.
const music = new Audio(BridgertonMusic);
music.volume = 0.6;

/**
 * Encapsulates all envelope opening animation state and sequencing.
 * Keeps EnvelopeIntro focused purely on layout / navigation concerns.
 */
export function useEnvelopeAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [flapZIndex, setFlapZIndex] = useState(40);

  const envelopeAnim = useAnimation();
  const letterAnim = useAnimation();

  const handleSeal = async () => {
    if (phase !== "idle") return;

    setPhase("opening");

    // Fade music in from silence
    music.volume = 0;
    music.play();
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.6) {
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 200);

    // Allow the flap to start rotating before the letter rises
    await new Promise((r) => setTimeout(r, 900));

    // Drop the flap behind the letter so the letter can pass through
    setFlapZIndex(15);
    setPhase("risen");

    await letterAnim.start({
      y: -450,
      transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] },
    });

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      scalar: 0.9,
      ticks: 220,
      colors: ["#C9A84C", "#E8D5A0", "#ffffff"],
    });

    await new Promise((r) => setTimeout(r, 500));

    // Fade the envelope shell out
    envelopeAnim.start({
      opacity: 0,
      y: 50,
      transition: { duration: 0.6, ease: "easeIn" },
    });

    // Settle the letter into its final centred position without a flicker
    setPhase("card");
    await letterAnim.start({
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    });
    await letterAnim.start({
      y: -120, // adjust until centred comfortably on screen
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
    });
  };

  return { phase, flapZIndex, envelopeAnim, letterAnim, handleSeal };
}
