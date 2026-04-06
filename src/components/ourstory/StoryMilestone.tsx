import { motion } from "framer-motion";
import { Pin } from "./Pin";

interface StoryMilestoneProps {
  year: string;
  title: string;
  desc: string;
  image?: string;
  index: number;
  location: string;
  flag: string;
}

export const StoryMilestone = ({
  year,
  title,
  desc,
  image,
  index,
  location,
  flag,
}: StoryMilestoneProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 md:mb-32 relative ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Connecting line (mobile only) */}
      <div className="absolute left-1/2 -top-12 bottom-0 w-[1px] bg-gradient-to-b from-[#B98C8C]/0 via-[#B98C8C]/30 to-[#B98C8C]/0 md:hidden" />

      {/* Pin + year + location */}
      <div className="flex flex-col items-center gap-3 flex-shrink-0 z-10">
        <span className="font-['Cinzel'] text-[11px] md:text-[12px] tracking-[0.3em] text-[#8E7B6B] bg-[#FDFBF7] md:bg-transparent px-2">
          {year}
        </span>

        <Pin image={image} title={title} />

        <span className="mt-2 px-3 py-1 rounded-full bg-[#F8F0E0] text-[#5C4A3A] border border-[#B98C8C]/30 text-[9px] tracking-widest font-['Cinzel'] flex items-center gap-2 whitespace-nowrap shadow-sm">
          <span className="text-[12px]">{flag}</span>
          {location}
        </span>
      </div>

      {/* Text content */}
      <div
        className={`flex-1 w-full md:w-auto border-b border-[#B98C8C]/20 pb-10
          text-center md:text-left
          ${!isEven && "md:text-right"}
        `}
      >
        <h4 className="font-['Cinzel'] text-[11px] md:text-[12px] uppercase tracking-[0.35em] text-[#A67C7C] mb-3 md:mb-4">
          {title}
        </h4>
        <p className="font-['Cormorant_Garamond'] text-[20px] md:text-[26px] italic text-[#3E2E2E] leading-relaxed max-w-xl mx-auto md:mx-0">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};
