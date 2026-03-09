import RSVPTexture from "../../assets/RSVPTexture.png";
import CalendarButton from "./CalendarButton";
import type { CountryKey } from "./types";
import { downloadICS } from "./utils";

interface SaveTheDatePanelProps {
  country: CountryKey;
  onCountryChange: (c: CountryKey) => void;
}

export default function SaveTheDatePanel({ country, onCountryChange }: SaveTheDatePanelProps) {
  return (
    <aside
      className="w-full md:w-1/3 p-12 border-r border-stone-200 flex flex-col justify-center bg-white/30"
      style={{ backgroundImage: `url(${RSVPTexture})`, backgroundSize: "cover" }}
    >
      <h2 className="text-stone-800 mb-2 font-['Pinyon_Script'] text-5xl">Save the Date</h2>
      <p className="font-['Cinzel'] text-[10px] tracking-widest text-amber-700 mb-8">
        4 DECEMBER 2026
      </p>

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
          <CalendarButton icon="" label="Apple / Outlook" onClick={downloadICS} />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block font-['Cinzel'] text-[9px] tracking-widest text-stone-500 uppercase">
          Traveling from
        </label>
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value as CountryKey)}
          className="w-full border-b border-stone-300 bg-transparent py-2 font-['Cormorant_Garamond'] text-xl focus:outline-none focus:border-amber-500"
        >
          <option value="Germany">Germany</option>
          <option value="Other">Other International</option>
        </select>
      </div>
    </aside>
  );
}
