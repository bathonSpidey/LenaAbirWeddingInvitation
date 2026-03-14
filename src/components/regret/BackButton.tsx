import { motion } from "framer-motion";
import React from "react";

interface BackButtonProps {
  onClick: () => void;
  label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label }) => {
  return (
    <motion.button
      onClick={onClick}
      className="absolute top-10 left-10 flex items-center gap-2 text-stone-400 hover:text-amber-700 transition-colors cursor-pointer uppercase tracking-widest text-[9px]"
      style={{ fontFamily: "'Cinzel', serif" }}
      whileHover={{ x: -5 }}
    >
      <span>←</span> {label}
    </motion.button>
  );
};

export default BackButton;
