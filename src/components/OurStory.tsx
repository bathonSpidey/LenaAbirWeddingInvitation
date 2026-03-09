import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Story from "../assets/ourstory.jpg";
import FirstEncounter from "../assets/firstencounter.jpg";
import LeapOfFaith from "../assets/leapoffaith.jpg";
import Proposal from "../assets/proposal.jpg";

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
    whileHover={{ scale: 1.07 }}
    transition={{ duration: 0.3 }}
    className="w-28 h-28 md:w-32 md:h-32 rounded-full border-[3px] border-white/90 shadow-xl overflow-hidden bg-stone-100 flex-shrink-0 ring-1 ring-amber-300/50"
    style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
  >
    {image ? (
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover block"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-amber-50">
        <div className="w-2 h-2 rotate-45 bg-amber-300 border border-amber-400" />
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
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`flex items-center gap-8 md:gap-12 mb-16 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Pin + year */}
      <div className="flex flex-col items-center gap-3 flex-shrink-0">
        <span className="font-['Cinzel'] text-[11px] tracking-widest text-amber-700">
          {year}
        </span>
        <Pin image={image} title={title} />
        {/* Location badge */}
        <span className="mt-1 px-2 py-0.5 rounded-full bg-stone-800/8 text-stone-500 border border-stone-300/50 text-[9px] tracking-widest font-['Cinzel'] flex items-center gap-1 whitespace-nowrap">
          <span
            style={{
              fontFamily:
                "'Twemoji Mozilla', 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
            }}
          >
            {flag}
          </span>
          {location}
        </span>
      </div>

      {/* Text */}
      <div
        className={`flex-1 border-b border-stone-200/40 pb-8 ${
          isEven ? "text-left" : "text-right"
        }`}
      >
        <h4 className="font-['Cinzel'] text-[10px] uppercase tracking-[0.3em] text-amber-800/80 mb-3">
          {title}
        </h4>
        <p className="font-['Cormorant_Garamond'] text-[21px] italic text-stone-700 leading-relaxed">
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
      className="min-h-screen w-full bg-[#fdf8ec] p-8 md:p-20 relative"
      style={{
        backgroundImage: `url(${Story})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-[#fdf8ec]/75 pointer-events-none" />

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

          {/* Cultural bridge banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="my-16 bg-[#2D241E] text-[#fdf8ec] rounded-sm px-10 py-8 text-center shadow-lg"
          >
            <p className="font-['Cinzel'] text-[9px] tracking-[0.5em] uppercase text-amber-400/70 mb-4 flex items-center justify-center gap-3">
              <EdelweissIcon className="w-4 h-4 text-amber-400/70" />
              Two Continents · One Story
              <LotusIcon className="w-4 h-4 text-amber-400/70" />
            </p>
            <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl italic leading-snug">
              "Zwei Welten, ein Herz — von den Alpen bis zum Brahmaputra."
            </p>
            <p className="font-['Cormorant_Garamond'] text-base italic text-stone-400 mt-3">
              Two worlds, one heart — from the Alps to the Brahmaputra.
            </p>
          </motion.div>

          <div className="text-center mt-4 opacity-40">
            <div className="flex items-center justify-center gap-4 mb-4">
              <EdelweissIcon className="w-5 h-5 text-stone-600" />
              <div className="w-1.5 h-1.5 rotate-45 border border-amber-500" />
              <LotusIcon className="w-5 h-5 text-amber-700" />
            </div>
            <p className="font-['Cinzel'] text-[8px] tracking-[0.4em] uppercase">
              Bis bald · আহক লগ পাওঁ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
