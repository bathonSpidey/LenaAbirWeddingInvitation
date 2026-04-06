import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import SealOne from "../../assets/VisaStamp.png";
import SealTwo from "../../assets/RhinoStamp.png";
import SealThree from "../../assets/BihuStamp.png";

export interface ScheduleDay {
  date: string;
  activity: string;
}

export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  days: ScheduleDay[];
}

const PLAN_COLORS: Record<string, string> = {
  relaxed: "#B98C8C",
  exploration: "#c9a961",
  intense: "#1a2849",
};

function useWeddingPlans(): Plan[] {
  const { t } = useTranslation();
  const ids = ["relaxed", "exploration", "intense"] as const;

  return ids.map((id) => ({
    id,
    title: t(`travelPortal.plans.${id}.title`),
    subtitle: t(`travelPortal.plans.${id}.subtitle`),
    color: PLAN_COLORS[id],
    days: t(`travelPortal.plans.${id}.days`, {
      returnObjects: true,
    }) as ScheduleDay[],
  }));
}

export default function TypicalSchedule() {
  const { t } = useTranslation();
  const weddingPlans = useWeddingPlans();

  return (
    <section className="py-16 md:py-24 px-4 bg-[#FAF9F6] overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .flip-container { perspective: 1500px; }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }
        .is-flipped { transform: rotateY(180deg); }
        .face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 2px;
        }
        .face-back { transform: rotateY(180deg); }

        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #c9a961; }

        @media (max-width: 768px) {
          .mobile-seal-fix {
            opacity: 0.9 !important;
            filter: grayscale(0) !important;
            mix-blend-mode: normal !important;
          }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.33); opacity: 0; }
          80%, 100% { opacity: 0; }
        }
        .tap-hint-ring {
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
      `,
        }}
      />

      <div className="text-center mb-12 md:mb-16">
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-['Pinyon_Script'] text-5xl md:text-6xl text-[#1a2849] mb-4"
        >
          {t("travelPortal.itinerary")}
        </motion.h4>
        <div className="flex justify-center items-center gap-6">
          <div className="h-px w-8 md:w-12 bg-stone-200" />
          <p className="font-['Cinzel'] text-[10px] md:text-[11px] tracking-[0.3em] text-stone-400 uppercase">
            {t("travelPortal.itinerarySubheading")}
          </p>
          <div className="h-px w-8 md:w-12 bg-stone-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
        {weddingPlans.map((plan, index) => {
          const seals = [SealOne, SealTwo, SealThree];
          return (
            <ScheduleCard
              key={plan.id}
              plan={plan}
              delay={index * 0.15}
              sealAsset={seals[index]}
            />
          );
        })}
      </div>
    </section>
  );
}

function ScheduleCard({
  plan,
  delay,
  sealAsset,
}: {
  plan: Plan;
  delay: number;
  sealAsset: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const styles = {
    relaxed: {
      bg: "bg-[#FDF6F6]",
      accent: "text-[#B98C8C]",
      hover: "group-hover:shadow-[#B98C8C]/10",
    },
    exploration: {
      bg: "bg-[#FCFBFA]",
      accent: "text-[#c9a961]",
      hover: "group-hover:shadow-[#c9a961]/10",
    },
    intense: {
      bg: "bg-[#F5F6F8]",
      accent: "text-[#1a2849]",
      hover: "group-hover:shadow-[#1a2849]/10",
    },
  }[plan.id] ?? { bg: "bg-white", accent: "text-[#c9a961]", hover: "" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      className="flip-container h-[500px] md:h-[540px] w-full cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-inner ${isFlipped ? "is-flipped" : ""}`}>
        {/* FRONT SIDE */}
        <div
          className={`face ${styles.bg} border border-stone-100 p-8 md:p-10 flex flex-col items-center justify-between text-center shadow-lg transition-all duration-500 md:group-hover:-translate-y-2`}
        >
          <div className="font-['Cinzel'] text-stone-200 text-xl tracking-[0.5em] opacity-40">
            •••
          </div>

          <div className="space-y-3">
            <h5
              className={`font-['Cinzel'] text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold ${styles.accent}`}
            >
              {plan.title}
            </h5>
            <p className="font-['Cormorant_Garamond'] text-lg md:text-xl italic text-stone-600 leading-relaxed">
              {plan.subtitle}
            </p>
          </div>

          {/* SEAL AREA WITH MOBILE HINT */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence>
              {!isFlipped && (
                <motion.div className="relative">
                  {/* Pulsing Ring (Mobile Only) */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#c9a961]/40 tap-hint-ring md:hidden" />

                  <img
                    src={sealAsset}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain mobile-seal-fix opacity-30 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 md:mix-blend-multiply drop-shadow-md"
                    alt="Official Seal"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <p className="font-['Pinyon_Script'] text-2xl text-[#c9a961]">
              Break the seal
            </p>
            <div className="h-px w-8 bg-stone-100 mx-auto" />
            <span className="md:hidden font-['Cinzel'] text-[7px] text-stone-300 tracking-widest uppercase mt-2 block">
              Tap to Reveal
            </span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="face face-back bg-white border-2 border-[#c9a961]/10 p-6 md:p-8 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3 mb-6">
            <span
              className={`font-['Cinzel'] text-[9px] md:text-[10px] tracking-widest font-bold uppercase ${styles.accent}`}
            >
              {plan.title}
            </span>
            <span className="font-['Pinyon_Script'] text-2xl text-stone-300">
              L & A
            </span>
          </div>

          <div className="flex-grow overflow-y-auto pr-2 custom-scroll">
            {plan.days.map((day, i) => (
              <div key={i} className="flex gap-4 mb-4 items-start">
                <div className="flex flex-col items-center min-w-[42px]">
                  <span
                    className={`font-['Cinzel'] text-[13px] font-bold ${styles.accent}`}
                  >
                    {day.date.split(" ")[0]}
                  </span>
                  <span className="font-['Cinzel'] text-[8px] text-stone-400 uppercase tracking-tighter">
                    {day.date.split(" ")[1]}
                  </span>
                </div>
                <div className="w-px h-6 bg-stone-50 self-center" />
                <p
                  className={`font-['Cormorant_Garamond'] text-[14px] md:text-[15px] leading-tight pt-0.5 ${
                    day.activity.includes(":")
                      ? "text-[#1a2849] font-bold"
                      : "text-stone-500 italic"
                  }`}
                >
                  {day.activity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100 text-center">
            <span className="font-['Cinzel'] text-[8px] tracking-[0.2em] text-stone-300 uppercase">
              Close Letter
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
