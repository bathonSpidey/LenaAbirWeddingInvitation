import { motion } from "framer-motion";
import { CRIMSON_PASSION, DEEP_WINE } from "./Constants";

const FeatureCard = ({
  title,
  desc,
  img,
  delay,
}: {
  title: string;
  desc: string;
  img?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="flex flex-col gap-4 group"
  >
    {/* Frame: Changed border to Burnished Gold for that jewel look */}
    <div className="aspect-[4/5] overflow-hidden rounded-sm bg-[#FAF3E8] shadow-[0_15px_35px_rgba(212,175,106,0.25)] border-[1px] border-[#D4AF6A]/60 p-1">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </div>

    {/* Sublabel in Crimson Passion */}
    <h2
      className={`font-['Cinzel'] text-[10px] tracking-[0.4em] ${CRIMSON_PASSION} mt-2 uppercase font-bold`}
    >
      {title}
    </h2>

    {/* Desc in Deep Teal */}
    <p
      className={`font-['Cormorant_Garamond'] text-xl italic ${DEEP_WINE} leading-tight`}
    >
      {desc}
    </p>
  </motion.div>
);

export default FeatureCard;
