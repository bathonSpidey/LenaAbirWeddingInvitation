import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FloatingLeaves } from "./FloatingLeaves";
import { CulturalBridge } from "./CulturalBridge";
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
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ scale: 1.1, rotate: 2 }}
    /* Updated: Added a Deep Moss Green ring and background */
    className="w-40 h-48 md:w-36 md:h-36 rounded-full border-[3px] border-[#D4AF37]  shadow-2xl overflow-hidden bg-[#3E4A3D] flex-shrink-0 ring-4 ring-[#3E4A3D]/10 relative z-20"
    style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
  >
    {image ? (
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover block contrast-[1.05] brightness-[0.95]"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        {/* Gold Diamond on Green Background */}
        <div className="w-3 h-3 rotate-45 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`flex items-center gap-8 md:gap-16 mb-24 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Pin + Year + Location Group */}
      <div className="flex flex-col items-center gap-4 flex-shrink-0">
        <span className="font-['Cinzel'] text-[12px] tracking-[0.3em] font-bold text-[#708090]">
          {year}
        </span>

        <Pin image={image} title={title} />

        <span className="mt-2 px-3 py-1 rounded-full bg-[#F8F0E0] text-[#3E4A3D] border border-[#B98C8C]/30 text-[9px] tracking-widest font-['Cinzel'] font-bold flex items-center gap-2 whitespace-nowrap shadow-sm ">
          <span className="text-[12px] ">{flag}</span>
          {location}
        </span>
      </div>

      {/* Text Content */}
      <div
        className={`flex-1 border-b border-[#B98C8C]/20 pb-10 ${
          isEven ? "text-left" : "text-right"
        }`}
      >
        <h4 className="font-['Cinzel'] text-[13px] uppercase tracking-[0.4em] text-[#A67C7C] mb-4 font-bold">
          {title}
        </h4>
        <p className="font-['Cormorant_Garamond'] text-[22px] md:text-[26px] italic text-stone-800 leading-relaxed max-w-xl inline-block">
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
      className="min-h-screen w-full p-8 md:p-20 relative"
      style={{
        backgroundImage: `url(${Story})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Keeps bg stable while content moves
      }}
    >
      <FloatingLeaves />

      {/* 1. Improved Readability Overlay */}
      <div className="absolute inset-0  backdrop-blur-[1px] pointer-events-none" />

      <div className="relative z-10">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -8 }}
          className="mb-16 flex items-center gap-3 text-[#A67C7C] hover:text-[#B98C8C] transition-all cursor-pointer uppercase tracking-[0.4em] text-[10px] font-bold font-['Cinzel']"
        >
          <span>←</span> {t("common.backToInvitation")}
        </motion.button>

        <div className="max-w-4xl mx-auto">
          {/* 2. Enhanced Heading Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2
              className="text-[#8E6D6D] mb-4"
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(60px, 8vw, 85px)",
              }}
            >
              {t("ourStory.heading")}
            </h2>

            <p className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase text-[#A67C7C] flex items-center justify-center gap-5">
              <EdelweissIcon className="w-5 h-5 opacity-70" />
              Unsere Reise <span className="opacity-30">·</span> আমাৰ যাত্ৰা
              <LotusIcon className="w-5 h-5 opacity-70" />
            </p>

            <div className="mt-8 flex justify-center">
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#B98C8C]/40 to-transparent" />
            </div>
          </motion.div>

          {/* 3. Milestones with Floating Animation */}
          <div className="space-y-12">
            {/* In your StoryMilestone component, ensure you wrap the <Pin /> 
              in a motion div with this floating animation:
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            */}
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
          <CulturalBridge />

          {/* FINAL FOOTER */}
          <div className="text-center pb-20 opacity-70">
            <div className="flex items-center justify-center gap-6 mb-6">
              <EdelweissIcon className="w-6 h-6 text-[#AF944D]" />
              <div className="w-2 h-2 rotate-45 border border-[#AF944D]" />
              <LotusIcon className="w-6 h-6 text-[#AF944D]" />
            </div>
            <p className="font-['Cinzel'] text-[10px] tracking-[0.6em] uppercase text-[#AF944D] font-bold">
              Bis bald <span className="mx-2 opacity-30">|</span> আকৌ লগ পাম
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
