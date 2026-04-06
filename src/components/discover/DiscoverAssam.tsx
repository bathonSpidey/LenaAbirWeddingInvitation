import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FeatureCard from "./FeaturedCard";
import { WARM_WHITE, ASSAM_QUOTE } from "./Constants";

// Updated assets based on your imports
import TeaGarden from "../../assets/tea.png";
import Silk from "../../assets/silk.webp";
import Rhinos from "../../assets/kaziranga.jpeg";
import AssamTexture from "../../assets/assam-texture.jpeg";
import { AssameseLaceBorder } from "./AssameseLaceBorder";

export default function DiscoverAssam({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();

  return (
    <motion.div
      className="min-h-screen w-full py-20 px-6 md:px-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${AssamTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Soft warm veil over the gold — just enough to lift light text without killing the texture */}
      <div className="absolute inset-0 bg-[#C8860A]/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back button — warm white on gold bg */}
        <motion.button
          onClick={onBack}
          whileHover={{ x: -5 }}
          className={`${WARM_WHITE} mb-16 flex items-center gap-2 hover:text-[#C0392B] transition-colors cursor-pointer uppercase tracking-widest text-[10px] font-bold font-['Cinzel'] drop-shadow-sm`}
        >
          <span>←</span> {t("common.backToInvitation")}
        </motion.button>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="md:pr-10">
            {/* Heading: warm white floating on gold — Bridgerton title card energy */}
            <h2
              className={`${WARM_WHITE} mb-8 leading-tight`}
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(50px, 7vw, 82px)",
                textShadow:
                  "1px 1px 0px #FAF3E8, 3px 3px 15px rgba(61,21,21,0.2)",
              }}
            >
              {t("discoverAssam.heading")}
            </h2>
            <p
              className={`font-['Cormorant_Garamond'] text-2xl ${WARM_WHITE} leading-relaxed italic mb-8 opacity-95`}
              style={{ textShadow: "0 1px 6px rgba(80,20,0,0.2)" }}
            >
              {t("discoverAssam.intro")}
            </p>
            {/* Divider in Burnished Gold */}
            <div className="h-[2px] w-24 bg-[#D4AF6A]" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FeatureCard
              delay={0.2}
              title={t("discoverAssam.feature1Title")}
              desc={t("discoverAssam.feature1Desc")}
              img={Silk}
            />
            <div className="pt-16">
              <FeatureCard
                delay={0.4}
                title={t("discoverAssam.feature2Title")}
                desc={t("discoverAssam.feature2Desc")}
                img={Rhinos}
              />
            </div>
          </div>
        </div>

        {/* HIGHLIGHT BOX: Flipped to warm ivory — light panel, deep wine quote text */}
        <div className="bg-[#F8F0E0]/90 p-12 md:p-20 rounded-sm shadow-[0_25px_60px_rgba(80,20,0,0.25)] relative overflow-hidden border border-[#D4AF6A]/70">
          <div className="relative z-20 text-center max-w-2xl mx-auto">
            <h3 className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-6 text-[#C0392B]">
              {t("discoverAssam.experience")}
            </h3>
            <p
              className={`font-['Cormorant_Garamond'] text-2xl md:text-4xl italic leading-snug ${ASSAM_QUOTE}`}
            >
              {t("discoverAssam.quote")}
            </p>
          </div>

          {/* Tea garden photo at full color, very low opacity — bleeds warmth in */}
          <div
            className="absolute inset-0 opacity-100 bg-cover bg-center"
            style={{ backgroundImage: `url(${TeaGarden})` }}
          />
          {/* Ivory wash to keep text crisp */}
          <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#F8F0E0]/80 via-[#F8F0E0]/60 to-[#F8F0E0]/40" />

          {/* Gold corner ornament — top left */}
          <div className="absolute top-6 left-6 z-20 opacity-40">
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              className="z-20"
            >
              <path
                d="M10 10C30 10 45 25 45 45M10 10C10 30 25 45 45 45M10 10L30 30"
                stroke="#D4AF6A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="45" cy="45" r="3" fill="#C0392B" />{" "}
              {/* A "ruby" drop */}
            </svg>
          </div>

          {/* Gold corner ornament — bottom right */}
          <div className="absolute bottom-6 right-6 z-20 opacity-40 rotate-180">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M2 2 Q20 2 20 20 Q20 2 38 2"
                stroke="#D4AF6A"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M2 38 Q2 20 20 20 Q2 20 2 2"
                stroke="#D4AF6A"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="20" cy="20" r="2" fill="#D4AF6A" />
            </svg>
          </div>
        </div>

        {/* EXPLORE BUTTON — Crimson with warm white text */}
        <div className="absolute bottom-6 right-6 z-20 opacity-40 rotate-180">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M2 2 Q20 2 20 20 Q20 2 38 2"
              stroke="#D4AF6A"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M2 38 Q2 20 20 20 Q2 20 2 2"
              stroke="#D4AF6A"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="20" cy="20" r="2" fill="#D4AF6A" />
          </svg>
        </div>
      </div>

      {/* EXPLORE BUTTON — Crimson with warm white text, lace frame */}
      <div className="mt-20 text-center">
        <AssameseLaceBorder>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-4 px-12 py-5 bg-[#C0392B] text-[#FDF8F0] rounded-full shadow-[0_10px_30px_rgba(192,57,43,0.35)] hover:bg-[#A93226] transition-colors cursor-pointer group"
            style={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: "0.3em",
              fontSize: "11px",
            }}
          >
            <span>{t("discoverAssam.exploreActivities")}</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.button>
        </AssameseLaceBorder>
      </div>
    </motion.div>
  );
}
