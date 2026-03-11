import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FloatingLeaves } from "./FloatingLeaves";
import Story from "../../assets/ourstory.jpg";
import FirstEncounter from "../../assets/firstencounter.jpg";
import LeapOfFaith from "../../assets/leapoffaith.jpg";
import Proposal from "../../assets/proposal.jpg";

// ── Cultural icons ──────────────────────────────────────
const EdelweissIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    {/* Six white petals */}
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <ellipse
        key={deg}
        cx="12"
        cy="12"
        rx="2.2"
        ry="5"
        fill="currentColor"
        opacity="0.85"
        transform={`rotate(${deg} 12 12)`}
      />
    ))}
    {/* Fuzzy centre disc */}
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <circle cx="12" cy="12" r="1.8" fill="white" opacity="0.4" />
  </svg>
);

const LotusIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    {/* Three back petals */}
    <path
      d="M12 18 C9 14 7 10 12 6 C17 10 15 14 12 18Z"
      fill="currentColor"
      opacity="0.35"
    />
    <path
      d="M12 18 C7  15 4  11  7  7  C10 8  11 13 12 18Z"
      fill="currentColor"
      opacity="0.35"
    />
    <path
      d="M12 18 C17 15 20 11 17  7  C14 8  13 13 12 18Z"
      fill="currentColor"
      opacity="0.35"
    />
    {/* Three front petals */}
    <path
      d="M12 18 C9.5 13 9 9 12 7   C15 9 14.5 13 12 18Z"
      fill="currentColor"
      opacity="0.75"
    />
    <path
      d="M12 18 C7.5 14 6 9.5 9 7  C11 9  11.5 14 12 18Z"
      fill="currentColor"
      opacity="0.75"
    />
    <path
      d="M12 18 C16.5 14 18 9.5 15 7 C13 9  12.5 14 12 18Z"
      fill="currentColor"
      opacity="0.75"
    />
    {/* Stamen */}
    <circle cx="12" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

