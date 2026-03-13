import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import RegencyButton from "./RegencyButton";
import RegencyStepItem from "./RegencyStepItem";
import Ship from "../../assets/Ship.png";
import Carriage from "../../assets/Carriage.png";

export default function FlightGuide() {
  const { t } = useTranslation();

  const COLORS = {
    navy: "#1a2849",
    gold: "#c9a961",
    rose: "#a67c7c",
    sage: "#8a9b7f",
  };

  return (
    <div>
      {/* Compact heading - no diamond icon */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <h4
          className="font-['Cinzel'] text-[10px] font-bold tracking-[0.4em] uppercase"
          style={{ color: COLORS.gold }}
        >
          {t("flightGuide.heading")}
        </h4>
      </motion.div>

      {/* Steps container - side by side on desktop, vertical on mobile */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        style={{ color: COLORS.navy }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.05,
            },
          },
        }}
      >
        {/* STEP 1 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15,
              },
            },
          }}
        >
          <RegencyStepItem
            icon={
              <img src={Ship} alt="Ship" className="w-12 h-12 object-contain" />
            }
            title={t("flightGuide.step1Title")}
            description={t("flightGuide.step1Desc")}
            accent="rose"
          >
            <RegencyButton
              label={t("flightGuide.searchFlights")}
              onClick={() =>
                window.open("https://www.google.com/travel/flights", "_blank")
              }
              size="sm"
            />
          </RegencyStepItem>
        </motion.div>

        {/* STEP 2 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15,
              },
            },
          }}
        >
          <RegencyStepItem
            icon={
              <img
                src={Carriage}
                alt="Ship"
                className="w-12 h-12 object-contain"
              />
            }
            title={t("flightGuide.step2Title")}
            description={t("flightGuide.step2Desc")}
            accent="sage"
          >
            <div className="space-y-2">
              <RegencyButton
                label={t("flightGuide.delhiToJorhat")}
                onClick={() =>
                  window.open(
                    "https://www.google.com/travel/flights?q=Flights%20to%20JRH%20from%20DEL",
                    "_blank",
                  )
                }
                fullWidth
                size="sm"
              />
              <RegencyButton
                label={t("flightGuide.kolkataToJorhat")}
                onClick={() =>
                  window.open(
                    "https://www.google.com/travel/flights?q=Flights%20to%20JRH%20from%20CCU",
                    "_blank",
                  )
                }
                fullWidth
                size="sm"
              />
            </div>
          </RegencyStepItem>
        </motion.div>
      </motion.div>
    </div>
  );
}
