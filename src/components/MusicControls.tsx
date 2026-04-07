import { motion, AnimatePresence } from "framer-motion";

interface MusicControlsProps {
  isPlaying: boolean;
  onToggle: () => void;
  onReplay: () => void;
}

export default function MusicControls({ isPlaying, onToggle, onReplay }: MusicControlsProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#faf7f2]/80 backdrop-blur-sm border border-[#C9A84C]/50 shadow-md"
      >
        {/* Music note icon */}
        <span className="text-[#C9A84C] text-xs mr-0.5" aria-hidden>♪</span>

        {/* Play / Pause */}
        <button
          onClick={onToggle}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-7 h-7 flex items-center justify-center rounded-full text-[#8B6914] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
        >
          {isPlaying ? (
            // Pause icon
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <rect x="5" y="4" width="3" height="12" rx="1" />
              <rect x="12" y="4" width="3" height="12" rx="1" />
            </svg>
          ) : (
            // Play icon
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
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
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 3a7 7 0 100 14A7 7 0 0010 3zm-1.5 2.5A5.5 5.5 0 1115 10h-1.5a4 4 0 10-1.17 2.83l1.06 1.06A5.5 5.5 0 018.5 5.5z"
            />
            <path d="M9 6.5V10l2.5 1.5-.75 1.25L8 11V6.5H9z" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