const Pin = ({ image, title }: { image?: string; title: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="w-28 h-28 md:w-32 md:h-32 rounded-full border-[3px] border-white/90 shadow-xl overflow-hidden bg-stone-100 flex-shrink-0 ring-1 ring-amber-300/30"
    style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
  >
    {image ? (
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover block"
        loading="lazy"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-amber-50">
        <div className="w-2 h-2 rotate-45 bg-amber-300 border border-amber-400/50" />
      </div>
    )}
  </motion.div>
);

const StoryMilestone = ({
  year,
  title,
  desc,
  image,
  index,
  location,
  flag,
}: {
  year: string;
  title: string;
  desc: string;
  image?: string;
  index: number;
  location: string;
  flag: string;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      // Changed 'x' to 'y' to prevent horizontal scroll-stuttering
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }} // Lower amount makes scrolling feel much lighter
      className={`flex items-start gap-8 md:gap-12 mb-20 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Pin + year */}
      <div className="flex flex-col items-center gap-3 flex-shrink-0">
        <span className="font-['Cinzel'] text-[11px] font-bold tracking-widest text-amber-800/80">
          {year}
        </span>
        <Pin image={image} title={title} />
        {/* Location badge */}
        <span className="mt-1 px-3 py-1 rounded-full bg-white/60 text-stone-600 border border-stone-200 shadow-sm text-[9px] tracking-widest font-['Cinzel'] flex items-center gap-2 whitespace-nowrap">
          <span className="scale-125">{flag}</span>
          {location}
        </span>
      </div>

      {/* Text Container */}
      <div
        className={`flex-1 pt-6 border-b border-stone-200/30 pb-10 ${
          isEven ? "text-left" : "text-right"
        }`}
      >
        <h4 className="font-['Cinzel'] text-[10px] uppercase tracking-[0.4em] text-amber-900/60 mb-4 font-bold">
          {title}
        </h4>
        <p className="font-['Cormorant_Garamond'] text-[22px] md:text-[24px] italic text-stone-800 leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default function OurStory({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  const milestones = t("ourStory.milestones", {
    returnObjects: true,
  }) as Array<{ title: string; desc: string }>;
  return (
    <div
      className="min-h-screen w-full  p-8 md:p-20 relative"
      style={{
        backgroundImage: `url(${Story})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FloatingLeaves />
      {/* Readability overlay */}
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative z-10">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -5 }}
          className="mb-12 flex items-center gap-2 text-stone-400 hover:text-amber-700 transition-colors cursor-pointer uppercase tracking-widest text-[9px]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span>←</span> {t("common.backToInvitation")}
        </motion.button>

        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-stone-800 text-center mb-2"
            style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 60 }}
          >
            {t("ourStory.heading")}
          </motion.h2>

          {/* Bilingual subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center font-['Cinzel'] text-[9px] tracking-[0.35em] uppercase text-stone-400 mb-3 flex items-center justify-center gap-3"
          >
            <EdelweissIcon className="w-4 h-4 text-stone-400 inline-block" />
            Unsere Reise
            <span className="text-amber-400/60">·</span>
            আমাদের যাত্ৰা
            <LotusIcon className="w-4 h-4 text-amber-500/70 inline-block" />
          </motion.p>

          <div className="flex justify-center mb-14">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
          </div>

          {/* Milestones */}
          <div>
            <StoryMilestone
              index={0}
              year="2024"
              title={milestones[0].title}
              location="Oberstdorf"
              flag="🇩🇪"
              desc={milestones[0].desc}
              image={FirstEncounter}
            />
            <StoryMilestone
              index={1}
              year="2024"
              title={milestones[1].title}
              location="Baden-Baden"
              flag="🇩🇪"
              desc={milestones[1].desc}
              image={LeapOfFaith}
            />
            <StoryMilestone
              index={2}
              year="2025"
              title={milestones[2].title}
              location="Rheinfall"
              flag="🇨🇭"
              desc={milestones[2].desc}
              image={Proposal}
            />
            <StoryMilestone
              index={3}
              year="2026"
              title={milestones[3].title}
              location="Denmark → Jorhat"
              flag="🇩🇰🇮🇳"
              desc={milestones[3].desc}
            />
          </div>

          {/* CULTURAL BRIDGE BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            /* Updated to Rose Quartz (#B98C8C) with a deeper shadow for depth */
            className="my-24 bg-[#B98C8C] text-[#FDFBF7] rounded-sm px-8 py-14 text-center shadow-[0_20px_50px_rgba(185,140,140,0.3)] relative overflow-hidden"
          >
            {/* Subtle Silk/Paper Texture Overlay */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
              }}
            />

            {/* Header with Icons */}
            <p className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase text-[#FDFBF7]/90 mb-8 flex items-center justify-center gap-4 relative z-10">
              <EdelweissIcon className="w-4 h-4" />
              Two Continents <span className="opacity-40">|</span> One Story
              <LotusIcon className="w-4 h-4" />
            </p>

            {/* Main Quote - German & Assamese Bridge */}
            <div className="space-y-6 relative z-10">
              <p className="font-['Cormorant_Garamond'] text-3xl md:text-4xl italic leading-tight">
                "Zwei Welten, ein Herz — von den Alpen bis zum Brahmaputra."
              </p>

              {/* Decorative Divider */}
              <div className="flex justify-center items-center gap-3 opacity-30">
                <div className="h-[0.5px] w-12 bg-white" />
                <div className="w-1 h-1 rotate-45 bg-white" />
                <div className="h-[0.5px] w-12 bg-white" />
              </div>

              <p className="font-['Cormorant_Garamond'] text-lg md:text-xl italic text-[#FDFBF7]/80 max-w-2xl mx-auto leading-relaxed">
                দুই পৃথিৱী, এটি হৃদয় — আল্পছৰ পৰা ব্ৰহ্মপুত্ৰলৈ।
              </p>

              <p className="font-['Cormorant_Garamond'] text-[15px] tracking-wide italic text-[#FDFBF7]/60">
                Two worlds, one heart — from the Alps to the Brahmaputra.
              </p>
            </div>
          </motion.div>

          {/* FINAL ORNAMENT - Updated to Assamese */}
          <div className="text-center mt-12 pb-20 opacity-60">
            <div className="flex items-center justify-center gap-5 mb-6">
              <EdelweissIcon className="w-5 h-5 text-[#B98C8C]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#B98C8C]" />
              <LotusIcon className="w-5 h-5 text-[#B98C8C]" />
            </div>
            <p className="font-['Cinzel'] text-[9px] tracking-[0.5em] uppercase text-stone-600 font-bold">
              Bis bald <span className="mx-2 opacity-30">|</span> আকৌ লগ পাম
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
