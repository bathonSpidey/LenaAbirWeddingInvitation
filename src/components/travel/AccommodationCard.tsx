import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AccommodationCard() {
  const { t } = useTranslation();

  const destinations = [
    { label: "Jorhat", sub: "Tea Estates", url: "https://..." },
    { label: "Kaziranga", sub: "Wilderness", url: "https://..." },
    { label: "Guwahati", sub: "The Gateway", url: "https://..." },
  ];

  return (
    <div className="bg-[#FAF9F6] border border-stone-200 p-10 rounded-sm shadow-sm relative flex flex-col h-full overflow-hidden">
      {/* HEADER AREA */}
      <div className="mb-6 text-center">
        <h6 className="font-['Cinzel'] text-[10px] tracking-[0.5em] text-[#8B5E3C] uppercase font-bold mb-2">
          {t("flightGuide.accomTitle")}
        </h6>
        <div className="flex justify-center items-center gap-4">
          <div className="h-[0.5px] w-12 bg-stone-300" />
          <p className="font-['Cormorant_Garamond'] text-base italic text-stone-500">
            {t("flightGuide.accomSub")}
          </p>
          <div className="h-[0.5px] w-12 bg-stone-300" />
        </div>
      </div>

      {/* SIDE-BY-SIDE BUTTONS */}
      <div className="grid grid-cols-3">
        {destinations.map((item, i) => (
          <button
            key={item.label}
            onClick={() => window.open(item.url, "_blank")}
            className={`flex flex-col items-center group transition-all px-1 ${
              i !== destinations.length - 1 ? "border-r border-stone-200" : ""
            }`}
          >
            <span className="block font-['Cinzel'] text-[11px] tracking-[0.3em] uppercase text-[#1a2849] group-hover:text-[#c9a961] transition-colors mb-1">
              {item.label}
            </span>
            <span className="block font-['Cormorant_Garamond'] text-[11px] italic text-stone-400 group-hover:text-stone-600 transition-colors">
              {item.sub}
            </span>
            <div className="mt-4 w-1 h-1 rounded-full bg-transparent group-hover:bg-[#c9a961] transition-all duration-500 scale-0 group-hover:scale-100" />
          </button>
        ))}
      </div>

      {/* THE CONCIERGE CALL-TO-ACTION */}
      {/* Reduced pt-8 to pt-4 to pull the whole section up */}
      <div className="pt-10  border-t border-stone-200 text-center">
        {/* Reduced mb-6 to mb-2 to pull the description up toward the title */}
        <div className="relative mb-2">
          <p className="font-['Pinyon_Script'] text-4xl text-[#c9a961] relative z-10">
            {t("arrangements.heading")}
          </p>
          {/* Adjusted top-1/2 to top-[60%] to better center the line behind the script descenders */}
          {/* <div className="absolute top-[60%] left-0 w-full h-[0.5px] bg-stone-200/60 -z-0" /> */}
        </div>

        {/* Reduced mb-8 to mb-5 to pull the button up */}
        <p className="font-['Cormorant_Garamond'] text-sm text-stone-600 italic mb-5 max-w-[280px] mx-auto leading-relaxed">
          {t("arrangements.callForConcierge")}
        </p>

        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => alert(t("arrangements.alert"))}
          className="w-full bg-[#1a2849] py-4 text-[10px] text-white font-['Cinzel'] tracking-[0.4em] uppercase relative shadow-lg shadow-blue-900/10 transition-shadow"
        >
          <div className="absolute inset-1 border border-white/10 pointer-events-none" />
          {t("arrangements.button")}
        </motion.button>
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-[0.03] font-['Cinzel'] text-[40px] tracking-[1em] pointer-events-none">
        ASSAM
      </div>
    </div>
  );
}
