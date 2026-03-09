import { useEffect } from "react";
import { motion } from "framer-motion";

import AssamTexture from "../assets/Activities.jpg";
import ImgKaziranga from "../assets/kaziranga.jpeg";
import ImgMajuli from "../assets/Majuli.jpg";
import ImgAhom from "../assets/sibsagarh.webp";
import ImgFood from "../assets/Food.webp";
import ImgRiver from "../assets/brahmaputra.jpg";
import ImgSilk from "../assets/silk.webp";
import Hollock from "../assets/Hollock.jpg";
import Horses from "../assets/ferel-horses.jpg";

const TEXT_PRIMARY = "text-[#2D241E]";
const TEXT_ACCENT = "text-[#8B5E3C]";

const activities = [
  {
    number: "01",
    tag: "Nature & Wildlife",
    title: "Kaziranga at Dawn",
    desc: "At sunrise, the mist parts to reveal one-horned rhinos grazing beside the Brahmaputra. Join a jeep or elephant safari through UNESCO-listed Kaziranga — home to more rhinos than anywhere else on earth, alongside tigers, wild elephants, and hundreds of migratory birds.",
    img: ImgKaziranga,
    delay: 0.1,
  },
  {
    number: "02",
    tag: "River & Islands",
    title: "Majuli Island",
    desc: "The world's largest river island and a cradle of Vaishnavite culture. Explore ancient satras (monasteries), watch mask-making artisans, and cycle through paddy fields as the Brahmaputra wraps around you. Best reached by a short ferry from Jorhat.",
    img: ImgMajuli,
    delay: 0.2,
  },
  {
    number: "03",
    tag: "Culture & Heritage",
    title: "Ahom Heritage Trails",
    desc: "Walk among the imposing Rang Ghar pavilion and Kareng Ghar palace in Sibasagar — 600-year-old monuments of the Ahom kingdom that ruled Assam for nearly six centuries without a single Mughal conquest.",
    img: ImgAhom,
    delay: 0.3,
  },
  {
    number: "04",
    tag: "Food & Markets",
    title: "Jorhat Food Trail",
    desc: "Follow the aromas through Jorhat's markets: freshly smoked duck with mustard, sticky rice steamed inside bamboo, and the unmistakable tang of khar. Stop at a local home for a full Assamese thali — food here is not just sustenance, it is ceremony.",
    img: ImgFood,
    delay: 0.4,
  },
  {
    number: "05",
    tag: "River Life",
    title: "Brahmaputra River Cruise",
    desc: "Drift along one of Asia's mightiest rivers as golden evening light paints the water amber. Stop at midstream sandbanks where rare Gangetic river dolphins surface beside the boat, and watch fishermen cast their nets as the sky turns pink.",
    img: ImgRiver,
    delay: 0.5,
  },
  {
    number: "06",
    tag: "Rainforest & Wildlife",
    title: "Dehing Patkai Rainforest",
    desc: "Venture east into one of India's last surviving lowland rainforests. Listen for the rare Hoolock gibbon calling through a canopy shared with clouded leopards, hornbills, and slow lorises — a world that feels entirely untouched.",
    img: Hollock,
    delay: 0.6,
  },
  {
    number: "07",
    tag: "Craft & Textile",
    title: "Muga Silk Weaving",
    desc: "Travel to Sualkuchi — Assam's silk village — to watch artisans transform golden Muga cocoons into the world's only naturally gold silk. The soft clatter of heritage handlooms fills every home, and every weaver has a story spanning generations.",
    img: ImgSilk,
    delay: 0.7,
  },
  {
    number: "08",
    tag: "Wild & Rare",
    title: "Dibru-Saikhowa Feral Horses",
    desc: "One of the rarest sights in Asia: wild horses roaming freely across the floodplains of Dibru-Saikhowa National Park. An early morning jeep ride brings you close to herds that have run untamed since the Indo-Burma border wars.",
    img: Horses,
    delay: 0.8,
  },
];

const ActivityCard = ({
  number,
  tag,
  title,
  desc,
  img,
  delay,
}: (typeof activities)[0]) => (
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
          <span>←</span> Back
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
            While You're Here
          </p>
          <h1
            className={`${TEXT_PRIMARY} leading-none mb-6`}
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(52px, 8vw, 96px)",
              textShadow: "1px 1px 0px rgba(255,255,255,0.5)",
            }}
          >
            Things to Experience
          </h1>
          <p
            className={`font-['Cormorant_Garamond'] text-xl italic ${TEXT_PRIMARY} opacity-75 max-w-xl leading-relaxed`}
          >
            Assam rewards the curious traveller. Here are our favourite things
            to do — experiences we'd love to share with you beyond the wedding
            itself.
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
            A Note From Us
          </p>
          <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl italic leading-snug">
            "Jorhat is our home — and we hope it becomes a small part of yours.
            <br className="hidden md:block" /> Take it slowly. Eat well. Watch
            the river."
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
            We can't wait to explore with you
          </p>
        </div>
      </div>
    </div>
  );
}
