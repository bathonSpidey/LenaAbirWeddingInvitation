import { motion } from "framer-motion";
import { useState } from "react";

export const GoldDust = () => {
  const [particles] = useState<Array<{ left: number; top: number; duration: number }>>(() =>
    Array.from({ length: 24 }).map(() => ({
      left: Math.random() * window.innerWidth,
      top: Math.random() * window.innerHeight,
      duration: 6 + Math.random() * 4,
    }))
  );

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 100,
            height: 100,
            background: "#E8D5A0",
            opacity: 0.4,
            zIndex: 5,
          }}
          initial={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: ["0%", "-20%", "0%"],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
          }}
        />
      ))}
    </>
  );
};
