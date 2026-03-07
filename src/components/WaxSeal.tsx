import React from "react";
import { motion } from "framer-motion";

interface WaxSealProps {
  onClick: () => void;
  initials?: string;
}

const WaxSeal: React.FC<WaxSealProps> = ({ onClick, initials = "A♥L" }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.6, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative cursor-pointer flex items-center justify-center outline-none group"
      style={{
        width: 90,
        height: 90,
        filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.35))",
      }}
    >
      {/* 1. THE DRIP & MAIN BLOB */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#b23b3b",
          // This creates the irregular "drip" look on the bottom left
          borderRadius: "45% 55% 50% 50% / 45% 45% 75% 40%",
          background:
            "radial-gradient(circle at 35% 35%, #ca5555 0%, #b23b3b 40%, #8a2a2a 90%)",
          boxShadow: [
            "inset -4px -4px 8px rgba(0,0,0,0.4)", // Bottom right shadow
            "inset 6px 6px 10px rgba(255,255,255,0.2)", // Top left light catch
          ].join(", "),
        }}
      />

      {/* 2. THE EXTENDED DRIP (The "Tail") */}
      <div
        className="absolute"
        style={{
          width: 18,
          height: 35,
          backgroundColor: "#8a2a2a",
          bottom: -15,
          left: 22,
          borderRadius: "0 0 50% 50%",
          transform: "rotate(10deg)",
          background: "linear-gradient(to bottom, #b23b3b, #7a2222)",
          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3)",
        }}
      />

      {/* 3. THE CENTER WELL (The stamped area) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          width: "72%",
          height: "72%",
          borderRadius: "50%",
          backgroundColor: "#b23b3b",
          // The inner rim shadow that makes the center look "pressed"
          boxShadow:
            "inset 0 6px 10px rgba(0,0,0,0.5), 0 2px 4px rgba(255,255,255,0.1)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {/* 4. THE EMBOSSED TEXT (Raised, not sunk) */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span
            className="text-[#d87a7a] font-bold italic text-base select-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              // The magic for the embossed look: light on top, dark on bottom
              textShadow:
                "1px 1px 1px rgba(255,255,255,0.3), -1px -1px 1px rgba(0,0,0,0.5)",
              opacity: 0.9,
            }}
          >
            {initials}
          </span>
          <div className="w-6 h-[1px] bg-black/20 mt-0.5 blur-[0.5px]" />
        </div>
      </div>

      {/* 5. TEXTURE OVERLAY (Noise/Grain) */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          borderRadius: "inherit",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.button>
  );
};

export default WaxSeal;
