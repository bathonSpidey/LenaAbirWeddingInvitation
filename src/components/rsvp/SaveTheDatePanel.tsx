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

// --- ICS helpers for each event ---
const downloadMehendiICS = () => {
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Abir & Lena Wedding//EN",
    "BEGIN:VEVENT",
    "DTSTART:20261204T110000Z",
    "DTEND:20261204T160000Z",
    "SUMMARY:Mehendi: Abir & Lena",
    "DESCRIPTION:Mehendi ceremony for Abir and Lena.",
    "LOCATION:Chari Ali, Madhubon, Choladhora, Jorhat, Assam 785001, India",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = window.URL.createObjectURL(
    new Blob([content], { type: "text/calendar;charset=utf-8" }),
  );
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: "Abir_Lena_Mehendi.ics",
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

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
  // onWhatToExpect,
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
          filter: " contrast(1.1)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Layer 3: A subtle central 'lighting' effect to improve text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_70%)]" />

      <h2
        className="mb-2 font-['Pinyon_Script'] text-6xl py-2 select-none"
        style={{
          color: "#AF944D",
          textShadow: `
      -0.5px -0.5px 0px rgba(255,255,255,0.4),
      0.5px 0.5px 0px rgba(0,0,0,0.1),
      0px 1px 2px rgba(175, 148, 77, 0.2)
    `,
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

      {/* ── Calendar Section: two events ── */}
      <div className="mb-6">
        <p className="font-['Cinzel'] text-[12px] tracking-[0.3em] text-stone-600 uppercase mb-4 font-bold">
          {t("saveTheDate.addToCalendar")}
        </p>

        {/* Event 1: Mehendi */}
        <div className="mb-1">
          <p
            className="font-['Cinzel'] text-[8px] tracking-[0.35em] uppercase mb-2 font-bold"
            style={{ color: "#B98C8C" }}
          >
            4 Dec · Mehendi
          </p>
          <div className="flex flex-col gap-2">
            <CalendarButton
              iconUrl={GoogleIcon}
              label={t("saveTheDate.googleCalendar")}
              onClick={() =>
                window.open(
                  "https://calendar.app.google/9r9cuMYnGhJBwYry6",
                  "_blank",
                )
              }
            />
            <CalendarButton
              iconUrl={Quill}
              label={t("saveTheDate.appleOutlook")}
              onClick={downloadMehendiICS}
            />
          </div>
        </div>

        {/* Thin ornamental divider */}
        <div className="relative my-3 flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
          <span
            className="absolute text-[8px]"
            style={{ color: "#C9A84C", opacity: 0.5 }}
          >
            ✦
          </span>
        </div>

        {/* Event 2: Reception */}
        <div>
          <p
            className="font-['Cinzel'] text-[8px] tracking-[0.35em] uppercase mb-2 font-bold"
            style={{ color: "#B98C8C" }}
          >
            6 Dec · Reception
          </p>
          <div className="flex flex-col gap-2">
            <CalendarButton
              iconUrl={GoogleIcon}
              label={t("saveTheDate.weddingCalendar")}
              onClick={() =>
                window.open(
                  "https://calendar.app.google/A2MAYbKQoP4xxuKy7",
                  "_blank",
                )
              }
            />
            <CalendarButton
              iconUrl={Quill}
              label={t("saveTheDate.appleWedding")}
              onClick={downloadICS}
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{
          scale: 1.01,
          backgroundColor: "#F9F6EE",
          borderColor: "#D4AF37",
        }}
        whileTap={{ scale: 0.98 }}
        className="
    w-full py-4 px-4 mb-6
    text-[11px] font-['Cinzel'] tracking-[0.35em] uppercase 
    cursor-pointer transition-all duration-300 relative group
    bg-[#FCFAf5] 
    border border-[#C9A84C]/40
    shadow-[0_8px_20px_rgba(201,168,76,0.15),inset_0_1px_0px_rgba(255,255,255,0.8)]
    overflow-hidden
  "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='silk'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23silk)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundBlendMode: "overlay",
        }}
      >
        <span
          className="relative z-10 font-bold"
          style={{
            color: "#8B6E2A",
            textShadow: "0.5px 0.5px 0px rgba(255,255,255,0.8)",
          }}
        >
          {t("saveTheDate.whatToExpect")}
        </span>
        <div className="absolute inset-[5px] border border-[#C9A84C]/20 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity" />
        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A84C]/40" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A84C]/40" />
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
