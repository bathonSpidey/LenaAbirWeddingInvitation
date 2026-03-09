import { motion, AnimatePresence, useAnimation } from "framer-motion";
import EnvelopeTexture from "../../assets/Envelop.jpg";
import FoldLines from "./FoldLines";
import type { Phase } from "./constants";

interface EnvelopeFrontPocketProps {
  envelopeAnim: ReturnType<typeof useAnimation>;
  phase: Phase;
}

/**
 * The envelope front pocket layer (z-30).
 * Clipped to only show the lower portion of the envelope so it sits
 * "in front of" the letter slot. Includes decorative fold lines and
 * the idle-state overlay text area.
 */
export default function EnvelopeFrontPocket({
  envelopeAnim,
  phase,
}: EnvelopeFrontPocketProps) {
  return (
    <motion.div
      animate={envelopeAnim}
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 30,
        backgroundImage: `
          linear-gradient(160deg, rgba(226,197,112,0.95), rgba(186,143,56,0.95)),
          url(${EnvelopeTexture})
        `,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
        clipPath: "polygon(0 0, 52% 35%, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      <FoldLines />

      {/* Idle-state overlay — fades out when the envelope opens */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none"
          >
            <p
              className="tracking-[0.28em] uppercase text-xs"
              style={{ fontFamily: "'Cinzel', serif", color: "rgba(60,35,5,0.65)" }}
            />
            <p
              className="italic text-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(60,35,5,0.38)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
