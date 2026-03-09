import { motion } from "framer-motion";

export default function FlightGuide() {
  const NAVY = "text-[#2D3E50]";
  const ACCENT = "text-[#8B5E3C]";

  return (
    <div className={`space-y-12 ${NAVY}`}>
      <div>
        <h4
          className={`font-['Cinzel'] text-[10px] font-bold mb-8 tracking-[0.4em] uppercase ${ACCENT}`}
        >
          The Journey to Assam
        </h4>

        {/* STEP 1: INTERNATIONAL */}
        <div className="mb-10 relative pl-10 border-l border-blue-100 pb-4">
          <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-[#2D3E50]" />
          <h5 className="font-['Cinzel'] text-[12px] tracking-[0.2em] uppercase mb-3 font-bold">
            01. International Hubs
          </h5>
          <p className="font-['Cormorant_Garamond'] text-xl italic leading-relaxed text-stone-700 mb-6">
            Secure your journey to{" "}
            <span className="font-bold text-[#2D3E50]">Delhi (DEL)</span> or{" "}
            <span className="font-bold text-[#2D3E50]">Kolkata (CCU)</span>.
          </p>
          <motion.button
            onClick={() =>
              window.open("https://www.google.com/travel/flights", "_blank")
            }
            whileHover={{ scale: 1.02, backgroundColor: "#2D3E50", color: "#fff" }}
            className="border border-[#2D3E50] py-3 px-6 text-[9px] font-['Cinzel'] tracking-widest uppercase transition-all"
          >
            Search Global Flights ↗
          </motion.button>
        </div>

        {/* STEP 2: DOMESTIC SIDE-BY-SIDE */}
        <div className="relative pl-10 border-l border-blue-100 pb-6">
          <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-[#2D3E50]" />
          <div className="absolute -left-[8px] bottom-0 w-4 h-px bg-[#2D3E50]/40" />
          <div className="absolute -left-[4.5px] bottom-0 w-2 h-2 rotate-45 bg-[#2D3E50]/40" />
          <h5 className="font-['Cinzel'] text-[12px] tracking-[0.2em] uppercase mb-3 font-bold">
            02. The Final Hop
          </h5>
          <p className="font-['Cormorant_Garamond'] text-xl italic leading-relaxed text-stone-700 mb-6">
            Book your final connection to{" "}
            <span className="font-bold text-[#2D3E50]">Jorhat (JRH)</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() =>
                window.open(
                  "https://www.google.com/travel/flights?q=Flights%20to%20JRH%20from%20DEL",
                  "_blank",
                )
              }
              whileHover={{
                scale: 1.02,
                backgroundColor: "#2D3E50",
                color: "#fff",
              }}
              className="flex-1 border border-[#2D3E50] py-3 text-[9px] font-['Cinzel'] tracking-widest uppercase"
            >
              Delhi to Jorhat
            </motion.button>
            <motion.button
              onClick={() =>
                window.open(
                  "https://www.google.com/travel/flights?q=Flights%20to%20JRH%20from%20CCU",
                  "_blank",
                )
              }
              whileHover={{
                scale: 1.02,
                backgroundColor: "#2D3E50",
                color: "#fff",
              }}
              className="flex-1 border border-[#2D3E50] py-3 text-[9px] font-['Cinzel'] tracking-widest uppercase"
            >
              Kolkata to Jorhat
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
