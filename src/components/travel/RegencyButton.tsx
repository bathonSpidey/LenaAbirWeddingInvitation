import { motion } from "framer-motion";

interface RegencyButtonProps {
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
  color?: "gold" | "rose" | "sage";
  size?: "sm" | "md" | "lg";
}

export default function RegencyButton({
  label,
  onClick,
  fullWidth = false,
  color = "gold",
  size = "md",
}: RegencyButtonProps) {
  const colorMap = {
    gold: "#c9a961",
    rose: "#a67c7c",
    sage: "#8a9b7f",
  };

  const sizeMap = {
    sm: "py-2 px-6 text-[9px]",
    md: "py-3 px-8 text-[10px]",
    lg: "py-4 px-10 text-[11px]",
  };

  const buttonColor = colorMap[color];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 4px 12px ${buttonColor}20`,
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden border-2 font-['Cinzel'] tracking-widest uppercase transition-all duration-300 ${
        sizeMap[size]
      } ${fullWidth ? "w-full" : ""}`}
      style={{
        borderColor: buttonColor,
        color: "#1a2849",
      }}
    >
      {/* Text layer */}
      <span className="relative z-10">{label}</span>

      {/* Animated background layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: buttonColor }}
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
