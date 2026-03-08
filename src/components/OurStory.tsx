import { motion } from "framer-motion";
import Story from "../assets/ourstory.jpg";
import FirstEncounter from "../assets/firstencounter.jpg";
import LeapOfFaith from "../assets/leapoffaith.jpg"; // Adjust the path based on your folder structure
import Proposal from "../assets/proposal.jpg"; // Adjust the path based on your folder structure

const StoryMilestone = ({
  year,
  title,
  desc,
  image,
}: {
  year: string;
  title: string;
  desc: string;
  image?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex gap-6 md:gap-10 mb-16 items-start relative"
  >
    {/* The Timeline Pin Section */}
    <div className="flex flex-col items-center">
      <div className="text-amber-700 font-['Cinzel'] text-[11px] tracking-widest mb-3">
        {year}
      </div>

      {/* The Circular Pin */}
      <div className="relative">
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white shadow-lg overflow-hidden bg-stone-100 flex-shrink-0 z-10 relative aspect-square"
          style={{
            transform: "translateZ(0)", // Forces GPU rendering for crisper edges
            backfaceVisibility: "hidden",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover block"
              style={{
                imageRendering: "auto",
                objectPosition: "center",
                /* This tells the browser to use the display's actual pixel density */
                contentVisibility: "auto",
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-amber-50">
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
            </div>
          )}
        </div>
        {/* Connection Line Decorator */}
        <div className="absolute top-full left-1/2 w-px h-16 bg-gradient-to-b from-amber-200 to-transparent -translate-x-1/2" />
      </div>
    </div>

    {/* The Text Section */}
    <div className="flex-1 pt-8 md:pt-11 border-b border-stone-200/50 pb-8">
      <h4 className="font-['Cinzel'] text-[10px] uppercase tracking-[0.3em] text-stone-800 mb-3">
        {title}
      </h4>
      <p className="font-['Cormorant_Garamond'] text-[20px] italic text-stone-600 leading-relaxed max-w-lg">
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
          year="2024"
          title="The First Encounter"
          desc="A planned meeting at a Shushi restaurant in Osnabrück followed by a quick escapade to the lush green mountains of Oberstdorf, where we discovered that the best adventures are the ones you don't plan."
          image={FirstEncounter}
        />
        <StoryMilestone
          year="2024"
          title="The Leap of Faith"
          desc="After a year of adventures, laughter, and the realization that 'home' was a person, not a place."
          image={LeapOfFaith}
        />
        <StoryMilestone
          year="2025"
          title="The Proposal"
          desc="In the mist of the Rheinfall on a warm afternoon, he asked the question, and she said yes"
          image={Proposal}
        />

        <StoryMilestone
          year="2026"
          title="The Wedding"
          desc="A private escapade to Denmark; just us and the officials to witness our quiet 'I do'."
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
