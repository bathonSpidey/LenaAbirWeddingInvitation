import React from "react";
import { motion } from "framer-motion";
import SealImage from "../assets/Seal.png"; // Adjust the path based on your folder structure

interface WaxSealProps {
  onClick: () => void;
}

const WaxSeal: React.FC<WaxSealProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.6, opacity: 0 }}
      whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer flex items-center justify-center outline-none border-none bg-transparent"
      style={{
        width: 220,
        height: 150,
      }}
    >
      {/* 1. THE RENDERED IMAGE */}
      <img
        src={SealImage}
        alt="A+L Wax Seal"
        className="w-full h-full object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
      />

      {/* 2. OPTIONAL: A very subtle 'interactive' glint */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileHover={{ x: 100, opacity: 0.2 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
      />
    </motion.button>
  );
};

export default WaxSeal;
