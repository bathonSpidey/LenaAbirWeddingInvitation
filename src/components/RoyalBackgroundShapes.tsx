import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import MarigoldGold from "../assets/Marigold.png";
import CornflowerSilk from "../assets/kornblume.png";

const ASSETS = [
  { src: MarigoldGold, label: "marigold" },
  { src: CornflowerSilk, label: "cornflower" },
];

export const RoyalBackgroundShapes = () => {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 18 }).map((_, i) => {
      return {
        id: i,
        x: Math.random() * 100, // % across full viewport width
        y: Math.random() * 100, // % across full viewport height
        driftX: (Math.random() - 0.5) * 40,
        driftY: (Math.random() - 0.5) * 40,
        rotation: Math.random() * 360,
        size: 35 + Math.random() * 45,
        asset: ASSETS[Math.floor(Math.random() * ASSETS.length)].src,
        duration: 12 + Math.random() * 12,
        delay: Math.random() * -25,
      };
    });
    setElements(items);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: [0, el.driftX, 0],
            y: [0, el.driftY, 0],
            rotate: [el.rotation, el.rotation + 20, el.rotation],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={el.asset}
            alt="Motif"
            className="w-full h-auto drop-shadow-md brightness-110"
          />
        </motion.div>
      ))}
    </div>
  );
};
