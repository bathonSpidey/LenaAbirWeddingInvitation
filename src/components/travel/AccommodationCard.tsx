import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface AccommodationItem {
  label: string;
  sublabel: string;
  url: string;
}

export default function AccommodationCard() {
  const { t } = useTranslation();

  const accommodations: AccommodationItem[] = [
    {
      label: "Jorhat",
      sublabel: t("flightGuide.jorhatSub"),
      url: "https://www.booking.com/searchresults.en-gb.html?ss=Jorhat",
    },
    {
      label: "Kaziranga",
      sublabel: t("flightGuide.kazirangaSub"),
      url: "https://www.booking.com/searchresults.en-gb.html?ss=Kaziranga",
    },
    {
      label: "Guwahati",
      sublabel: t("flightGuide.guwahatiSub"),
      url: "https://www.booking.com/searchresults.en-gb.html?ss=Guwahati",
    },
  ];

  return (
    <div className="bg-white/80 border border-blue-100 p-8 rounded-sm shadow-sm">
      <h6 className="font-['Cinzel'] text-[10px] tracking-widest text-[#8B5E3C] mb-2 uppercase font-bold">
        {t("flightGuide.accomTitle")}
      </h6>
      <p className="font-['Cormorant_Garamond'] text-sm italic text-stone-400 mb-6">
        {t("flightGuide.accomSub")}
      </p>
      <div className="space-y-3">
        {accommodations.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
            viewport={{ once: true }}
            onClick={() => window.open(item.url, "_blank")}
            className="w-full text-left flex justify-between items-center group cursor-pointer border-l-2 border-transparent hover:border-[#8B5E3C] pl-3 transition-all duration-300 py-2"
          >
            <div>
              <p className="font-['Cinzel'] text-[11px] tracking-widest uppercase text-[#2D3E50] font-bold group-hover:text-[#8B5E3C] transition-colors duration-300">
                {item.label}
              </p>
              <p className="font-['Cormorant_Garamond'] text-sm italic text-stone-400 group-hover:text-stone-500 transition-colors duration-300">
                {item.sublabel}
              </p>
            </div>
            <span className="font-['Cinzel'] text-[10px] text-stone-300 group-hover:text-[#8B5E3C] group-hover:translate-x-1 transition-all duration-300">
              ↗
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
