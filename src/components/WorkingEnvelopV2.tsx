import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
// @ts-expect-error — run `npm i -D @types/canvas-confetti` to fix
import confetti from "canvas-confetti"
import { GiWaxSeal } from "react-icons/gi"

// ── Add this to your index.html <head>:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap"/>

type Phase = "idle" | "opening" | "risen" | "card"

const EW           = 520
const EH           = 280
const ENVELOPE_BG  = "linear-gradient(160deg, #e2c570 0%, #ccaa4a 45%, #ba8f38 100%)"
const FLAP_CLIP    = "polygon(0 0, 50% 65%, 100% 0)"
const CARD_W       = 460

// ─── Ornaments ───────────────────────────────────────────

const DiamondDivider = () => (
  <div className="flex items-center justify-center gap-2 w-full my-2">
    <div className="h-px w-16 bg-amber-400/50" />
    <div className="w-2 h-2 rotate-45 bg-amber-500/70" />
    <div className="h-px w-16 bg-amber-400/50" />
  </div>
)

const Corner = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" width="32" height="32" className={className}>
    <path d="M6 6 L6 20 M6 6 L20 6"
      stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M6 6 Q14 6 14 14"
      stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.4" />
    <circle cx="6" cy="6" r="2" fill="#C9A84C" opacity="0.6" />
  </svg>
)

const FoldLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox={`0 0 ${EW} ${EH}`}
    preserveAspectRatio="none"
  >
    <polygon points={`0,${EH} ${EW/2},${EH*0.52} ${EW},${EH}`}  fill="rgba(80,45,0,0.12)" />
    <polygon points={`0,0 0,${EH} ${EW/2},${EH*0.52}`}           fill="rgba(255,220,120,0.05)" />
    <polygon points={`${EW},0 ${EW},${EH} ${EW/2},${EH*0.52}`}   fill="rgba(0,0,0,0.05)" />
    <line x1="0"  y1="0"  x2={EW/2} y2={EH*0.52} stroke="rgba(150,95,15,0.2)"  strokeWidth="0.8" />
    <line x1={EW} y1="0"  x2={EW/2} y2={EH*0.52} stroke="rgba(150,95,15,0.2)"  strokeWidth="0.8" />
    <line x1="0"  y1={EH} x2={EW/2} y2={EH*0.52} stroke="rgba(70,35,0,0.15)"   strokeWidth="0.8" />
    <line x1={EW} y1={EH} x2={EW/2} y2={EH*0.52} stroke="rgba(70,35,0,0.15)"   strokeWidth="0.8" />
  </svg>
)

// ─── Wax Seal ─────────────────────────────────────────────

const WaxSeal = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    initial={{ scale: 0.6, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 1.8, opacity: 0, transition: { duration: 0.28 } }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="relative w-20 h-20 rounded-full cursor-pointer flex items-center justify-center border-0 outline-none"
    style={{
      background: "radial-gradient(circle at 38% 32%, #e05555 0%, #b02020 45%, #7a0e0e 80%, #550808 100%)",
      boxShadow: "0 6px 24px rgba(0,0,0,0.5), inset 0 3px 8px rgba(255,160,160,0.3), inset 0 -3px 8px rgba(40,0,0,0.6)",
    }}
  >
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="36" stroke="rgba(255,180,180,0.2)"  strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="40" r="29" stroke="rgba(255,150,150,0.1)"  strokeWidth="1"   fill="none" />
      {[0, 60, 120, 180, 240, 300].map(a => (
        <circle key={a}
          cx={40 + 33 * Math.cos((a * Math.PI) / 180)}
          cy={40 + 33 * Math.sin((a * Math.PI) / 180)}
          r="1.5" fill="rgba(255,180,180,0.35)" />
      ))}
    </svg>
    <div className="absolute rounded-full pointer-events-none"
      style={{
        width: 26, height: 12,
        background: "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 100%)",
        top: 14, left: 17, transform: "rotate(-20deg)",
      }}
    />
    <div className="relative z-10 flex items-center justify-center">
      <GiWaxSeal className="absolute text-5xl text-red-200/10" />
      <span
        className="relative text-red-100 font-semibold italic text-sm select-none"
        style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
      >
        A♥L
      </span>
    </div>
  </motion.button>
)

