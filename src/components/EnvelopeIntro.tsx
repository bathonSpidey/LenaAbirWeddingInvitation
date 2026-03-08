import { useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import WaxSeal from "./WaxSeal";
import CardContent from "./CardContent";

// ── Add this to your index.html <head>:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap"/>

type Phase = "idle" | "opening" | "risen" | "card";

const EW = 400;
const EH = 520;
const ENVELOPE_BG =
  "linear-gradient(160deg, #e2c570 0%, #ccaa4a 45%, #ba8f38 100%)";
const FLAP_CLIP = "polygon(0 0, 50% 40%, 100% 0)";
const CARD_W = 300;

const FoldLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox={`0 0 ${EW} ${EH}`}
    preserveAspectRatio="none"
  >
    {/* Bottom triangle - Now taller to hide the letter */}
    <polygon
      points={`0,${EH} ${EW / 2},${EH * 0.35} ${EW},${EH}`}
      fill="rgba(80,45,0,0.12)"
    />
    {/* Side triangles */}
    <polygon
      points={`0,0 0,${EH} ${EW / 2},${EH * 0.35}`}
      fill="rgba(255,220,120,0.05)"
    />
    <polygon
      points={`${EW},0 ${EW},${EH} ${EW / 2},${EH * 0.35}`}
      fill="rgba(0,0,0,0.05)"
    />

    {/* Visual lines - matching the new 0.35 point */}
    <line
      x1="0"
      y1={EH}
      x2={EW / 2}
      y2={EH * 0.35}
      stroke="rgba(70,35,0,0.15)"
      strokeWidth="0.8"
    />
    <line
      x1={EW}
      y1={EH}
      x2={EW / 2}
      y2={EH * 0.35}
      stroke="rgba(70,35,0,0.15)"
      strokeWidth="0.8"
    />
  </svg>
);

// ═══════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function EnvelopeIntro() {
  const [phase, setPhase] = useState<Phase>("idle");

  // Magic trick: We start the flap in front of the letter, but
  // push it behind the letter right before the letter slides up!
  const [flapZIndex, setFlapZIndex] = useState(40);

  const envelopeAnim = useAnimation();
  const letterAnim = useAnimation();

  const handleSeal = async () => {
    if (phase !== "idle") return;

    setPhase("opening");
    // Wait for flap
    await new Promise((r) => setTimeout(r, 900));

    setFlapZIndex(15);
    setPhase("risen");

    // We start deeper (top: 160), so we need to rise further up
    // to clear the envelope (around -450px)
    await letterAnim.start({
      y: -450,
      transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] },
    });

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#C9A84C", "#E8D5A0", "#ffffff"],
    });

    await new Promise((r) => setTimeout(r, 500));

    // Envelope fades
    envelopeAnim.start({
      opacity: 0,
      y: 50,
      transition: { duration: 0.6, ease: "easeIn" },
    });

    // ── THE FLICKER FIX ──
    // Instead of switching phases to a new component,
    // we just animate the SAME letter to its final center spot.
    setPhase("card");
    await letterAnim.start({
      y: -120, // Adjust this until the card is perfectly centered on your screen
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
    });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #f5ead4 0%, #e8d5b0 55%, #d4b882 100%)",
      }}
    >
      {/* linen texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg,  transparent, transparent 2px, rgba(160,120,60,0.05) 2px, rgba(160,120,60,0.05) 3px)",
            "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(160,120,60,0.04) 2px, rgba(160,120,60,0.04) 3px)",
          ].join(","),
        }}
      />

      {/* ambient glow */}
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

      <div className="relative" style={{ width: EW, height: EH }}>
        {/* 1. ENVELOPE BACK (z-10) */}
        <motion.div
          animate={envelopeAnim}
          className="absolute inset-0"
          style={{ zIndex: 10 }}
        >
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background: ENVELOPE_BG,
              boxShadow:
                "0 20px 60px rgba(160,100,20,0.3), 0 4px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,240,180,0.25)",
            }}
          />
          <div
            className="absolute rounded-sm"
            style={{
              width: EW - 40,
              left: 20,
              bottom: 0,
              height: EH - 10,
              background:
                "linear-gradient(145deg, #fffef9 0%, #fdf8ec 60%, #faf2de 100%)",
            }}
          />
        </motion.div>

        {/* 2. THE LETTER (z-20)
            Wrapped in a directional clip-path. 
            This allows it to rise up infinitely (-1000px top inset), 
            but strictly hides anything poking out the bottom or sides (0px insets).
        */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 20,
            // Fix: When in "card" phase, we remove the clip entirely (inset 0)
            clipPath:
              phase === "idle"
                ? `inset(${EH * 0.6}px 0px 0px 0px)`
                : phase === "card"
                  ? "inset(-500px -500px -500px -500px)" // Expansion to ensure no edges are cut
                  : "inset(-1000px 0px 0px 0px)",
            transition: "clip-path 0.4s ease-in-out",
          }}
        >
          <motion.div
            animate={letterAnim}
            className="absolute"
            style={{
              width: CARD_W,
              left: (EW - CARD_W) / 2,
              top: 15, // Pushed down just a touch more to hide safely behind the flap
            }}
            initial={{ y: 0 }}
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
              <CardContent />
            </div>
          </motion.div>
        </div>

        {/* 3. ENVELOPE FRONT POCKET (z-30) */}
        <motion.div
          animate={envelopeAnim}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 30,
            background: ENVELOPE_BG,
            // Changed 52% to 35% to match the new FoldLines meeting point
            clipPath: "polygon(0 0, 52% 35%, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <FoldLines />
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
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: "rgba(60,35,5,0.65)",
                  }}
                ></p>
                <p
                  className="italic text-sm"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "rgba(60,35,5,0.38)",
                  }}
                ></p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 4. FLAP (Dynamic Z-Index) */}
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
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #c59535 0%, #b08328 65%, #987018 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: "linear-gradient(160deg, #d8b848 0%, #c09030 100%)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* 5. WAX SEAL (z-50) */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              animate={envelopeAnim}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
              style={{ zIndex: 50, top: `calc(${EH * 0.35}px - 320px)` }}
            >
              <WaxSeal onClick={handleSeal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
