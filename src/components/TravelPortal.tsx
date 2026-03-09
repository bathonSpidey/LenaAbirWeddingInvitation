import React, { useEffect } from "react";
import FlightGuide from "./FlightGuide";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TravelTexture from "../assets/travel-texture.png";

export default function TravelPortal({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      ref={innerRef}
      className="min-h-screen w-full bg-[#f0f4f7] py-20 px-6 md:px-20 snap-start relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"
        style={{
          backgroundImage: `url(${TravelTexture})`,
          backgroundSize: "cover",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-['Cinzel'] text-[9px] tracking-[0.5em] uppercase text-[#8B5E3C] font-bold mb-6 opacity-80">
            {t("travelPortal.label")}
          </p>
          <h2 className="font-['Pinyon_Script'] text-7xl md:text-9xl mb-4 text-[#2D3E50]">
            {t("travelPortal.heading")}
          </h2>
          <div className="h-px w-32 bg-[#8B5E3C]/30 mx-auto mb-6" />
          <p className="font-['Cinzel'] text-[11px] tracking-[0.6em] uppercase text-[#2D3E50] opacity-70">
            {t("travelPortal.subheading")}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-10">
          {/* FLIGHT SECTION */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-sm border border-blue-100 shadow-xl shadow-blue-900/5"
          >
            <FlightGuide />
          </motion.section>

          {/* STAYS & VISA GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* VISA CARD */}
            <div className="bg-white/80 border border-blue-100 p-8 rounded-sm shadow-sm flex flex-col justify-between">
              <div>
                <h6 className="font-['Cinzel'] text-[10px] tracking-widest text-[#8B5E3C] mb-4 uppercase font-bold">
                  Entry Requirements
                </h6>
                <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 mb-3">
                  For our German and International guests, an e-Visa is required
                  for entry into India.
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

            {/* STAYS CARD */}
            <div className="bg-white/80 border border-blue-100 p-8 rounded-sm shadow-sm">
              <h6 className="font-['Cinzel'] text-[10px] tracking-widest text-[#8B5E3C] mb-2 uppercase font-bold">
                {t("flightGuide.accomTitle")}
              </h6>
              <p className="font-['Cormorant_Garamond'] text-sm italic text-stone-400 mb-6">
                {t("flightGuide.accomSub")}
              </p>
              <div className="space-y-3">
                {[
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
                ].map((item, i) => (
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
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#2D3E50]">
            {t("travelPortal.footer")}
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
