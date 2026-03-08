import React from "react";
import FlightGuide from "./FlightGuide";

export default function TravelPortal({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      className="min-h-screen w-full bg-[#f0f4f7] py-24 px-6 md:px-20 snap-start relative overflow-hidden"
    >
      {/* Subtle Blue/Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-20 text-center">
          {/* Using a deeper Navy for the "Travel" feel */}
          <h2 className="font-['Pinyon_Script'] text-7xl md:text-9xl mb-4 text-[#2D3E50]">
            Travel Concierge
          </h2>
          <div className="h-px w-32 bg-[#8B5E3C]/30 mx-auto mb-6" />
          <p className="font-['Cinzel'] text-[11px] tracking-[0.6em] uppercase text-[#2D3E50] opacity-70">
            Assam Arrival & Stay Guide
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {/* Flight Section - Clean & High Contrast */}
          <section className="bg-white p-8 md:p-16 rounded-sm border border-blue-100 shadow-xl shadow-blue-900/5">
            <FlightGuide />
          </section>

          {/* Accommodation & Visa Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 border border-blue-100 p-10 rounded-sm text-center shadow-sm">
              <h6 className="font-['Cinzel'] text-[10px] tracking-widest text-[#8B5E3C] mb-4 uppercase">
                Stays
              </h6>
              <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600">
                Heritage bungalows & boutique hotels in Jorhat.
              </p>
            </div>
            <div className="bg-white/80 border border-blue-100 p-10 rounded-sm text-center shadow-sm">
              <h6 className="font-['Cinzel'] text-[10px] tracking-widest text-[#8B5E3C] mb-4 uppercase">
                Visa
              </h6>
              <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600">
                E-Visa details for our German & International guests.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-24 text-center">
          <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#2D3E50]">
            We are here to help you every step of the way.
          </p>
        </footer>
      </div>
    </div>
  );
}
