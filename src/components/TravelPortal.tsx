import React from "react";
import FlightGuide from "./FlightGuide";
import { motion } from "framer-motion";
import TravelTexture from "../assets/travel-texture.png";

export default function TravelPortal({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      className="min-h-screen w-full bg-[#f0f4f7] py-20 px-6 md:px-20 snap-start relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"
        style={{
          backgroundImage: `url(${TravelTexture})`,
          backgroundSize: "cover",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-16 text-center">
          <h2 className="font-['Pinyon_Script'] text-7xl md:text-9xl mb-4 text-[#2D3E50]">
            Travel Concierge
          </h2>
          <div className="h-px w-32 bg-[#8B5E3C]/30 mx-auto mb-6" />
          <p className="font-['Cinzel'] text-[11px] tracking-[0.6em] uppercase text-[#2D3E50] opacity-70">
            Assam Arrival & Stay Guide
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10">
          {/* FLIGHT SECTION */}
          <section className="bg-white p-8 md:p-12 rounded-sm border border-blue-100 shadow-xl shadow-blue-900/5">
            <FlightGuide />
          </section>

          {/* STAYS & VISA GRID */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* VISA CARD */}
            <div className="bg-white/80 border border-blue-100 p-8 rounded-sm shadow-sm flex flex-col justify-between">
              <div>
                <h6 className="font-['Cinzel'] text-[10px] tracking-widest text-[#8B5E3C] mb-4 uppercase font-bold">
                  Entry Requirements
                </h6>
                <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 mb-6">
                  For our German and International guests, an e-Visa is required
                  for entry into India.
                </p>
              </div>
              <motion.button
                onClick={() =>
                  window.open(
                    "https://indianvisaonline.gov.in/evisa/tvoa.html",
                    "_blank",
                  )
                }
                whileHover={{ backgroundColor: "#2D3E50", color: "#fff" }}
                className="w-full border border-[#2D3E50] py-3 text-[9px] font-['Cinzel'] tracking-widest uppercase transition-all"
              >
                Official e-Visa Portal
              </motion.button>
            </div>

            {/* STAYS CARD */}
            <div className="bg-white/80 border border-blue-100 p-8 rounded-sm shadow-sm">
              <h6 className="font-['Cinzel'] text-[10px] tracking-widest text-[#8B5E3C] mb-4 uppercase font-bold">
                Accommodations
              </h6>
              <div className="space-y-3">
                {[
                  {
                    label: "Jorhat Stays",
                    url: "https://www.booking.com/searchresults.en-gb.html?ss=Jorhat",
                  },
                  {
                    label: "Kaziranga Lodges",
                    url: "https://www.booking.com/searchresults.en-gb.html?ss=Kaziranga",
                  },
                  {
                    label: "Guwahati Hotels",
                    url: "https://www.booking.com/searchresults.en-gb.html?ss=Guwahati",
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => window.open(item.url, "_blank")}
                    className="w-full text-left font-['Cormorant_Garamond'] text-lg text-stone-600 hover:text-[#2D3E50] flex justify-between items-center border-b border-stone-100 pb-1 group cursor-pointer"
                  >
                    {item.label}{" "}
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center">
          <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#2D3E50]">
            We are here to help you every step of the way.
          </p>
        </footer>
      </div>
    </div>
  );
}
