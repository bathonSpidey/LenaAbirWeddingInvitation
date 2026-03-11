import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CountdownStrip from "../BridgertonCountdown";
import RSVPTexture from "../../assets/RSVPTexture.png";
import CalendarButton from "./CalendarButton";
import { TRAVEL_DATA } from "./types";
import type { CountryKey } from "./types";
import { downloadICS } from "./utils";
import GoogleIcon from "../../assets/googleicon.png";
import Quill from "../../assets/quill.png";

const WEDDING_DATE = new Date("2026-12-06T00:00:00");

function useDaysUntil(target: Date): number {
  const [days, setDays] = useState(() =>
    Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setDays(
        Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      );
    }, 60_000);
    return () => clearInterval(id);
  }, [target]);
  return days;
}

interface SaveTheDatePanelProps {
  country: CountryKey;
  onCountryChange: (c: CountryKey) => void;
  onWhatToExpect: () => void;
}

export default function SaveTheDatePanel({
  country,
  onCountryChange,
  onWhatToExpect,
}: SaveTheDatePanelProps) {
  const daysUntil = useDaysUntil(WEDDING_DATE);
  const { t } = useTranslation();

  return (
    <aside className="w-full md:w-1/3 p-12 border-r border-stone-200 flex flex-col justify-center relative overflow-hidden">
      {/* Layer 1: The Base Paper Color */}
      <div className="absolute inset-0 bg-[#FDFBF7]" />

      {/* Layer 2: The Texture with modified blending */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(${RSVPTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: " contrast(1.1)", // Matches the texture to the gold text
          mixBlendMode: "multiply", // Allows the cream base color to bleed through
        }}
      />

      {/* Layer 3: A subtle central 'lighting' effect to improve text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
      <h2
        className="mb-2 font-['Pinyon_Script'] text-6xl py-2 select-none"
        style={{
          color: "#AF944D",
          textShadow: `
      -0.5px -0.5px 0px rgba(255,255,255,0.4), /* Subtle highlight on the top edge */
      0.5px 0.5px 0px rgba(0,0,0,0.1),         /* Micro-depth on the bottom edge */
      0px 1px 2px rgba(175, 148, 77, 0.2)      /* Soft 'color bleed' into the paper */
    `,
          /* Blending the text into the marble texture */
          mixBlendMode: "multiply",
          opacity: 0.9,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {t("saveTheDate.heading")}
      </h2>
      <p
        className="font-['Cinzel'] text-[16px] tracking-[0.4em] mb-1"
        style={{
          color: "#8B7355",
          opacity: 0.8,
          textShadow: "0.5px 0.5px 0px rgba(255,255,255,0.5)",
        }}
      >
        6 DECEMBER 2026
      </p>
      {daysUntil > 0 && (
        <div className="mb-8">
          <CountdownStrip />
        </div>
      )}

      <div className="mb-8">
        <p className="font-['Cinzel'] text-[12px] tracking-[0.3em] text-stone-600 uppercase mb-4 font-bold">
          {t("saveTheDate.addToCalendar")}
        </p>
        <div className="flex flex-col gap-3">
          <CalendarButton
            iconUrl={GoogleIcon}
            label={t("saveTheDate.googleCalendar")}
            onClick={() =>
              window.open(
                "https://calendar.app.google/Tx5hkVCbDU5iQH2x8",
                "_blank",
              )
            }
          />
          <CalendarButton
            iconUrl={Quill}
            label={t("saveTheDate.appleOutlook")}
            onClick={downloadICS}
          />
        </div>
      </div>

      <motion.button
        onClick={onWhatToExpect}
        whileHover={{
          scale: 1.01,
          backgroundColor: "#F9F6EE", // Very light cream
          borderColor: "#D4AF37", // Classic Gold
        }}
        whileTap={{ scale: 0.98 }}
        className="
    w-full py-4 px-4 
    text-[11px] font-['Cinzel'] tracking-[0.35em] uppercase 
    cursor-pointer transition-all duration-300 relative group
    /* THE COLOR: Shimmering Champagne Silk */
    bg-[#FCFAf5] 
    border border-[#C9A84C]/40
    /* Softer, 'Airy' Shadow: No more heavy blacks */
    shadow-[0_8px_20px_rgba(201,168,76,0.15),inset_0_1px_0px_rgba(255,255,255,0.8)]
    overflow-hidden
  "
        style={{
          /* SILK TEXTURE: Very fine, smooth noise to mimic fabric instead of leather */
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='silk'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23silk)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundBlendMode: "overlay",
        }}
      >
        {/* THE LABEL: Deep Bronze-Gold (Better legibility on light background) */}
        <span
          className="relative z-10 font-bold"
          style={{
            color: "#8B6E2A",
            textShadow: "0.5px 0.5px 0px rgba(255,255,255,0.8)",
          }}
        >
          {t("saveTheDate.whatToExpect")}
        </span>

        {/* THE EMBROIDERY: Replaces 'stitching' with a more delicate gold thread look */}
        <div className="absolute inset-[5px] border border-[#C9A84C]/20 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity" />

        {/* DECORATIVE CORNERS: Softened to a thinner, more elegant gold line */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A84C]/40" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A84C]/40" />

        {/* THE PEARLESCENCE: A soft, white glow that follows the hover */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      </motion.button>

      <div className="space-y-3">
        <label className="block font-['Cinzel'] text-[9px] tracking-widest text-stone-500 uppercase">
          {t("saveTheDate.travelingFrom")}
        </label>
        <select
          value={country}
          onChange={(e) => {
            const val = e.target.value;
            if (val in TRAVEL_DATA) onCountryChange(val as CountryKey);
          }}
          className="w-full border-b border-stone-300 bg-transparent py-2 font-['Cormorant_Garamond'] text-xl focus:outline-none focus:border-amber-500"
        >
          <option value="Germany">{t("saveTheDate.germany")}</option>
          <option value="India">{t("saveTheDate.india")}</option>
          <option value="Other">{t("saveTheDate.otherInternational")}</option>
        </select>
      </div>
    </aside>
  );
}
