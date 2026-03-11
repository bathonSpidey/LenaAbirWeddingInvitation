import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Jorhat from "../../assets/AssamMap.png";
import Elephant from "../../assets/elephant.png";

const ELEPHANT_ICON = Elephant;

export default function VenueSection() {
  const { t } = useTranslation();

  return (
    <section
      /* REDUCED: Bottom padding from 10 to 4, negative margin to -mt-8 to pull it up */
      className="pb-4 pt-18 relative overflow-hidden -mt-8"
      style={{
        backgroundColor: "#FFF9F9",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20C40 20 30 30 30 40C30 50 40 60 50 60C60 60 70 50 70 40C70 30 60 20 50 20Z' fill='%23B98C8C' fill-opacity='0.04'/%3E%3C/svg%3E")`,
      }}
    >
      {/* TIGHTENED: mt-2 and mb-4 keeps the label close to the grid */}
      <p className="font-['Cinzel'] text-[10px] tracking-[0.4em] uppercase text-[#B98C8C] mt-2 mb-4 text-center opacity-80 relative z-10 font-bold">
        {t("venue.label")}
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-center max-w-6xl mx-auto px-6 relative z-10">
        {/* LEFT SIDE: Letterhead & Elephant Stamp */}
        <div className="flex flex-col space-y-4">
          {" "}
          {/* Reduced space-y from 6 to 4 */}
          <div>
            <h2 className="font-['Pinyon_Script'] text-5xl md:text-6xl text-[#AF944D] drop-shadow-sm mb-1">
              {t("venue.name")}
            </h2>
            <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 leading-tight">
              {t("venue.desc")}
            </p>
          </div>
          <div
            /* COMPACT: Reduced p-6 to p-4 */
            className="p-4 border border-[#B98C8C]/20 bg-white/60 backdrop-blur-md relative overflow-hidden shadow-inner flex gap-4"
            style={{
              boxShadow: "inset 0 2px 8px rgba(185, 140, 140, 0.1)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.04'/%3E%3C/svg%3E")`,
            }}
          >
            <div className="hidden sm:block flex-shrink-0">
              {/* SHRUNK: Elephant container w-20 to w-16 */}
              <div className="w-16 h-16 border border-[#B98C8C]/20 p-1 rounded-full flex items-center justify-center bg-[#FDFBF7] shadow-sm relative">
                <img
                  src={ELEPHANT_ICON}
                  alt="Royal Elephant Stamp"
                  className="w-12 h-12 object-contain drop-shadow-md"
                />
              </div>
            </div>

            <address className="not-italic font-['Cinzel'] text-[10px] tracking-[0.2em] text-[#A67C7C] leading-[2] uppercase flex-grow">
              <span className="block border-b border-[#B98C8C]/20 pb-0.5 mb-1 text-[#B98C8C] font-bold">
                Location Particulars
              </span>
              National Highway 37, By Pass Rd
              <br />
              <span className="text-stone-400">Bapuji Nagar, Jorhat</span>
              <br />
              <span className="text-[#B98C8C] font-bold">
                Assam 785006, India
              </span>
            </address>
          </div>
        </div>

        {/* RIGHT SIDE: The Gilded Map */}
        <div className="relative group p-2">
          {" "}
          {/* Reduced p-4 to p-2 */}
          {/* ASPECT RATIO: md:aspect-[21/9] makes the map much shorter/wider */}
          <div className="aspect-[4/3] md:aspect-[21/9] bg-[#FDFBF7] overflow-hidden relative shadow-xl border border-[#B98C8C]/10">
            <img
              src={Jorhat}
              alt="Map of Jorhat"
              className="w-full h-full object-cover filter sepia-[0.1] contrast-[1.02]"
            />

            <motion.button
              onClick={() => window.open("http://maps.google.com", "_blank")}
              whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98 }}
              /* COMPACT BUTTON: Reduced padding and text size */
              className="absolute bottom-4 right-4 px-6 py-2 border border-white/40 text-white text-[9px] font-['Cinzel'] font-bold tracking-[0.2em] uppercase shadow-xl"
              style={{ backgroundColor: "#B98C8C" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("venue.navigate")} →
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
