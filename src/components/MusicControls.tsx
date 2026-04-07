import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicControlsProps {
  isPlaying: boolean;
  onToggle: () => void;
  onReplay: () => void;
}

export default function MusicControls({
  isPlaying,
  onToggle,
  onReplay,
}: MusicControlsProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-5 right-5 z-50 flex items-center overflow-hidden rounded-full bg-[#faf7f2]/80 backdrop-blur-sm border border-[#C9A84C]/50 shadow-md"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="controls"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center gap-1 pl-3 overflow-hidden"
          >
            {/* Scrolling Track Name */}
            <div className="w-20 overflow-hidden whitespace-nowrap mask-fade mr-1">
              <motion.span
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 100,
                  ease: "linear",
                }}
                className="inline-block text-[10px] uppercase tracking-wider text-[#8B6914]/70 font-medium"
              >
                360" – Written by Charlotte Aitchison, Alexander Guy Cook, et
                al. Arranged for Cello Obligato and String Quartet by Peter
                Gregson. Performed by Peter Gregson.Used for personal
                celebration purposes
              </motion.span>
            </div>

            {/* Play / Pause */}
            <button
              onClick={onToggle}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="w-7 h-7 flex items-center justify-center rounded-full text-[#8B6914] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
            >
              {isPlaying ? (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <rect x="5" y="4" width="3" height="12" rx="1" />
                  <rect x="12" y="4" width="3" height="12" rx="1" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M6.5 4.5l9 5.5-9 5.5V4.5z" />
                </svg>
              )}
            </button>

            {/* Replay */}
            <button
              onClick={onReplay}
              aria-label="Replay music from start"
              className="w-7 h-7 flex items-center justify-center rounded-full text-[#8B6914] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 4V1L6 5l4 4V6a4 4 0 110 8 4 4 0 01-3.87-3H4.07A6 6 0 1010 4z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music note toggle button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label={
          expanded ? "Collapse music controls" : "Expand music controls"
        }
        className="w-9 h-9 flex items-center justify-center text-[#C9A84C] hover:text-[#8B6914] transition-colors text-base"
      >
        ♪
      </button>
    </motion.div>
  );
}
