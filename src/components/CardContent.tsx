import { motion } from "framer-motion";

const DiamondDivider = () => (
  <div className="flex items-center justify-center gap-2 w-full my-3">
    <div className="h-px w-12 bg-amber-400/40" />
    <div className="w-1.5 h-1.5 rotate-45 border border-amber-500/60" />
    <div className="h-px w-12 bg-amber-400/40" />
  </div>
);

const Corner = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" width="28" height="28" className={className}>
    <path
      d="M6 6 L6 20 M6 6 L20 6"
      stroke="#C9A84C"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

export default function CardContent({
  onDecline,
  onRSVP,
}: {
  onDecline: () => void;
  onRSVP: () => void;
}) {
  return (
    <div
      className="m-2.5 rounded relative overflow-hidden"
      style={{
        padding: "36px 30px 30px",
        border: "1px solid rgba(201,168,76,0.3)",
        boxShadow: "inset 0 0 12px rgba(120,90,30,0.08)",
        background: "transparent",
      }}
    >
      <Corner className="absolute top-2 left-2" />
      <Corner className="absolute top-2 right-2 rotate-90" />
      <Corner className="absolute bottom-2 right-2 rotate-180" />
      <Corner className="absolute bottom-2 left-2 -rotate-90" />

      <div className="flex flex-col items-center text-center">
        <p
          className="tracking-[0.35em] uppercase mb-6 text-amber-800/60"
          style={{ fontFamily: "'Cinzel', serif", fontSize: 8 }}
        >
          The Honor of your presence is requested
        </p>

        {/* --- SCRIPT NAMES SECTION --- */}
        <h1
          className="text-stone-800 leading-[1.1] mb-2"
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: 54,
            textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.05)",
          }}
        >
          Abir & Lena
        </h1>

        <DiamondDivider />

        <p
          className="italic text-stone-500 mb-4 mt-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18,
          }}
        >
          at the celebration of their marriage
        </p>

        <p
          className="tracking-[0.25em] uppercase font-semibold mb-8 text-amber-700/90"
          style={{ fontFamily: "'Cinzel', serif", fontSize: 13 }}
        >
          Wedding Reception
        </p>

        {/* --- DETAILS SECTION --- */}
        <div className="flex flex-col gap-6 mb-8">
          {[
            {
              label: "SATURDAY",
              val: "6 December 2026",
              sub: "Two Thousand Twenty Six",
            },
            { label: "VENUE", val: "Royal Park, Jorhat" },
            { label: "TIME", val: "5:00-9:00 PM" },
          ].map(({ label, val, sub }) => (
            <div key={label} className="text-center group">
              <p className="tracking-[0.3em] uppercase text-amber-600/70 text-[7.5px] font-['Cinzel'] mb-1.5">
                {label}
              </p>
              <p
                className="text-stone-800 text-[19px] leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                }}
              >
                {val}
              </p>
              {sub && (
                <p className="text-[10px] italic text-stone-400 font-['Cormorant_Garamond']">
                  {sub}
                </p>
              )}
            </div>
          ))}
        </div>

        <motion.button
          onClick={onRSVP} // Triggered from EnvelopeIntro
          whileHover={{ scale: 1.03, backgroundColor: "#b59440" }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 px-12 py-3 text-white rounded-full cursor-pointer tracking-[0.25em] uppercase shadow-lg"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 9,
            background: "#C9A84C",
          }}
        >
          RSVP & Travel Guide
        </motion.button>

        <motion.button
          onClick={onDecline} // Add this handler
          whileHover={{ scale: 1.03, borderColor: "#8c7e6a", color: "#8c7e6a" }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-3 bg-transparent rounded-full cursor-pointer tracking-[0.2em] uppercase border transition-colors w-full sm:w-auto"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 9,
            color: "#a8a297",
            borderColor: "#d1cfca",
            marginTop: 12,
          }}
        >
          I Can't Make It
        </motion.button>
      </div>
    </div>
  );
}
