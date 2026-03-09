import { motion, useAnimation } from "framer-motion";
import EnvelopeTexture from "../../assets/Envelop.jpg";
import { FLAP_CLIP } from "./constants";
import type { Phase } from "./constants";

interface EnvelopeFlapProps {
  envelopeAnim: ReturnType<typeof useAnimation>;
  flapZIndex: number;
  phase: Phase;
}

/**
 * The envelope flap (z-dynamic).
 * Starts in front of the letter (z-40) so the wax seal appears to seal it,
 * then drops behind (z-15) just before the letter rises, creating the
 * "flap opening" illusion.
 */
export default function EnvelopeFlap({
  envelopeAnim,
  flapZIndex,
  phase,
}: EnvelopeFlapProps) {
  return (
    <motion.div
      animate={envelopeAnim}
      className="absolute top-0 left-0 w-full"
      style={{ height: "95%", zIndex: flapZIndex, perspective: "900px" }}
    >
      <motion.div
        className="w-full h-full"
        style={{ transformOrigin: "top center", clipPath: FLAP_CLIP }}
        animate={{ rotateX: phase !== "idle" ? 185 : 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Textured surface */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(160deg, rgba(226,197,112,0.95), rgba(186,143,56,0.95)),
              url(${EnvelopeTexture})
            `,
            backgroundBlendMode: "multiply",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Warm golden sheen */}
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: "linear-gradient(160deg, #d8b848 0%, #c09030 100%)" }}
        />
      </motion.div>
    </motion.div>
  );
}
