import { motion } from "framer-motion";

export default function FlightGuide() {
  const NAVY = "text-[#2D3E50]"; // Deep Slate Blue
  const ACCENT = "text-[#8B5E3C]"; // Keeping the Burnt Sienna for warmth

  return (
    <div className={`space-y-12 ${NAVY}`}>
      <div>
        <h4
          className={`font-['Cinzel'] text-[10px] font-bold mb-10 tracking-[0.4em] uppercase ${ACCENT}`}
        >
          The Journey to Assam
        </h4>

        {/* STEP 1 */}
        <div className="mb-12 relative pl-10 border-l border-blue-100 pb-8">
          <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-[#2D3E50]" />
          <h5 className="font-['Cinzel'] text-[12px] tracking-[0.2em] uppercase mb-4 font-bold">
            01. International Arrivals
          </h5>
          <p className="font-['Cormorant_Garamond'] text-2xl italic leading-relaxed text-stone-700">
            For our guests traveling from{" "}
            <span className="font-bold text-[#2D3E50]">Germany & China</span>,
            we recommend{" "}
            <span className="underline decoration-blue-200 underline-offset-8">
              Delhi (DEL)
            </span>{" "}
            or{" "}
            <span className="underline decoration-blue-200 underline-offset-8">
              Kolkata (CCU)
            </span>{" "}
            as your Indian gateways.
          </p>
        </div>

        {/* STEP 2 */}
        <div className="relative pl-10 border-l border-blue-100">
          <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-[#2D3E50]" />
          <h5 className="font-['Cinzel'] text-[12px] tracking-[0.2em] uppercase mb-4 font-bold">
            02. Domestic Connections
          </h5>
          <p className="font-['Cormorant_Garamond'] text-2xl italic leading-relaxed text-stone-700 mb-10">
            From there, secure a domestic flight to{" "}
            <span className="font-bold text-[#2D3E50]">Jorhat (JRH)</span>.
            IndiGo is the most reliable carrier. You may also fly to Dibrugarh
            or Guwahati for a scenic drive.
          </p>

          <motion.button
            onClick={() =>
              window.open("https://www.google.com/travel/flights", "_blank")
            }
            whileHover={{
              scale: 1.02,
              backgroundColor: "#1b2b3d",
              color: "#ffffff",
            }}
            className="w-full md:w-auto border border-[#2D3E50] py-4 px-10 text-[10px] font-['Cinzel'] tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-4 cursor-pointer"
            style={{ backgroundColor: "#1b2b3d", color: "#ffffff" }}
          >
            Search Flights ↗
          </motion.button>
        </div>
      </div>
    </div>
  );
}
