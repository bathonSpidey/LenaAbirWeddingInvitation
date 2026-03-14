import { motion } from "framer-motion";
import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  className = "",
}) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`text-stone-800 ${className}`}
      style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 52 }}
    >
      {children}
    </motion.h2>
  );
};

export default SectionHeading;
