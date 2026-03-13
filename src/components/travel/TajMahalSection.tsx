import { motion } from "framer-motion";
import TajMahalKeepsake from "../../assets/TajMahal.png";
import { NAVY_PRIMARY, DUSTY_ROSE } from "./TravelConstants";

export default function TajMahalSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      <div className="order-2 md:order-1">
        <div
          className={`inline-block px-3 py-1 mb-4 border border-[#B98C8C] ${DUSTY_ROSE} font-['Cinzel'] text-[9px] tracking-widest uppercase`}
        >
          A Romantic Detour
        </div>
        <h4 className={`font-['Pinyon_Script'] text-5xl ${NAVY_PRIMARY} mb-4`}>
          The Monument of Love
        </h4>
        <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 leading-relaxed">
          As your journey likely brings you through Delhi, we highly recommend a
          visit to the Taj Mahal in Agra. It is a three-hour drive from the
          capital—a fleeting moment to witness the world's most beautiful
          tribute to love.
        </p>
      </div>
      <div className="order-1 md:order-2 aspect-video bg-stone-200 overflow-hidden rounded-sm shadow-lg">
        <img
          src={TajMahalKeepsake}
          className="w-full h-full object-cover brightness-[0.97] contrast-[1.03]"
          alt="Taj Mahal"
        />
      </div>
    </motion.section>
  );
}
