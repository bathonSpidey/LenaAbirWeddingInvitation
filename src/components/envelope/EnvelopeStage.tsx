import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { GoldDust } from "../GoldDust";
import WaxSeal from "../WaxSeal";
import EnvelopeBack from "./EnvelopeBack";
import EnvelopeLetter from "./EnvelopeLetter";
import EnvelopeFrontPocket from "./EnvelopeFrontPocket";
import EnvelopeFlap from "./EnvelopeFlap";
import { EW, EH } from "./constants";
import type { Phase } from "./constants";

interface EnvelopeStageProps {
  phase: Phase;
  flapZIndex: number;
  envelopeAnim: ReturnType<typeof useAnimation>;
  letterAnim: ReturnType<typeof useAnimation>;
  onSeal: () => void;
  onDecline: () => void;
  onRSVP: () => void;
}

/**
 * The full envelope scene: background, ambient glow, and all layered
 * envelope pieces stacked in z-order (back → letter → pocket → flap → seal).
 */
export default function EnvelopeStage({
  phase,
  flapZIndex,
  envelopeAnim,
  letterAnim,
  onSeal,
  onDecline,
  onRSVP,
}: EnvelopeStageProps) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative snap-start"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #f5ead4 0%, #e8d5b0 55%, #d4b882 100%)",
      }}
    >
      {/* Linen texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg,  transparent, transparent 2px, rgba(160,120,60,0.05) 2px, rgba(160,120,60,0.05) 3px)",
            "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(160,120,60,0.04) 2px, rgba(160,120,60,0.04) 3px)",
          ].join(","),
        }}
      />

      <GoldDust />

      {/* Ambient golden glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 700,
          height: 420,
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.22) 0%, transparent 65%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Envelope layers container */}
      <div className="relative" style={{ width: EW, height: EH }}>
        {/* Layer 1 — envelope back (z-10) */}
        <EnvelopeBack envelopeAnim={envelopeAnim} />

        {/* Layer 2 — rising letter card (z-20) */}
        <EnvelopeLetter
          letterAnim={letterAnim}
          phase={phase}
          onDecline={onDecline}
          onRSVP={onRSVP}
        />

        {/* Layer 3 — front pocket (z-30) */}
        <EnvelopeFrontPocket envelopeAnim={envelopeAnim} phase={phase} />

        {/* Layer 4 — flap with dynamic z-index (starts at z-40, drops to z-15) */}
        <EnvelopeFlap
          envelopeAnim={envelopeAnim}
          flapZIndex={flapZIndex}
          phase={phase}
        />

        {/* Layer 5 — wax seal (z-50), visible only on idle */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              animate={envelopeAnim}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
              style={{ zIndex: 50, top: `calc(${EH * 0.35}px - 320px)` }}
            >
              <WaxSeal onClick={onSeal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
