import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CountdownStrip from "./BridgertonCountdown";
import FlowerSlider from "./Slider";

const DiamondDivider = () => (
  <div className="flex items-center justify-center gap-2 w-full my-3">
    <div className="h-px w-12 bg-amber-400/40" />
    <div className="w-1.5 h-1.5 rotate-45 border border-amber-500/60" />
    <div className="h-px w-12 bg-amber-400/40" />
  </div>
);

const Corner = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" width="28" height="28" className={className}>
    <path
      d="M6 6 L6 20 M6 6 L20 6"
      stroke="#C9A84C"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

export default function CardContent({
  onDecline,
  onRSVP,
}: {
  onDecline: () => void;
  onRSVP: () => void;
}) {
  const { t } = useTranslation();
  const [sliderKey, setSliderKey] = useState(0);

  return (
    <div
      className="m-1 rounded relative overflow-hidden" // Reduced outer margin
      style={{
        padding: "15px 20px 10px", // Reduced internal padding
        border: "1px solid rgba(201,168,76,0.3)",
        boxShadow: "inset 0 0 12px rgba(120,90,30,0.08)",
        background: "transparent",
      }}
    >
      <Corner className="absolute top-1 left-1 opacity-40" />
      <Corner className="absolute top-1 right-1 rotate-90 opacity-40" />
      <Corner className="absolute bottom-1 right-1 rotate-180 opacity-40" />
      <Corner className="absolute bottom-1 left-1 -rotate-90 opacity-40" />

      <div className="flex flex-col items-center text-center">
        {/* Honor Text - Slightly bigger but tighter tracking */}
        <p
          className="tracking-[0.2em] font-semibold uppercase mb-4 pb-2 text-amber-800/80"
          style={{ fontFamily: "'Cinzel', serif", fontSize: 14 }}
        >
          {t("card.honor")}
        </p>

        {/* BRIDE & GROOM - Max Impact, Minimum height */}
        <div className="flex flex-col items-center mb-1">
          <h1
            className="text-stone-800 leading-[0.9] select-none"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: 54, // Reduced from 92px for better balance
              textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.05)",
            }}
          >
            Abir & Lena
          </h1>
        </div>

        <DiamondDivider />

        {/* Celebration Text - Simplified spacing */}
        <p
          className="italic text-stone-500 mb-1 font-semibold"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, // Bumped from 20
          }}
        >
          {t("card.celebration")}
        </p>

        <p
          className="tracking-[0.15em] uppercase font-semibold mb-3 text-amber-700/90"
          style={{ fontFamily: "'Cinzel', serif", fontSize: 16 }} // Bumped from 15
        >
          {t("card.reception")}
        </p>

        {/* --- DETAILS SECTION: THE SPACE SAVER --- */}
        <div className="flex flex-col gap-2 mb-4 w-full">
          {/* DATE - Keep this prominent */}
          <div className="text-center border-b border-amber-200/20">
            <p className="tracking-[0.25em] uppercase  font-semibold text-amber-700/80 text-[12px] font-['Cinzel']">
              {t("card.saturday")}
            </p>
            <p className="text-stone-800 text-[22px] font-semibold leading-tight font-['Cormorant_Garamond']">
              6 December 2026
            </p>
          </div>

          {/* VENUE & TIME - Put them side by side to save height */}
          <div className="grid grid-cols-2 gap-4 border-t border-amber-200/20 pt-1.5">
            <div className="text-center border-r border-amber-200/20">
              <p className="text-[12px] uppercase font-semibold tracking-widest text-amber-700/80 font-['Cinzel']">
                {t("card.venue")}
              </p>
              <p className="text-[20px] text-stone-800 font-['Cormorant_Garamond'] font-semibold">
                Jorhat
              </p>
            </div>
            <div className="text-center">
              <p className="text-[12px] uppercase font-semibold tracking-widest text-amber-700/80 font-['Cinzel']">
                {t("card.time")}
              </p>
              <p className="text-[20px] text-stone-800 font-['Cormorant_Garamond'] font-semibold">
                5:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="w-full scale-95 origin-center">
          <FlowerSlider key={sliderKey} onRSVP={onRSVP} />
        </div>

        <motion.button
          onClick={() => {
            setSliderKey((k) => k + 1);
            onDecline();
          }}
          whileHover={{ scale: 1.02 }}
          className="mt-2 text-[#a8a297] border-[#d1cfca] border px-6 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-['Cinzel']"
        >
          {t("card.cantMakeIt")}
        </motion.button>

        {/* Countdown - Compacted */}
        <div className="mt-3 opacity-80 scale-90">
          <CountdownStrip />
        </div>
      </div>
    </div>
  );
}
