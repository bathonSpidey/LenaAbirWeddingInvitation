import { motion, useAnimation } from "framer-motion";
import CardContent from "../cardcontent/CardContent";
import { EW, EH, CARD_W } from "./constants";
import type { Phase } from "./constants";

interface EnvelopeLetterProps {
  letterAnim: ReturnType<typeof useAnimation>;
  phase: Phase;
  onDecline: () => void;
  onRSVP: () => void;
}

/**
 * The letter / invitation card layer (z-20).
 * Uses a directional clip-path so the card is hidden inside the envelope
 * until it rises. Switching to the "card" phase removes the clip entirely
 * so the content is never cut off once centred on screen.
 */
export default function EnvelopeLetter({
  letterAnim,
  phase,
  onDecline,
  onRSVP,
}: EnvelopeLetterProps) {
  const clipPath =
    phase === "idle"
      ? `inset(${EH * 0.6}px 0px 0px 0px)`
      : phase === "card"
        ? "inset(-500px -500px -500px -500px)" // expanded — no edges clipped
        : "inset(-1000px 0px 0px 0px)"; // rising — only sides clamped

  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 20,
        clipPath,
        transition: "clip-path 0.4s ease-in-out",
      }}
    >
      <motion.div
        animate={letterAnim}
        className="absolute"
        style={{
          width: CARD_W,
          left: (EW - CARD_W) / 2,
          top: 15, // slightly below the flap so it hides safely before rising
        }}
        initial={{ y: 0, rotateX: 8, scale: 0.96 }}
      >
        <div
          className="rounded-lg"
          style={{
            background:
              "linear-gradient(145deg, #fffef9 0%, #fdf8ec 55%, #faf2de 100%)",
            boxShadow:
              "0 24px 80px rgba(160,110,30,0.28), 0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent onDecline={onDecline} onRSVP={onRSVP} />
        </div>
      </motion.div>
    </div>
  );
}
