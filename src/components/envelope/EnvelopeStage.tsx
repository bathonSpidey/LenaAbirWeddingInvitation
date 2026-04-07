import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import { RoyalBackgroundShapes } from "../RoyalBackgroundShapes";
import WaxSeal from "../WaxSeal";
import EnvelopeBack from "./EnvelopeBack";
import EnvelopeLetter from "./EnvelopeLetter";
import EnvelopeFrontPocket from "./EnvelopeFrontPocket";
import EnvelopeFlap from "./EnvelopeFlap";
import { EW, EH } from "./constants";
import type { Phase } from "./constants";
import RoyalBackground from "../../assets/royalBackground.png";

interface EnvelopeStageProps {
  phase: Phase;
  innerRef: React.RefObject<HTMLDivElement>;
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
  innerRef,
  flapZIndex,
  envelopeAnim,
  letterAnim,
  onSeal,
  onDecline,
  onRSVP,
}: EnvelopeStageProps) {
  // Scale the fixed-pixel envelope down on narrow screens so it never clips
  const envScale =
    typeof window !== "undefined" ? Math.min(1, (window.innerWidth * 0.94) / EW) : 1;

  return (
    <div
      ref={innerRef}
      className="min-h-screen w-full flex items-center justify-center relative snap-start overflow-hidden"
      style={{
        backgroundImage: `url(${RoyalBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Envelope layers container */}
      <div
        className="relative"
        style={{
          width: EW,
          height: EH,
          zIndex: 10,
          transform: `scale(${envScale})`,
          transformOrigin: "center center",
        }}
      >
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
