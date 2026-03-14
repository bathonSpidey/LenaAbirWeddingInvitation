import { useState, useEffect } from "react";
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
          <div className="absolute inset-0 bg-[#1a2849]/0 group-hover:bg-[#1a2849]/5 transition-colors duration-500 flex items-center justify-center">
            <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-sm">
              <ZoomIn className="text-[#2A3F5C] w-4 h-4 stroke-[1.5px]" />
            </div>
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
            className="fixed inset-0 z-[100] bg-[#1a2849]/98 backdrop-blur-lg flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          >
            <motion.button
              className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
              whileHover={{ rotate: 90 }}
            >
              <X className="w-10 h-10 stroke-[1px]" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center"
            >
              <img
                src={img}
                alt={title}
                className="max-w-full max-h-[75vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              />

              <div className="mt-10 text-center">
                <h4 className="font-['Cinzel'] text-[#c9a961] text-[10px] tracking-[0.5em] uppercase mb-3">
                  {tag}
                </h4>
                <p className="font-['Pinyon_Script'] text-white text-4xl md:text-5xl drop-shadow-lg">
                  {title}
                </p>
                <div className="w-12 h-px bg-[#c9a961]/40 mx-auto mt-6" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
