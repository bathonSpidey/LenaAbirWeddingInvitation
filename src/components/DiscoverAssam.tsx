import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Activities from "./Activities";

// Updated assets based on your imports
import TeaGarden from "../assets/tea.png";
import Silk from "../assets/silk.webp";
import Rhinos from "../assets/kaziranga.jpeg";
import AssamTexture from "../assets/assam-texture.jpeg";

const TEXT_PRIMARY = "text-[#2D241E]"; // Deep Espresso for high contrast
const TEXT_ACCENT = "text-[#8B5E3C]"; // Burnt Sienna for sub-labels

const FeatureCard = ({
  title,
  desc,
  img,
  delay,
}: {
  title: string;
  desc: string;
  img?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="flex flex-col gap-4 group"
  >
    <div className="aspect-[4/5] overflow-hidden rounded-sm bg-stone-200 shadow-2xl border-[4px] border-white/90">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
    </div>
    <h2
      className={`font-['Cinzel'] text-xs tracking-[0.3em] ${TEXT_ACCENT} mt-2 uppercase font-bold`}
    >
      {title}
    </h2>
    <p
      className={`font-['Cormorant_Garamond'] text-lg italic ${TEXT_PRIMARY} leading-tight`}
    >
      {desc}
    </p>
  </motion.div>
);

export default function DiscoverAssam({ onBack }: { onBack: () => void }) {
  const [showActivities, setShowActivities] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (showActivities) {
    return <Activities onBack={() => setShowActivities(false)} />;
  }

  return (
    <div
      className="min-h-screen w-full py-20 px-6 md:px-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${AssamTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 1. THE READABILITY OVERLAY */}
      {/* This ensures the gold texture doesn't swallow your text */}
      <div className="absolute inset-0 bg-[#fdf8ec]/40 pointer-events-none" />

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none translate-x-1/4 -translate-y-1/4">
        <h1 className="text-[300px] font-['Cinzel'] select-none">ASSAM</h1>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -5 }}
          className={`${TEXT_ACCENT} mb-16 flex items-center gap-2 hover:text-amber-900 transition-colors cursor-pointer uppercase tracking-widest text-[10px] font-bold`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span>←</span> {t("common.backToInvitation")}
        </motion.button>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="md:pr-10">
            <h2
              className={`${TEXT_PRIMARY} mb-8 leading-tight`}
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(50px, 7vw, 82px)",
                textShadow: "1px 1px 0px rgba(255,255,255,0.5)",
              }}
            >
              {t("discoverAssam.heading")}
            </h2>
            <p
              className={`font-['Cormorant_Garamond'] text-2xl ${TEXT_PRIMARY} leading-relaxed italic mb-8 opacity-90`}
            >
              {t("discoverAssam.intro")}
            </p>
            <div className="h-px w-24 bg-[#8B5E3C]/40" />
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

        {/* Highlight Section - Using the Deep Espresso for the box to ground the page */}
        <div className="bg-[#2D241E] text-[#fdf8ec] p-12 md:p-20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="relative z-20 text-center max-w-2xl mx-auto">
            <h3 className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-6 text-amber-400/80">
              {t("discoverAssam.experience")}
            </h3>
            <p className="font-['Cormorant_Garamond'] text-2xl md:text-4xl italic leading-snug">
              {t("discoverAssam.quote")}
            </p>
          </div>
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${TeaGarden})` }}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2D241E] via-[#2D241E]/75 to-[#2D241E]/50" />
        </div>

        <div className="mt-20 text-center">
          <div className="flex justify-center gap-3 mb-4 opacity-30">
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
          </div>
          <p
            className={`font-['Cinzel'] text-[9px] tracking-[0.5em] ${TEXT_ACCENT} uppercase font-bold`}
          >
            {t("discoverAssam.wish")}
          </p>

          <motion.button
            onClick={() => setShowActivities(true)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="mt-12 inline-flex items-center gap-3 px-10 py-4 bg-[#2D241E] text-[#fdf8ec] rounded-sm shadow-lg hover:bg-amber-900 transition-colors cursor-pointer"
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.3em", fontSize: "10px" }}
          >
            <span>{t("discoverAssam.exploreActivities")}</span>
            <span className="text-amber-400/80">→</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
