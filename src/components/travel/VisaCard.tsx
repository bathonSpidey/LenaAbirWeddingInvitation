import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function VisaCard() {
  const { t } = useTranslation();

  return (
    <div className="bg-white/80 border border-blue-100 p-8 rounded-sm shadow-sm flex flex-col justify-between">
      <div>
        <h6 className="font-['Cinzel'] text-[10px] tracking-widest text-[#8B5E3C] mb-4 uppercase font-bold">
          Entry Requirements
        </h6>
        <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 mb-3">
          For our German and International guests, an e-Visa is required for
          entry into India.
        </p>
        <p className="font-['Cormorant_Garamond'] text-sm text-stone-400 italic mb-6">
          We recommend applying at least 4 weeks before travel.
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
        {t("flightGuide.eVisaPortal")}
      </motion.button>
    </div>
  );
}
