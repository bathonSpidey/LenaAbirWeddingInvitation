import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { NAVY_PRIMARY, CERULEAN_ACCENT } from "./TravelConstants";

export default function TravelPortalHeader() {
  const { t } = useTranslation();

  return (
    <header className="mb-20 text-center">
      <motion.p
        className={`font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase ${CERULEAN_ACCENT} font-bold mb-4`}
      >
        {t("travelPortal.label")}
      </motion.p>
      <h2
        className={`font-['Pinyon_Script'] text-8xl md:text-9xl ${NAVY_PRIMARY} mb-6`}
      >
        The Grand Tour
      </h2>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-12 bg-[#AF944D]/40" />
        <div className="w-2 h-2 rotate-45 border border-[#AF944D]" />
        <div className="h-px w-12 bg-[#AF944D]/40" />
      </div>
    </header>
  );
}
