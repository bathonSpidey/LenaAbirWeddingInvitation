import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import AssamTexture from "../assets/Activities.jpg";
import ImgKaziranga from "../assets/kaziranga.jpeg";
import ImgMajuli from "../assets/Majuli.jpg";
import ImgAhom from "../assets/sibsagarh.webp";
import ImgFood from "../assets/Food.webp";
import ImgRiver from "../assets/brahmaputra.jpg";
import ImgSilk from "../assets/silk.webp";
import Hollock from "../assets/Hollock.jpg";
import Horses from "../assets/ferel-horses.jpg";

const ACTIVITY_IMAGES = [ImgKaziranga, ImgMajuli, ImgAhom, ImgFood, ImgRiver, Hollock, ImgSilk, Horses];

const TEXT_PRIMARY = "text-[#2D241E]";
const TEXT_ACCENT = "text-[#8B5E3C]";

type ActivityCardProps = {
  number: string;
  tag: string;
  title: string;
  desc: string;
  img: string;
  delay: number;
};

const ActivityCard = ({
  number,
  tag,
  title,
  desc,
  img,
  delay,
}: ActivityCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay }}
    viewport={{ once: true }}
    className="relative overflow-hidden rounded-sm shadow-lg group aspect-[4/5]"
  >
    {/* Background image */}
    {img ? (
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    ) : (
      <div className="absolute inset-0 bg-[#2D241E]" />
    )}

    {/* Gradient overlay — bottom-up for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 transition-all duration-500" />
    {/* Top vignette so number + tag are always readable */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

    {/* Number — always top-left */}
    <span
      className="absolute top-5 left-6 z-10 font-['Cinzel'] text-[28px] font-bold leading-none tabular-nums"
      style={{ color: "rgba(255,255,255,0.7)" }}
    >
      {number}
    </span>

    {/* Tag — always top-right */}
    <span className="absolute top-5 right-6 z-10 font-['Cinzel'] text-[8px] tracking-[0.35em] uppercase font-bold text-amber-300 border border-amber-300/60 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-sm">
      {tag}
    </span>

    {/* Text — always bottom */}
    <div className="absolute bottom-0 left-0 right-0 z-10 p-7 flex flex-col gap-2">
      <h3 className="font-['Cinzel'] text-sm font-semibold text-white tracking-wide leading-snug group-hover:text-amber-200 transition-colors duration-300">
        {title}
      </h3>
      <div className="h-px w-8 bg-white/30" />
      <p className="font-['Cormorant_Garamond'] text-[17px] italic text-white/75 leading-relaxed">
        {desc}
      </p>
    </div>
  </motion.div>
);

export default function Activities({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  const activities = (t("activities.items", { returnObjects: true }) as Array<{ tag: string; title: string; desc: string }>).map(
    (item, i) => ({
      ...item,
      number: String(i + 1).padStart(2, "0"),
      img: ACTIVITY_IMAGES[i],
      delay: (i + 1) * 0.1,
    }),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen w-full py-20 px-6 md:px-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${AssamTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-[#fdf8ec]/50 pointer-events-none" />

      {/* Watermark */}
      <div className="absolute top-0 left-0 opacity-[0.025] pointer-events-none -translate-x-1/4 -translate-y-1/4">
        <h1 className="text-[280px] font-['Cinzel'] select-none leading-none">
          ASSAM
        </h1>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back button */}
        <motion.button
          onClick={onBack}
          whileHover={{ x: -5 }}
          className={`${TEXT_ACCENT} mb-16 flex items-center gap-2 hover:text-amber-900 transition-colors cursor-pointer uppercase tracking-widest text-[10px] font-bold`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span>←</span> {t("common.back")}
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mb-20"
        >
          <p
            className={`font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase ${TEXT_ACCENT} mb-4 font-bold`}
          >
            {t("activities.label")}
          </p>
          <h1
            className={`${TEXT_PRIMARY} leading-none mb-6`}
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(52px, 8vw, 96px)",
              textShadow: "1px 1px 0px rgba(255,255,255,0.5)",
            }}
          >
            {t("activities.heading")}
          </h1>
          <p
            className={`font-['Cormorant_Garamond'] text-xl italic ${TEXT_PRIMARY} opacity-75 max-w-xl leading-relaxed`}
          >
            {t("activities.subtitle")}
          </p>
          <div className="h-px w-24 bg-[#8B5E3C]/40 mt-8" />
        </motion.div>

        {/* Activities grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {activities.map((a) => (
            <ActivityCard key={a.title} {...a} />
          ))}
        </div>

        {/* Divider quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-[#2D241E] text-[#fdf8ec] px-10 py-12 md:py-16 md:px-20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)] text-center mb-20"
        >
          <p
            className={`font-['Cinzel'] text-[9px] tracking-[0.5em] uppercase text-amber-400/70 mb-5`}
          >
            {t("activities.noteLabel")}
          </p>
          <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl italic leading-snug">
            {t("activities.noteQuote")}
          </p>
        </motion.div>

        {/* Footer ornament */}
        <div className="mt-16 text-center">
          <div className="flex justify-center gap-3 mb-4 opacity-30">
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
          </div>
          <p
            className={`font-['Cinzel'] text-[9px] tracking-[0.5em] ${TEXT_ACCENT} uppercase font-bold`}
          >
            {t("activities.footerLabel")}
          </p>
        </div>
      </div>
    </div>
  );
}
