import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CountdownStrip from "./BridgertonCountdown";

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
  const { t } = useTranslation();
  return (
    <div
      className="m-2.5 rounded relative overflow-hidden"
      style={{
        padding: "20px 30px 18px",
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
          className="tracking-[0.35em] uppercase mb-3 text-amber-800/60"
          style={{ fontFamily: "'Cinzel', serif", fontSize: 10 }}
        >
          {t("card.honor")}
        </p>

        {/* --- SCRIPT NAMES SECTION --- */}
        <h1
          className="text-stone-800 leading-[1.1] mb-1"
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: 64,
            textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.05)",
          }}
        >
          Abir & Lena
        </h1>

        <DiamondDivider />

        <p
          className="italic text-stone-500 mb-2 mt-0"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
          }}
        >
          {t("card.celebration")}
        </p>

        <p
          className="tracking-[0.25em] uppercase font-semibold mb-4 text-amber-700/90"
          style={{ fontFamily: "'Cinzel', serif", fontSize: 15 }}
        >
          {t("card.reception")}
        </p>

        {/* --- DETAILS SECTION --- */}
        <div className="flex flex-col gap-3 mb-4">
          {[
            {
              label: t("card.saturday"),
              val: "6 December 2026",
              sub: t("card.dateWords"),
            },
            { label: t("card.venue"), val: "Royal Park, Jorhat" },
            { label: t("card.time"), val: "5:00-9:00 PM" },
          ].map(({ label, val, sub }) => (
            <div key={label} className="text-center group">
              <p className="tracking-[0.3em] uppercase text-amber-600/70 text-[7.5px] font-['Cinzel'] mb-0.5">
                {label}
              </p>
              <p
                className="text-stone-800 text-[17px] leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                }}
              >
                {val}
              </p>
              {sub && (
                <p className="text-[9px] italic text-stone-400 font-['Cormorant_Garamond']">
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
          className="mt-2 px-12 py-2.5 text-white rounded-full cursor-pointer tracking-[0.25em] uppercase shadow-lg"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 9,
            background: "#C9A84C",
          }}
        >
          {t("card.rsvp")}
        </motion.button>

        <motion.button
          onClick={onDecline} // Add this handler
          whileHover={{ scale: 1.03, borderColor: "#8c7e6a", color: "#8c7e6a" }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-2 bg-transparent rounded-full cursor-pointer tracking-[0.2em] uppercase border transition-colors w-full sm:w-auto"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 9,
            color: "#a8a297",
            borderColor: "#d1cfca",
            marginTop: 8,
          }}
        >
          {t("card.cantMakeIt")}
        </motion.button>

        {/* Countdown */}
        <div className="flex flex-col items-center gap-1 mb-4">
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "7px",
              letterSpacing: "0.35em",
              color: "rgba(139,100,40,0.55)",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Counting down
          </p>
          <CountdownStrip />
        </div>
      </div>
    </div>
  );
}
