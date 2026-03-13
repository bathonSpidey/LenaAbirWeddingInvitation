import React from "react";
import { motion } from "framer-motion";

interface RegencyStepItemProps {
  icon: React.ReactNode; // Replaced stepNumber
  title: string;
  description: string;
  accent: "rose" | "sage" | "gold";
  children?: React.ReactNode;
}

export default function RegencyStepItem({
  icon,
  title,
  description,
  accent,
  children,
}: RegencyStepItemProps) {
  const colorMap = {
    gold: "#AF944D",
    rose: "#b98c8c",
    sage: "#B0CCA8",
  };

  const accentColor = colorMap[accent];

  return (
    <div className="relative pl-8 group">
      {/* Vertical Timeline Thread */}
      <div
        className="absolute left-0 top-2 bottom-0 w-[1px] opacity-20"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex flex-col gap-3">
        {/* Icon & Title Row */}
        <div className="flex items-center gap-4 -ml-11 relative z-10">
          {/* Animated Icon Container */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FAF5F0] border border-[#AF944D]/30 shadow-sm"
          >
            {icon}
          </motion.div>

          <h5
            className="font-['Pinyon_Script'] text-4xl mt-2"
            style={{ color: "#1a2849" }}
          >
            {title}
          </h5>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          <p
            className="font-['Cormorant_Garamond'] text-lg italic leading-relaxed"
            style={{ color: "#1a2849", opacity: 0.85 }}
          >
            {description}
          </p>

          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
