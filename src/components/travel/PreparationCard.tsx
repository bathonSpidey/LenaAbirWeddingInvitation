import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ANTIQUE_GOLD } from "./TravelConstants";
import RoyalSeal from "../../assets/SealElegant.png";
import { useTranslation } from "react-i18next";

interface PreparationCardProps {
  delay: number;
  label: string;
  frontDesc: string;
  color: string;
  notesTitle: string;
  notesContent: string;
}

export default function PreparationCard({
  delay,
  label,
  frontDesc,
  color,
  notesTitle,
  notesContent,
}: PreparationCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .regency-card-container { perspective: 2000px; }
        .regency-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }
        .regency-card-inner.flipped { transform: rotateY(180deg); }
        .regency-card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 2px;
        }
        /* Shadow that changes based on flip */
        .card-shadow {
          filter: drop-shadow(0 12px 30px rgba(26, 40, 73, ${isFlipped ? "0.08" : "0.15"}));
        }
          .regency-card-back {
          background: #FAF9F6;
          border: 1px solid ${ANTIQUE_GOLD}20;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          /* The Magic: Creating the curled corner shadow */
          background-image: linear-gradient(
            135deg, 
            transparent 92%, 
            rgba(0,0,0,0.05) 92%, 
            rgba(0,0,0,0.1) 100%
          );
          /* The actual Folded Corner overlay */
        .regency-card-back::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 30px;
          height: 30px;
          background: linear-gradient(
            225deg, 
            #ffffff 45%, 
            #dcd9d4 50%, 
            #FAF9F6 56%
          );
          box-shadow: -2px -2px 5px rgba(0,0,0,0.05);
          border-radius: 0 0 2px 0;
          transition: all 0.5s ease;
        }

        /* Subtly lift the corner on hover */
        .regency-card-container:hover .regency-card-back::after {
          width: 35px;
          height: 35px;
        }
      `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 1 }}
        viewport={{ once: true }}
        className="regency-card-container w-full aspect-[4/5] cursor-pointer group card-shadow"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* THE ROYAL SEAL - Sitting on top of the container */}
        <AnimatePresence>
          {!isFlipped && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{
                opacity: 0,
                scale: 1.2,
                y: -20,
                transition: { duration: 0.3 },
              }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            >
              <img
                src={RoyalSeal}
                alt="Royal Seal"
                className="w-14 h-14 object-contain drop-shadow-md"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`regency-card-inner ${isFlipped ? "flipped" : ""}`}>
          {/* ── FRONT ── */}
          <div className="regency-card-face p-6 bg-white border border-slate-100 flex flex-col justify-between">
            {/* Top ornament spacing to accommodate the seal */}
            <div className="h-8" />

            <h5
              className="font-['Cinzel'] text-[14px] tracking-[0.5em] uppercase font-bold text-center"
              style={{ color: ANTIQUE_GOLD }}
            >
              {label}
            </h5>

            <div className="flex-grow flex items-center justify-center">
              <p className="font-['Cormorant_Garamond'] text-xl italic leading-relaxed text-center px-4 text-[#1a2849]">
                {frontDesc}
              </p>
            </div>

            <div className="text-center pb-2">
              <span className="font-['Cinzel'] text-[7px] tracking-[0.4em] uppercase text-slate-300 group-hover:text-[#4A90E2] transition-colors">
                {t("preparations.openLetter")}
              </span>
            </div>
          </div>

          {/* ── BACK ── */}
          {/* ── BACK SIDE (With Curled Corner) ── */}
          <div className="regency-card-face regency-card-back p-8 overflow-hidden">
            <div className="flex items-center gap-4 border-b border-stone-200 pb-4 mb-6">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h6 className="font-['Cinzel'] text-[8px] tracking-[0.4em] uppercase font-bold text-[#c9a961]">
                {t("preparations.notesFromRiver")}
              </h6>
            </div>

            <div className="back-content flex-grow py-2">
              {notesContent.split("\n").map((line, i) => (
                <p
                  key={i}
                  className={`font-['Cormorant_Garamond'] ${line.startsWith("•") ? "text-[15px] mb-1" : "text-base mb-3"} italic leading-tight text-slate-700`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-auto flex justify-between items-end pr-4">
              {" "}
              {/* Added padding to avoid the curl */}
              <span className="font-['Cinzel'] text-[8px] tracking-widest text-stone-400 uppercase font-semibold">
                {notesTitle}
              </span>
              <span className="font-['Pinyon_Script'] text-2xl opacity-30 text-[#1a2849]">
                L&A
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
