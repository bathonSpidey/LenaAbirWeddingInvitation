import { useState, useEffect } from "react";
import { useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import BridgertonMusic from "../assets/Brigerton.mp3";
import type { Phase } from "../components/envelope/constants";

// Module-level singleton so the Audio object is created only once.
const music = new Audio(BridgertonMusic);
music.volume = 0.6;
music.loop = true;

/**
 * Encapsulates all envelope opening animation state and sequencing.
 * Keeps EnvelopeIntro focused purely on layout / navigation concerns.
 */
export function useEnvelopeAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [flapZIndex, setFlapZIndex] = useState(40);
  const [isPlaying, setIsPlaying] = useState(false);

  // Keep isPlaying in sync with the audio element
  useEffect(() => {
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    music.addEventListener("play", onPlay);
    music.addEventListener("pause", onPause);
    return () => {
      music.removeEventListener("play", onPlay);
      music.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  };

  const replay = () => {
    music.currentTime = 0;
    music.play();
  };

  const envelopeAnim = useAnimation();
  const letterAnim = useAnimation();

  const handleSeal = async () => {
    if (phase !== "idle") return;

    // Compute viewport-relative offsets at the moment of interaction
    const vh = window.innerHeight;
    const riseY = -(vh * 0.62);
    const settleY = -(vh * 0.16);

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

    // Wait for the flap to fully open (flap animation is 1.1 s)
    await new Promise((r) => setTimeout(r, 950));

    // Drop the flap behind the letter so the letter can pass through
    setFlapZIndex(15);
    setPhase("risen");

    // Rise, de-tilt, and grow simultaneously for a fluid single motion
    await letterAnim.start({
      y: riseY,
      rotateX: 0,
      scale: 1.02,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    });

    // Confetti burst as the letter peaks
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.55 },
      scalar: 0.9,
      ticks: 260,
      colors: ["#C9A84C", "#E8D5A0", "#ffffff", "#f8e7c0"],
    });

    // Short pause then fade the envelope out
    await new Promise((r) => setTimeout(r, 280));

    envelopeAnim.start({
      opacity: 0,
      y: 60,
      transition: { duration: 0.65, ease: [0.4, 0, 1, 1] },
    });

    // Settle the letter with spring physics — natural bounce into place
    setPhase("card");
    await letterAnim.start({
      y: settleY,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 20,
        mass: 1.1,
      },
    });
  };

  return { phase, flapZIndex, envelopeAnim, letterAnim, handleSeal, isPlaying, togglePlay, replay };
}
