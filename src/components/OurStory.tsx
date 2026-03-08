import { motion } from "framer-motion";
import Story from "../assets/ourstory.jpg"; // Adjust the path based on your folder structure

const StoryMilestone = ({
  year,
  title,
  desc,
}: {
  year: string;
  title: string;
  desc: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex gap-8 mb-12 items-start"
  >
    <div className="text-amber-600 font-['Cinzel'] text-sm tracking-tighter pt-1">
      {year}
    </div>
    <div className="flex-1 border-l border-amber-200 pl-8 pb-4">
      <h4 className="font-['Cinzel'] text-xs uppercase tracking-widest text-stone-800 mb-2">
        {title}
      </h4>
      <p className="font-['Cormorant_Garamond'] text-lg italic text-stone-500 leading-relaxed">
        {desc}
      </p>
    </div>
  </motion.div>
);

export default function OurStory({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="min-h-screen w-full bg-[#fdf8ec] p-8 md:p-20 relative snap-start"
      style={{
        backgroundImage: `url(${Story})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-stone-400 hover:text-amber-700 transition-colors cursor-pointer uppercase tracking-widest text-[9px]"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        <span>←</span> Back
      </motion.button>

      <div className="max-w-3xl mx-auto">
        <h2
          className="text-stone-800 text-center mb-16"
          style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 60 }}
        >
          Our Journey
        </h2>

        <StoryMilestone
          year="2018"
          title="The First Encounter"
          desc="A chance meeting at a rainy coffee shop in Jorhat, where a shared umbrella started it all."
        />
        <StoryMilestone
          year="2021"
          title="The Leap of Faith"
          desc="Three years of laughter, thousands of miles traveled, and the realization that 'home' was a person, not a place."
        />
        <StoryMilestone
          year="2025"
          title="The Proposal"
          desc="Under a canopy of stars, he asked, and through tears of joy, she said yes."
        />

        <div className="text-center mt-20 opacity-40">
          <div className="w-1.5 h-1.5 rotate-45 border border-amber-500 mx-auto mb-4" />
          <p className="font-['Cinzel'] text-[8px] tracking-[0.4em] uppercase">
            To be continued...
          </p>
        </div>
      </div>
    </div>
  );
}
