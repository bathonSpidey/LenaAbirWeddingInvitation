import { useEffect, useState } from "react";
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
}

export default function SaveTheDatePanel({ country, onCountryChange }: SaveTheDatePanelProps) {
  const daysUntil = useDaysUntil(WEDDING_DATE);

  return (
    <aside
      className="w-full md:w-1/3 p-12 border-r border-stone-200 flex flex-col justify-center bg-white/30"
      style={{ backgroundImage: `url(${RSVPTexture})`, backgroundSize: "cover" }}
    >
      <h2 className="text-stone-800 mb-2 font-['Pinyon_Script'] text-5xl">Save the Date</h2>
      <p className="font-['Cinzel'] text-[10px] tracking-widest text-amber-700 mb-2">
        6 DECEMBER 2026
      </p>
      {daysUntil > 0 && (
        <p className="font-['Cormorant_Garamond'] text-stone-400 text-sm italic mb-8">
          {daysUntil} days to go
        </p>
      )}

      <div className="mb-8">
        <p className="font-['Cinzel'] text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-4">
          Add to Calendar
        </p>
        <div className="flex flex-col gap-3">
          <CalendarButton
            icon="G"
            label="Google Calendar"
            onClick={() => window.open("https://calendar.app.google/Tx5hkVCbDU5iQH2x8", "_blank")}
          />
          <CalendarButton icon="📅" label="Apple / Outlook" onClick={downloadICS} />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block font-['Cinzel'] text-[9px] tracking-widest text-stone-500 uppercase">
          Traveling from
        </label>
        <select
          value={country}
          onChange={(e) => {
            const val = e.target.value;
            if (val in TRAVEL_DATA) onCountryChange(val as CountryKey);
          }}
          className="w-full border-b border-stone-300 bg-transparent py-2 font-['Cormorant_Garamond'] text-xl focus:outline-none focus:border-amber-500"
        >
          <option value="Germany">Germany</option>
          <option value="India">India</option>
          <option value="Other">Other International</option>
        </select>
      </div>
    </aside>
  );
}
