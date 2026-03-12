import { motion } from "framer-motion";

interface PinProps {
  image?: string;
  title: string;
}

export const Pin = ({ image, title }: PinProps) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ scale: 1.05, rotate: 2 }}
    className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[3px] border-[#D4AF37] shadow-2xl overflow-hidden bg-[#3E4A3D] flex-shrink-0 ring-4 ring-[#3E4A3D]/10 relative z-20"
    style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
  >
    {image ? (
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover block contrast-[1.05] brightness-[0.95]"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-3 h-3 rotate-45 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
      </div>
    )}
  </motion.div>
);
