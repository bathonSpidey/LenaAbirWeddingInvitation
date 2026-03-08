import { motion } from "framer-motion";
import React from "react";
import PaperTexture from "../assets/Paper.jpg"; // Adjust the path based on your folder structure

interface RegretsSectionProps {
  innerRef: React.RefObject<HTMLDivElement>;
  onBack: () => void;
  onOurStory: () => void; // New prop for the story layout
  onDiscover: () => void;
}

const RegretsSection: React.FC<RegretsSectionProps> = ({
  innerRef,
  onBack,
  onOurStory,
  onDiscover,
}) => {
  return (
    <div
      ref={innerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 snap-start relative"
      style={{
        backgroundImage: `url(${PaperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-stone-400 hover:text-amber-700 transition-colors cursor-pointer uppercase tracking-widest text-[9px]"
        style={{ fontFamily: "'Cinzel', serif" }}
        whileHover={{ x: -5 }}
      >
        <span>←</span> Back to Invitation
      </motion.button>

      <div className="max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-stone-800 mb-6"
          style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 52 }}
        >
          We will miss you
        </motion.h2>

        <p
          className="text-stone-600 mb-12 leading-relaxed italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22 }}
        >
          "A celebration is only as bright as the people who share it. Though
          you cannot be with us in person, we carry your love in our hearts."
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            onClick={onOurStory}
            whileHover={{ y: -2, color: "#C9A84C" }}
            className="px-8 py-4 border-b border-stone-300 text-stone-700 tracking-[0.2em] uppercase text-[10px] cursor-pointer"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Know Our Story
          </motion.button>

          <motion.button
            onClick={onDiscover} // Use the new prop here
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-[#C9A84C] text-white tracking-[0.2em] uppercase text-[10px] shadow-lg rounded-sm cursor-pointer"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            See what you'll be missing
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RegretsSection;
