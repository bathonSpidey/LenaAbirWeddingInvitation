import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: 52,
          height: 58,
          background: "rgba(28, 20, 10, 0.72)",
          border: "1px solid rgba(201,168,76,0.45)",
          boxShadow: "inset 0 1px 0 rgba(201,168,76,0.15), 0 4px 16px rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* hairline inner frame */}
        <div
          className="absolute inset-[4px] border pointer-events-none"
          style={{ borderColor: "rgba(201,168,76,0.12)" }}
        />
        {/* centre rule */}
        <div
          className="absolute w-full pointer-events-none"
          style={{
            top: "50%",
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,rgba(201,168,76,0.2) 30%,rgba(201,168,76,0.2) 70%,transparent)",
          }}
        />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ rotateX: -80, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.75rem",
              fontWeight: 300,
              color: "#C9A84C",
              lineHeight: 1,
              textShadow: "0 0 12px rgba(201,168,76,0.5)",
              transformOrigin: "center center",
            }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
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
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Tile value={pad(time.days)}    label="Days"    />
      <Dot />
      <Tile value={pad(time.hours)}   label="Hours"   />
      <Dot />
      <Tile value={pad(time.minutes)} label="Minutes" />
      <Dot />
      <Tile value={pad(time.seconds)} label="Seconds" />
    </div>
  );
}
