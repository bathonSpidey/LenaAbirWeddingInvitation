import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import RSVPTexture from "../assets/ExpectTexture.jpeg";
import ImgCeremony from "../assets/fusion.png";
import ImgDressCode from "../assets/silk.webp";
import ImgFood from "../assets/Food.webp";
import ImgMusic from "../assets/Majuli.jpg";
import ImgWeather from "../assets/tea.png";
import ImgWarmth from "../assets/brahmaputra.jpg";

const ITEM_IMAGES = [ImgCeremony, ImgDressCode, ImgFood, ImgMusic, ImgWeather, ImgWarmth];

interface ExpectationsProps {
  innerRef: React.RefObject<HTMLDivElement>;
  onBack: () => void;
}



const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Expectations({ innerRef, onBack }: ExpectationsProps) {
  const { t } = useTranslation();
  const items = (t("expectations.items", { returnObjects: true }) as Array<{ tag: string; title: string; desc: string }>).map(
    (item, i) => ({ ...item, number: String(i + 1).padStart(2, "0"), img: ITEM_IMAGES[i] }),
  );

  return (
    <section
      ref={innerRef}
      className="min-h-screen w-full bg-[#fdf8ec] snap-start relative overflow-hidden"
      style={{ backgroundImage: `url(${RSVPTexture})`, backgroundSize: "cover" }}
    >
      {/* ── Ambient ornament ── */}
      <div className="absolute top-[-8%] right-[-6%] opacity-[0.04] select-none pointer-events-none">
        <h1 className="text-[260px] font-['Cinzel'] leading-none">∞</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-16 py-20">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-['Cinzel'] text-[9px] tracking-[0.35em] uppercase text-amber-800 mb-4">
            {t("expectations.label")}
          </p>
          <h2 className="font-['Pinyon_Script'] text-6xl md:text-7xl text-stone-800 mb-4 leading-tight">
            {t("expectations.heading")}
          </h2>
          <div className="w-16 h-px bg-amber-600 mb-6" />
          <p className="font-['Cormorant_Garamond'] text-xl text-stone-500 italic max-w-lg leading-relaxed">
            {t("expectations.subtitle")}
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative overflow-hidden rounded-sm min-h-[320px] flex flex-col justify-end group"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/60" />

              {/* number watermark top-right */}
              <span className="absolute top-4 right-5 font-['Cinzel'] text-3xl text-white/15 font-bold leading-none select-none">
                {item.number}
              </span>

              {/* content pinned to bottom */}
              <div className="relative z-10 p-6">
                <span className="inline-block font-['Cinzel'] text-[8px] tracking-[0.3em] uppercase text-amber-300 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-sm mb-3">
                  {item.tag}
                </span>
                <h3
                  className="font-['Cinzel'] text-[12px] tracking-wider text-white font-semibold uppercase mb-2"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 2px 24px rgba(0,0,0,0.7)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-['Cormorant_Garamond'] text-[16px] leading-relaxed text-white/90 italic"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.95), 0 2px 16px rgba(0,0,0,0.8)" }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Back button ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={onBack}
            className="border border-stone-400 text-stone-600 py-2 px-10 text-[10px] font-['Cinzel'] tracking-[0.3em] uppercase cursor-pointer hover:border-amber-600 hover:text-amber-700 transition-all duration-300"
          >
            {t("common.backToDetails")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
