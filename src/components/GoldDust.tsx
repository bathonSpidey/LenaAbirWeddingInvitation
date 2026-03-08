import { motion } from "framer-motion";

export const GoldDust = () => {
  const particles = Array.from({ length: 24 });

  return (
    <>
      {particles.map((_, i) => (
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
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
          }}
          animate={{
            y: ["0%", "-20%", "0%"],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
          }}
        />
      ))}
    </>
  );
};
