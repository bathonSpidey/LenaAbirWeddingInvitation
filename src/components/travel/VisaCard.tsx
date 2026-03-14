import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import VisaStamp from "../../assets/VisaStamp.png"; // Your new asset

export default function VisaCard() {
  const { t } = useTranslation();

  return (
    <div className="relative group bg-[#FAF9F6] border border-stone-200 p-10 rounded-sm shadow-sm flex flex-col justify-between h-full min-h-[350px] overflow-hidden">
      {/* THE ASSET WATERMARK */}
      <div className="absolute -top-4 -right-4 w-32 h-32 opacity-[0.4] pointer-events-none transform -rotate-12 group-hover:rotate-0 group-hover:opacity-[0.1] transition-all duration-1000">
        <img
          src={VisaStamp}
          alt="Visa Insignia"
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      <div>
        {/* REGENCY STATIONERY HEADER */}
        <div className="text-center mb-8">
          <h6 className="font-['Cinzel'] text-[9px] tracking-[0.5em] text-stone-400 uppercase font-bold mb-2">
            Formal Requirement
          </h6>
          <div className="flex justify-center items-center gap-3">
            <div className="h-px w-8 bg-stone-200" />
            <span className="font-['Pinyon_Script'] text-3xl text-[#c9a961]">
              The e-Visa
            </span>
            <div className="h-px w-8 bg-stone-200" />
          </div>
        </div>

        <div className="space-y-6 text-center">
          <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#1a2849] leading-snug">
            "For our esteemed international guests, an official entry permit is
            required for your voyage to India."
          </p>

          <div className="inline-block border-y border-stone-200 py-2 px-6">
            <p className="font-['Cinzel'] text-[10px] tracking-widest text-stone-400 uppercase">
              Apply <span className="text-[#c9a961] font-bold">4 Weeks</span>{" "}
              Prior
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <motion.button
          onClick={() =>
            window.open(
              "https://indianvisaonline.gov.in/evisa/tvoa.html",
              "_blank",
            )
          }
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#1a2849] py-4 text-[10px] text-white font-['Cinzel'] tracking-[0.4em] uppercase transition-all relative shadow-xl shadow-blue-900/10"
        >
          {/* Internal 'Engraved' Border */}
          <div className="absolute inset-1 border border-white/10 pointer-events-none" />

          <span className="relative z-10">{t("flightGuide.eVisaPortal")}</span>
        </motion.button>

        <p className="text-center mt-4 font-['Cormorant_Garamond'] text-[11px] italic text-stone-400">
          A courtesy reminder from your hosts
        </p>
      </div>
    </div>
  );
}
