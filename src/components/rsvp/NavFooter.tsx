import { motion } from "framer-motion";

interface NavFooterProps {
  onExplore: () => void;
  onOurStory: () => void;
}

export default function NavFooter({ onExplore, onOurStory }: NavFooterProps) {
  return (
    <section className="mt-12 pt-8 border-t border-stone-200/60">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <motion.button
          onClick={onExplore}
          whileHover={{
            scale: 1.02,
            backgroundColor: "#8B5E3C",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-[#2D241E] text-[#fdf8ec] px-8 py-4 rounded-sm font-['Cinzel'] text-[10px] tracking-[0.25em] uppercase font-bold cursor-pointer transition-colors flex items-center justify-center gap-3 shadow-md"
        >
          Explore the Region
        </motion.button>

        <motion.button
          onClick={onOurStory}
          whileHover={{
            backgroundColor: "rgba(139,94,60,0.05)",
            borderColor: "#8B5E3C",
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 border border-stone-300 text-[#8B5E3C] px-8 py-4 rounded-sm font-['Cinzel'] text-[10px] tracking-[0.25em] uppercase font-bold cursor-pointer transition-all flex items-center justify-center gap-3"
        >
          Our Story
        </motion.button>
      </div>
    </section>
  );
}
