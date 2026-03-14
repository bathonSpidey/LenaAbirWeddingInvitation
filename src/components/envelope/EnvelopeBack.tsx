import { motion, useAnimation } from "framer-motion";
import EnvelopeTexture from "../../assets/Envelop.jpg";
import PaperTexture from "../../assets/Paper.jpg";
import { EW, EH } from "./constants";

interface EnvelopeBackProps {
  envelopeAnim: ReturnType<typeof useAnimation>;
}

/**
 * The backmost layer of the envelope (z-10).
 * Renders the envelope texture and the paper peek behind the letter slot.
 */
export default function EnvelopeBack({ envelopeAnim }: EnvelopeBackProps) {
  return (
    <motion.div
      animate={envelopeAnim}
      className="absolute inset-0"
      style={{ zIndex: 10 }}
    >
      {/* Envelope body */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          backgroundImage: `url(${EnvelopeTexture})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          boxShadow:
            "0 20px 60px rgba(160,100,20,0.3), 0 4px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,240,180,0.25)",
        }}
      />

      {/* Paper slot peek */}
      <div
        className="absolute rounded-sm"
        style={{
          width: EW - 40,
          left: 20,
          bottom: 0,
          height: EH - 10,
          backgroundImage: `url(${PaperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </motion.div>
  );
}
