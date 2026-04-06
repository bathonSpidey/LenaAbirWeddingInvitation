import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TajMahalKeepsake from "../../assets/TajMahal.png";
import { NAVY_PRIMARY } from "./TravelConstants";
import { useTranslation } from "react-i18next";

export default function TajMahalSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Counter-moving parallax for depth
  const textY = useTransform(scrollYProgress, [0, 1], [-10, 30]);
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -10]);

  // Subtle zoom-out on image as it enters
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1.06, 1]);
  const { t } = useTranslation();

  return (
    <section
      ref={containerRef}
      className="grid md:grid-cols-2 gap-8 md:gap-16 items-center py-16 px-4"
    >
      {/* TEXT CONTENT */}
      <motion.div style={{ y: textY }} className="order-2 md:order-1">
        {/* Entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#B98C8C]" />
            <span className="font-['Cinzel'] text-[10px] tracking-[0.3em] uppercase text-[#B98C8C]">
              {t("detour.label")}
            </span>
          </div>

          {/* Heading — larger so Pinyon Script can shine */}
          <h4
            className={`font-['Pinyon_Script'] text-4xl md:text-7xl ${NAVY_PRIMARY} mb-6 leading-none`}
          >
            {t("detour.heading")}
          </h4>

          {/* Body copy — bumped to text-2xl for editorial feel */}
          <p className="font-['Cormorant_Garamond'] text-2xl italic text-stone-600 leading-relaxed max-w-md">
            {t("detour.desc")}
          </p>

          {/* Decorative closing line — tied back to palette */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#AF944D]/50" />
            <div className="w-1 h-1 rotate-45 border border-[#AF944D]/40" />
            <div className="h-px w-8 bg-[#AF944D]/30" />
          </div>
        </motion.div>
      </motion.div>

      {/* IMAGE */}
      <motion.div style={{ y: imageY }} className="order-1 md:order-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative aspect-[4/3] md:aspect-video overflow-hidden shadow-2xl"
        >
          <motion.img
            style={{ scale: imageScale }}
            src={TajMahalKeepsake}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2500ms] ease-out"
            alt="Taj Mahal illustration"
          />
          {/* Inset border overlay — framed print effect */}
          <div className="absolute inset-3 border border-white/30 pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
}
