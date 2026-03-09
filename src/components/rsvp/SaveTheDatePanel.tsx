import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CountdownStrip from "../BridgertonCountdown";
import RSVPTexture from "../../assets/RSVPTexture.png";
import CalendarButton from "./CalendarButton";
import { TRAVEL_DATA } from "./types";
import type { CountryKey } from "./types";
import { downloadICS } from "./utils";

const WEDDING_DATE = new Date("2026-12-06T00:00:00");

function useDaysUntil(target: Date): number {
  const [days, setDays] = useState(() =>
    Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setDays(Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
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

export default function SaveTheDatePanel({ country, onCountryChange, onWhatToExpect }: SaveTheDatePanelProps) {
  const daysUntil = useDaysUntil(WEDDING_DATE);
  const { t } = useTranslation();

  return (
    <aside
      className="w-full md:w-1/3 p-12 border-r border-stone-200 flex flex-col justify-center bg-white/30"
      style={{ backgroundImage: `url(${RSVPTexture})`, backgroundSize: "cover" }}
    >
      <h2 className="text-stone-800 mb-2 font-['Pinyon_Script'] text-5xl">{t("saveTheDate.heading")}</h2>
      <p className="font-['Cinzel'] text-[10px] tracking-widest text-amber-700 mb-2">
        6 DECEMBER 2026
      </p>
      {daysUntil > 0 && (
        <div className="mb-8">
          <CountdownStrip />
        </div>
      )}

      <div className="mb-8">
        <p className="font-['Cinzel'] text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-4">
          {t("saveTheDate.addToCalendar")}
        </p>
        <div className="flex flex-col gap-3">
          <CalendarButton
            icon="G"
            label={t("saveTheDate.googleCalendar")}
            onClick={() => window.open("https://calendar.app.google/Tx5hkVCbDU5iQH2x8", "_blank")}
          />
          <CalendarButton icon="📅" label={t("saveTheDate.appleOutlook")} onClick={downloadICS} />
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={onWhatToExpect}
          className="w-full border border-stone-400 text-stone-600 py-2 px-4 text-[9px] font-['Cinzel'] tracking-[0.3em] uppercase cursor-pointer hover:border-amber-600 hover:text-amber-700 transition-all duration-300"
        >
          {t("saveTheDate.whatToExpect")}
        </button>
      </div>

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
