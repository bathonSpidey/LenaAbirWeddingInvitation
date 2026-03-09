import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const WEDDING = new Date("2026-12-06T00:00:00");

function getTimeLeft() {
  const diff = Math.max(0, WEDDING.getTime() - Date.now());
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}

const GOLD = "#C9A84C";
const TILE_BG = "rgba(28, 20, 10, 0.72)";

/** Renders one half (top or bottom) of a tile, clipping text at the midline. */
function TileHalf({ text, half }: { text: string; half: "top" | "bottom" }) {
  const isTop = half === "top";
  return (
    <div
      style={{
        position: "absolute",
        [isTop ? "top" : "bottom"]: 0,
        left: 0,
        right: 0,
        height: "50%",
        overflow: "hidden",
        background: TILE_BG,
      }}
    >
      {/* Full-height container so text appears centred across the whole tile */}
      <div
        style={{
          position: "absolute",
          [isTop ? "top" : "bottom"]: 0,
          left: 0,
          right: 0,
          height: "200%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 300,
            color: GOLD,
            lineHeight: 1,
            textShadow: "0 0 12px rgba(201,168,76,0.5)",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

type FlipPhase = "idle" | "folding" | "unfolding";

function Tile({ value, label }: { value: string; label: string }) {
  const [trackedValue, setTrackedValue] = useState(value);
  const [displayed, setDisplayed] = useState(value);
  const [next, setNext] = useState(value);
  const [phase, setPhase] = useState<FlipPhase>("idle");

  // Derived-state-during-render pattern (React docs recommended approach).
  // When the incoming `value` prop changes, kick off the flip immediately
  // without going through an effect, avoiding cascading-render warnings.
  if (value !== trackedValue) {
    setTrackedValue(value);
    setNext(value);
    setPhase("folding");
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative"
        style={{
          width: 52,
          height: 58,
          border: "1px solid rgba(201,168,76,0.45)",
          boxShadow: "inset 0 1px 0 rgba(201,168,76,0.15), 0 4px 16px rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
          perspective: "300px",
        }}
      >
        {/* Static background halves — always visible behind the flipping cards */}
        {/* Top half shows the NEXT value (revealed when the fold-away card leaves) */}
        <TileHalf text={phase === "idle" ? displayed : next} half="top" />
        {/* Bottom half shows the CURRENT value (covered by the unfold card) */}
        <TileHalf text={displayed} half="bottom" />

        {/* hairline inner frame */}
        <div
          className="absolute inset-[4px] border pointer-events-none"
          style={{ borderColor: "rgba(201,168,76,0.12)", zIndex: 10 }}
        />
        {/* centre rule */}
        <div
          className="absolute w-full pointer-events-none"
          style={{
            top: "50%",
            height: "1px",
            zIndex: 10,
            background:
              "linear-gradient(90deg,transparent,rgba(201,168,76,0.2) 30%,rgba(201,168,76,0.2) 70%,transparent)",
          }}
        />

        {/* Phase 1 – fold-away card: top half of OLD value rotates downward to -90° */}
        {phase !== "idle" && (
          <motion.div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "50%",
              overflow: "hidden",
              background: TILE_BG,
              transformOrigin: "bottom center",
              zIndex: 5,
            }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{ duration: 0.15, ease: "easeIn" }}
            onAnimationComplete={() => {
              if (phase === "folding") setPhase("unfolding");
            }}
          >
            <TileHalf text={displayed} half="top" />
          </motion.div>
        )}

        {/* Phase 2 – unfold card: bottom half of NEW value drops from 90° to 0° */}
        {phase === "unfolding" && (
          <motion.div
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "50%",
              overflow: "hidden",
              background: TILE_BG,
              transformOrigin: "top center",
              zIndex: 5,
            }}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onAnimationComplete={() => {
              setDisplayed(next);
              setPhase("idle");
            }}
          >
            <TileHalf text={next} half="bottom" />
          </motion.div>
        )}
      </div>
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "6px",
          letterSpacing: "0.28em",
          color: "rgba(160,120,50,0.75)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Dot() {
  return (
    <span
      className="pb-5 self-end"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.4rem",
        color: "rgba(201,168,76,0.35)",
        lineHeight: 1,
        fontWeight: 300,
      }}
    >
      :
    </span>
  );
}

export default function CountdownStrip() {
  const { t } = useTranslation();
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Tile value={pad(time.days)}    label={t("countdown.days")}    />
      <Dot />
      <Tile value={pad(time.hours)}   label={t("countdown.hours")}   />
      <Dot />
      <Tile value={pad(time.minutes)} label={t("countdown.minutes")} />
      <Dot />
      <Tile value={pad(time.seconds)} label={t("countdown.seconds")} />
    </div>
  );
}
