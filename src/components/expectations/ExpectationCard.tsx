import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react"; // Optional icons

interface ExpectationCardProps {
  number: string;
  tag: string;
  title: string;
  desc: string;
  img: string;
  index: number;
}

export default function ExpectationCard({
  number,
  tag,
  title,
  desc,
  img,
  index,
}: ExpectationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.8 }}
        viewport={{ once: true }}
        onClick={() => setIsOpen(true)}
        className="relative flex flex-col bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-500 group border border-stone-100 cursor-zoom-in h-full"
      >
        {/* Number Watermark */}
        <span className="absolute top-6 right-6 font-['Cinzel'] text-5xl text-[#4A90B8]/5 font-bold select-none z-0">
          {number}
        </span>

        {/* Image Container - Using the "Matte" approach for the thumbnail */}
        <div className="relative overflow-hidden h-[240px] border border-stone-100">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Subtle color tint to blend with garden texture */}
          <div className="absolute inset-0 bg-[#4A90B8]/5 mix-blend-multiply pointer-events-none" />

          {/* Hover Overlay with Icon */}
          <div className="absolute inset-0 bg-[#2A3F5C]/0 group-hover:bg-[#2A3F5C]/5 transition-colors duration-500 flex items-center justify-center">
            <ZoomIn className="text-[#2A3F5C] opacity-0 group-hover:opacity-40 transition-opacity duration-500 w-6 h-6 stroke-[1px]" />
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-8 flex-grow">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['Cinzel'] text-[9px] tracking-[0.3em] uppercase text-[#9B6BB5] font-bold">
              {tag}
            </span>
            <div className="h-px flex-1 bg-stone-100" />
          </div>

          <h3 className="font-['Cinzel'] text-[15px] tracking-[0.15em] text-[#2A3F5C] font-bold uppercase mb-3 leading-snug">
            {title}
          </h3>

          <p className="font-['Cormorant_Garamond'] text-[18px] leading-[1.6] text-stone-600 italic">
            {desc}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] bg-[#AF944D]/20 w-0 group-hover:w-full transition-all duration-700" />
      </motion.div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-[#1a2849]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-8 right-8 text-white/60 hover:text-white"
            >
              <X className="w-8 h-8 stroke-[1px]" />
            </motion.button>

            {/* Full Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            >
              <img
                src={img}
                alt={title}
                className="max-w-full max-h-[80vh] object-contain shadow-2xl border-4 border-white/5"
              />

              <div className="mt-8 text-center max-w-2xl">
                <h4 className="font-['Cinzel'] text-[#c9a961] text-xs tracking-[0.4em] uppercase mb-2">
                  {tag}
                </h4>
                <p className="font-['Cormorant_Garamond'] text-white text-2xl italic leading-relaxed">
                  {title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
