import { motion } from "framer-motion";
import React from "react";

type ButtonVariant = "primary" | "secondary";

interface ActionButtonProps {
  onClick: () => void;
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  variant = "secondary",
  children,
}) => {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      onClick={onClick}
      // Primary button "glows", Secondary button "lifts" and changes color to your Amethyst/Gold
      whileHover={
        isPrimary
          ? { scale: 1.05, backgroundColor: "#B99A5E" }
          : { y: -2, color: "#AF944D" }
      }
      className={`px-10 py-4 tracking-[0.3em] uppercase text-[10px] cursor-pointer transition-all duration-300 ${
        isPrimary
          ? "bg-[#AF944D] text-white shadow-md rounded-sm" // Swapped to Itinerary Gold
          : "border-b border-stone-200 text-stone-500 hover:border-[#AF944D]"
      }`}
      style={{ fontFamily: "'Cinzel', serif", fontWeight: 700 }}
    >
      {children}
    </motion.button>
  );
};

export default ActionButton;
