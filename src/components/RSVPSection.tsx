import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Jorhat from "../assets/AssamMap.png";
import RSVPTexture from "../assets/RSVPTexture.png";

const TRAVEL_DATA = {
  Germany: {
    flights:
      "Lufthansa/Air India (Frankfurt to Delhi/Kolkata) then Indigo to Jorhat.",
    hotels: "The Manor Jorhat, Kaziranga Golf Resort.",
    activities: "Tea tasting at Tocklai, River cruises on the Brahmaputra.",
  },
  Other: {
    flights: "Check connections to Delhi (DEL) or Kolkata (CCU).",
    hotels: "Local Boutique Stays, Heritage Bungalows.",
    activities: "Explore the Majuli Island, Visit local silk weavers.",
  },
};

const handleDownloadICS = () => {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "DTSTART:20261204T133000Z", // 7:00 PM IST is 1:30 PM UTC
    "DTEND:20261204T220000Z",
    "SUMMARY:Wedding Reception: Abir & Lena",
    "DESCRIPTION:Celebrating the marriage of Abir and Lena at Royal Park.",
    "LOCATION:Royal Park, Jorhat, Assam, India",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  const blob = new Blob([event], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Abir_Lena_Wedding.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function RSVPSection({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) {
  const [country, setCountry] = useState<"Germany" | "Other">("Germany");

  return (
    <div
      ref={innerRef}
      className="min-h-screen w-full bg-[#fdf8ec] flex flex-col md:flex-row snap-start"
    >
      {/* LEFT: FORM & CALENDAR */}
      <div
        className="w-full md:w-1/3 p-12 border-r border-stone-200 flex flex-col justify-center bg-white/30"
        style={{
          backgroundImage: `url(${RSVPTexture})`,
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-stone-800 mb-2 font-['Pinyon_Script'] text-5xl">
          Save the Date
        </h2>
        <p className="font-['Cinzel'] text-[10px] tracking-widest text-amber-700 mb-8">
          4 DECEMBER 2026
        </p>

        <div className="mb-12">
          <p className="font-['Cinzel'] text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-4">
            Add to Calendar
          </p>
          <div className="flex flex-col gap-3">
            {/* Google Calendar Link */}
            <motion.button
              onClick={() =>
                window.open(
                  "https://calendar.app.google/Tx5hkVCbDU5iQH2x8",
                  "_blank",
                )
              }
              whileHover={{ x: 5, color: "#8B5E3C" }}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 9,
                background: "#C9A84C",
                color: "white",
              }}
              className="flex items-center gap-3 text-[11px] font-['Cinzel'] text-white tracking-widest uppercase border-b border-stone-200 py-2 cursor-pointer transition-colors"
            >
              <span className="text-lg">G</span> Google Calendar
            </motion.button>

            {/* Apple / Outlook ICS Download */}
            <motion.button
              onClick={handleDownloadICS}
              whileHover={{ x: 5, color: "#8B5E3C" }}
              className="flex items-center gap-3 text-[11px] font-['Cinzel'] text-white tracking-widest uppercase border-b border-stone-200 py-2 cursor-pointer transition-colors"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 9,
                background: "#C9A84C",
              }}
            >
              <span className="text-lg"></span> Apple / Outlook
            </motion.button>
          </div>
        </div>
        <div className="space-y-6">
          <label className="block font-['Cinzel'] text-[9px] tracking-widest text-stone-500 uppercase">
            Traveling from
          </label>
          <select
            onChange={(e) => setCountry(e.target.value as any)}
            className="w-full border-b border-stone-300 bg-transparent py-2 font-['Cormorant_Garamond'] text-xl focus:outline-none focus:border-amber-500"
          >
            <option value="Germany">Germany</option>
            <option value="Other">Other International</option>
          </select>
        </div>
      </div>

      {/* RIGHT: DYNAMIC CONCIERGE */}
      <div className="w-full md:w-2/3 p-12 md:p-24 bg-[#f5ead4]/30 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={country}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10"
          >
            <h3 className="font-['Cinzel'] text-xs tracking-[0.4em] uppercase text-amber-800 mb-12">
              Travel Guide
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h4 className="font-['Cinzel'] text-[9px] font-bold mb-4 tracking-widest uppercase">
                  Flights
                </h4>
                <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 leading-relaxed">
                  {TRAVEL_DATA[country].flights}
                </p>
              </section>

              <section>
                <h4 className="font-['Cinzel'] text-[9px] font-bold mb-4 tracking-widest uppercase">
                  Where to Stay
                </h4>
                <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 leading-relaxed">
                  {TRAVEL_DATA[country].hotels}
                </p>
              </section>

              <section className="md:col-span-2">
                <h4 className="font-['Cinzel'] text-[9px] font-bold mb-4 tracking-widest uppercase">
                  Must-Do Activities
                </h4>
                <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 leading-relaxed">
                  {TRAVEL_DATA[country].activities}
                </p>
              </section>
            </div>

            {/* Add this below your Travel Guide grid in RSVPSection.tsx */}
            <section className="mt-16 pt-16 border-t border-stone-200/60">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h4 className="font-['Cinzel'] text-[9px] font-bold mb-6 tracking-widest uppercase text-amber-800">
                    The Venue
                  </h4>
                  <h2 className="text-[#2D241E] mb-4 font-['Pinyon_Script'] text-5xl">
                    The Royal Park
                  </h2>
                  <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 leading-relaxed mb-6">
                    Located along the historic Highway 37, our venue sits as a
                    gateway to Jorhat’s vibrant culture and the serene
                    landscapes of Upper Assam.
                  </p>
                  <address className="not-italic font-['Cinzel'] text-[10px] tracking-widest text-stone-400 leading-loose uppercase">
                    National Highway 37, By Pass Rd
                    <br />
                    Bapuji Nagar, Jorhat
                    <br />
                    Assam 785006, India
                  </address>
                </div>

                {/* Map Placeholder / Component */}
                <div className="aspect-video bg-stone-200 rounded-sm overflow-hidden shadow-2xl relative group border border-white/50">
                  <img
                    src={Jorhat}
                    alt="Map of Jorhat"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Elegant Overlay */}
                  <div className="absolute inset-0 bg-[#2D241E]/5 group-hover:bg-transparent transition-colors" />

                  {/* The Live Link - This is what the guests actually need */}
                  <motion.button
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=THE+ROYAL+PARK+Jorhat+Assam",
                        "_blank",
                      )
                    }
                    whileHover={{
                      y: -5,
                      backgroundColor: "#2D241E",
                      color: "#fdf8ec",
                    }}
                    className="absolute bottom-6 right-6 bg-white text-[#2D241E] px-6 py-3 text-[9px] font-['Cinzel'] tracking-[0.2em] uppercase shadow-2xl transition-all cursor-pointer"
                  >
                    Open in Navigation
                  </motion.button>
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>

        {/* Background Accent */}
        <div className="absolute bottom-[-10%] right-[-10%] opacity-5">
          <h1 className="text-[200px] font-['Cinzel']">JORHAT</h1>
        </div>
      </div>
    </div>
  );
}
