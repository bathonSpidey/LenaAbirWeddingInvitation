import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Jorhat from "../../assets/AssamMap.png";
import { S } from "./styles";

export default function VenueSection() {
  const { t } = useTranslation();
  return (
    <section className="pt-12 border-t border-stone-200/60">
      <p className={S.sectionLabel}>{t("venue.label")}</p>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-[#2D241E] mb-4 font-['Pinyon_Script'] text-5xl">{t("venue.name")}</h2>
          <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 leading-relaxed mb-6">
            {t("venue.desc")}
          </p>
          <address className="not-italic font-['Cinzel'] text-[10px] tracking-widest text-stone-400 leading-loose uppercase">
            National Highway 37, By Pass Rd
            <br />
            Bapuji Nagar, Jorhat
            <br />
            Assam 785006, India
          </address>
        </div>

        <div className="aspect-video bg-stone-200 rounded-sm overflow-hidden shadow-2xl relative group border border-white/50">
          <img
            src={Jorhat}
            alt="Map of Jorhat"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#2D241E]/5 group-hover:bg-transparent transition-colors" />
          <motion.button
            onClick={() =>
              window.open("https://maps.google.com/?q=THE+ROYAL+PARK+Jorhat+Assam", "_blank")
            }
            whileHover={{ y: -5, backgroundColor: "#2D241E", color: "#fdf8ec" }}
            className="absolute bottom-6 right-6 bg-white text-[#2D241E] px-6 py-3 text-[9px] font-['Cinzel'] tracking-[0.2em] uppercase shadow-2xl transition-all cursor-pointer"
          >
            {t("venue.navigate")}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