// ─── Invitation card content (shared between risen + card states) ──

const CardContent = () => (
  <div
    className="m-3 rounded relative"
    style={{
      padding: "28px 36px 24px",
      border: "1px solid rgba(201,168,76,0.35)",
      boxShadow: "inset 0 0 0 4px rgba(255,255,255,0.7), inset 0 0 0 5px rgba(201,168,76,0.1)",
    }}
  >
    <Corner className="absolute top-1 left-1" />
    <Corner className="absolute top-1 right-1 rotate-90" />
    <Corner className="absolute bottom-1 right-1 rotate-180" />
    <Corner className="absolute bottom-1 left-1 -rotate-90" />

    <div className="flex flex-col items-center text-center">
      <p className="tracking-[0.24em] uppercase mb-3 text-amber-700/70"
        style={{ fontFamily: "'Cinzel', serif", fontSize: 9 }}>
        Together with their families
      </p>

      <h1 className="font-light italic text-stone-800 leading-none mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 50, letterSpacing: "0.02em" }}>
        Abir &amp; Lena
      </h1>

      <DiamondDivider />

      <p className="italic text-amber-900/70 mb-1.5"
        style={{ fontFamily: "'EB Garamond', serif", fontSize: 15 }}>
        joyfully invite you to celebrate their
      </p>

      <p className="tracking-[0.2em] uppercase font-semibold mb-5 text-amber-700"
        style={{ fontFamily: "'Cinzel', serif", fontSize: 13 }}>
        Wedding Reception
      </p>

      <div className="flex justify-center gap-8 mb-4">
        {[
          { label: "DATE",  val: "4 December 2026"         },
          { label: "VENUE", val: "Royal Park, Jorhat"       },
          { label: "TIME",  val: "7 o'clock in the evening" },
        ].map(({ label, val }) => (
          <div key={label} className="text-center">
            <p className="tracking-[0.22em] uppercase text-amber-500 mb-0.5"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 8 }}>
              {label}
            </p>
            <p className="italic text-stone-600"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: 12 }}>
              {val}
            </p>
          </div>
        ))}
      </div>

      <DiamondDivider />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="mt-4 px-8 py-2.5 text-white rounded-sm cursor-pointer tracking-[0.22em] uppercase border-0"
        style={{
          fontFamily: "'Cinzel', serif", fontSize: 10,
          background: "linear-gradient(135deg, #C9A84C, #A0722A)",
          boxShadow: "0 3px 16px rgba(160,114,42,0.4)",
        }}
      >
        Continue
      </motion.button>
    </div>
  </div>
)

