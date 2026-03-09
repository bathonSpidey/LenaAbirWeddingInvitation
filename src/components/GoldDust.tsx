import { motion } from "framer-motion";
import { useState } from "react";

type ShapeType = "circle" | "heart" | "star";

const SHAPES: ShapeType[] = ["circle", "heart", "star"];
const COLOR = "#C9A84C";
const GLOW_BASE = "drop-shadow(0 0 5px rgba(201,168,76,0.7))";
const GLOW_BRIGHT = "drop-shadow(0 0 12px rgba(255,210,80,1)) brightness(1.5)";

interface Particle {
  left: number;
  top: number;
  duration: number;
  shape: ShapeType;
  size: number;
  delay: number;
  /** How far up (px) the particle floats */
  yTravel: number;
  /** Horizontal drift (px), positive = right, negative = left */
  xDrift: number;
  /** Max rotation in degrees; 0 = no spin */
  spinDeg: number;
  /** Whether this particle pulses brightness (shimmer) */
  shimmer: boolean;
  /** Whether opacity fades more dramatically */
  deepFade: boolean;
}

const ShapeIcon = ({ shape, size }: { shape: ShapeType; size: number }) => {
  if (shape === "circle") {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: COLOR,
          boxShadow: "0 0 8px rgba(201,168,76,0.6)",
        }}
      />
    );
  }
  if (shape === "heart") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={COLOR} style={{ filter: GLOW_BASE }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={COLOR} style={{ filter: GLOW_BASE }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
};

export const GoldDust = () => {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 28 }).map(() => {
      const spinDeg = Math.random() < 0.6 ? (Math.random() < 0.5 ? 1 : -1) * (30 + Math.random() * 330) : 0;
      return {
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
        duration: 8 + Math.random() * 8,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        size: 18 + Math.floor(Math.random() * 28),
        delay: Math.random() * -12,           // negative delay = pre-offset phase
        yTravel: 80 + Math.random() * 120,    // 80–200 px float
        xDrift: (Math.random() < 0.5 ? 1 : -1) * (15 + Math.random() * 50),
        spinDeg,
        shimmer: Math.random() < 0.45,
        deepFade: Math.random() < 0.4,
      };
    })
  );

  return (
    <>
      {particles.map((p, i) => {
        const opacityKeys = p.deepFade
          ? [0.15, 0.85, 0.15]
          : [0.4, 0.9, 0.4];

        const filterKeys = p.shimmer
          ? [GLOW_BASE, GLOW_BRIGHT, GLOW_BASE]
          : undefined;

        const rotateKeys = p.spinDeg !== 0
          ? [0, p.spinDeg, p.spinDeg * 2]
          : undefined;

        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: p.left, top: p.top, zIndex: 5 }}
            animate={{
              y: [0, -p.yTravel, 0],
              x: [0, p.xDrift, 0],
              opacity: opacityKeys,
              ...(rotateKeys ? { rotate: rotateKeys } : {}),
              ...(filterKeys ? { filter: filterKeys } : {}),
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShapeIcon shape={p.shape} size={p.size} />
          </motion.div>
        );
      })}
    </>
  );
};
