import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FloatingLeaves } from "./FloatingLeaves";
import { CulturalBridge } from "./CulturalBridge";
import { EdelweissIcon } from "./EdelweisIcon";
import { LotusIcon } from "./LotusIcon";
import { StoryMilestone } from "./StoryMilestone";
import Story from "../../assets/ourstory.jpg";
import FirstEncounter from "../../assets/firstencounter.jpg";
import LeapOfFaith from "../../assets/leapoffaith.jpg";
import Proposal from "../../assets/proposal.jpg";

// ─── milestone static config ──────────────────────────────────────────────────
// year, location, flag live here alongside translated title/desc from i18n
const MILESTONE_META = [
  { year: "2024", location: "Oberstdorf", flag: "🇩🇪", image: FirstEncounter },
  { year: "2024", location: "Baden-Baden", flag: "🇩🇪", image: LeapOfFaith },
  { year: "2025", location: "Rheinfall", flag: "🇨🇭", image: Proposal },
  { year: "2026", location: "🇩🇰 Denmark → 🇮🇳 Jorhat", flag: "" },
] as const;

// ─── component ────────────────────────────────────────────────────────────────
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
        backgroundAttachment: "fixed",
        // NOTE: backgroundAttachment: "fixed" is intentionally omitted —
        // it breaks on iOS Safari. Add a JS parallax solution if desired.
      }}
    >
      <FloatingLeaves />

      {/* Readability wash — gives text contrast over the photo */}
      <div className="absolute inset-0  backdrop-blur-[1px] pointer-events-none" />

      <div className="relative z-10">
        {/* Back button */}
        <motion.button
          onClick={onBack}
          whileHover={{ x: -8 }}
          className="mb-16 flex items-center gap-3 text-[#8E7B6B] hover:text-[#B98C8C] transition-all cursor-pointer uppercase tracking-[0.4em] text-[10px] font-['Cinzel']"
        >
          <span>←</span> {t("common.backToInvitation")}
        </motion.button>

        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2
              className="text-[#C9A84C] mb-4"
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

          {/* Milestones */}
          <div className="space-y-12">
            {MILESTONE_META.map((meta, i) => (
              <StoryMilestone
                key={i}
                index={i}
                year={meta.year}
                location={meta.location}
                flag={meta.flag}
                image={"image" in meta ? meta.image : undefined}
                title={milestones[i]?.title ?? ""}
                desc={milestones[i]?.desc ?? ""}
              />
            ))}
          </div>

          {/* Cultural bridge banner */}
          <CulturalBridge />

          {/* Footer */}
          <div className="text-center pb-20 opacity-70">
            <div className="flex items-center justify-center gap-6 mb-6">
              <EdelweissIcon className="w-6 h-6 text-[#AF944D]" />
              <div className="w-2 h-2 rotate-45 border border-[#AF944D]" />
              <LotusIcon className="w-6 h-6 text-[#AF944D]" />
            </div>
            <p className="font-['Cinzel'] text-[10px] tracking-[0.6em] uppercase text-[#AF944D]">
              Bis bald <span className="mx-2 opacity-30">|</span> আকৌ লগ পাম
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