// ═══════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function EnvelopeIntro() {
  const [phase, setPhase] = useState<Phase>("idle")
  
  // Magic trick: We start the flap in front of the letter, but 
  // push it behind the letter right before the letter slides up!
  const [flapZIndex, setFlapZIndex] = useState(40)

  const envelopeAnim = useAnimation()
  const letterAnim   = useAnimation()

  const handleSeal = async () => {
    if (phase !== "idle") return

    // ── Step 1: Flap opens ──────────────────────────────────
    setPhase("opening")
    await new Promise(r => setTimeout(r, 900))

    // ── Step 2: Set flap behind letter, pull letter out ─────
    setFlapZIndex(15) // Envelope Back is z-10, Letter is z-20. Flap sits snugly between.
    setPhase("risen")

    // Smooth, elegant slide out of the pocket
    await letterAnim.start({
      y: -320, // High enough to clear the envelope
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    })

    // ── Step 3: Confetti ────────────────────────────────────
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#C9A84C", "#E8D5A0", "#fff8d0", "#b87333", "#ffffff"],
      scalar: 0.9,
    })
    
    // Pause for the confetti pop
    await new Promise(r => setTimeout(r, 400))

    // ── Step 4: Envelope drops away gracefully ──────────────
    envelopeAnim.start({
      opacity: 0,
      scale: 0.85,
      y: 40,
      transition: { duration: 0.5, ease: "easeIn" },
    })

    await new Promise(r => setTimeout(r, 150))

    // ── Step 5: Letter settles to final reading position ────
    setPhase("card")
    await letterAnim.start({
      y: -40, // Drops slightly to center beautifully on screen
      transition: { duration: 0.7, ease: [0.34, 1.2, 0.64, 1] },
    })
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #f5ead4 0%, #e8d5b0 55%, #d4b882 100%)",
      }}
    >
      {/* linen texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          "repeating-linear-gradient(0deg,  transparent, transparent 2px, rgba(160,120,60,0.05) 2px, rgba(160,120,60,0.05) 3px)",
          "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(160,120,60,0.04) 2px, rgba(160,120,60,0.04) 3px)",
        ].join(","),
      }} />

      {/* ambient glow */}
      <div className="absolute rounded-full pointer-events-none" style={{
        width: 700, height: 420,
        background: "radial-gradient(ellipse, rgba(201,168,76,0.22) 0%, transparent 65%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      }} />

      <div className="relative" style={{ width: EW, height: EH }}>

        {/* 1. ENVELOPE BACK (z-10) */}
        <motion.div animate={envelopeAnim} className="absolute inset-0" style={{ zIndex: 10 }}>
          <div className="absolute inset-0 rounded-md" style={{
            background: ENVELOPE_BG,
            boxShadow: "0 20px 60px rgba(160,100,20,0.3), 0 4px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,240,180,0.25)",
          }} />
          <div className="absolute rounded-sm" style={{
            width: EW - 40, left: 20, bottom: 0, height: EH - 10,
            background: "linear-gradient(145deg, #fffef9 0%, #fdf8ec 60%, #faf2de 100%)",
          }} />
        </motion.div>

        {/* 2. THE LETTER (z-20)
            Always mounted! Sits perfectly sandwiched between back and front folds.
        */}
        <motion.div
          animate={letterAnim}
          className="absolute"
          style={{
            width: CARD_W,
            left: (EW - CARD_W) / 2,
            top: 10, // Tucked inside cleanly
            zIndex: 20,
          }}
          initial={{ y: 0 }}
        >
          <div className="rounded-lg" style={{
            background: "linear-gradient(145deg, #fffef9 0%, #fdf8ec 55%, #faf2de 100%)",
            boxShadow: "0 24px 80px rgba(160,110,30,0.28), 0 4px 16px rgba(0,0,0,0.1)",
          }}>
            <CardContent />
          </div>
        </motion.div>

        {/* 3. ENVELOPE FRONT POCKET (z-30) */}
        <motion.div
          animate={envelopeAnim}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 30,
            background: ENVELOPE_BG,
            // Matches FoldLines perfectly, creating a physical "V" pocket cut-out
            clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)"
          }}
        >
          <FoldLines />
          <AnimatePresence>
            {phase === "idle" && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none"
              >
                <p className="tracking-[0.28em] uppercase text-xs" style={{ fontFamily: "'Cinzel', serif", color: "rgba(60,35,5,0.65)" }}>
                  Open Invitation
                </p>
                <p className="italic text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(60,35,5,0.38)" }}>
                  press the seal to open
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 4. FLAP (Dynamic Z-Index) */}
        <motion.div
           animate={envelopeAnim}
           className="absolute top-0 left-0 w-full"
           style={{ height: "62%", zIndex: flapZIndex, perspective: "900px" }}
        >
           <motion.div
             className="w-full h-full"
             style={{ transformOrigin: "top center", clipPath: FLAP_CLIP }}
             animate={{ rotateX: phase !== "idle" ? 185 : 0 }}
             transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
           >
             <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #c59535 0%, #b08328 65%, #987018 100%)" }} />
             <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(160deg, #d8b848 0%, #c09030 100%)" }} />
           </motion.div>
        </motion.div>

        {/* 5. WAX SEAL (z-50) */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div animate={envelopeAnim} className="absolute inset-0 flex items-center justify-center pointer-events-auto" style={{ zIndex: 50 }}>
              <WaxSeal onClick={handleSeal} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}