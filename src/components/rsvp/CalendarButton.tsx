import { motion } from "framer-motion";

export default function CalendarButton({
  iconUrl,

  label,

  onClick,
}: {
  iconUrl: string;

  label: string;

  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.01,

        backgroundColor: "#1E2A3D",

        borderColor: "#C9A84C",
      }}
      whileTap={{ scale: 0.97, backgroundColor: "#F7F3E9" }}
      className="
        flex items-center gap-4 py-2 px-4 cursor-pointer relative group
        bg-[#1A2332]
        border border-[#C9A84C]/40
        shadow-[2px_2px_0px_rgba(139,110,42,0.1),0_2px_8px_rgba(0,0,0,0.05)]
        transition-all duration-300 overflow-hidden
        w-full
      "
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        backgroundColor: "#1E2A3D",
      }}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 relative flex items-center justify-center">
        <img
          src={iconUrl}
          alt={label}
          className="w-full h-full object-contain group-active:scale-110 transition-transform duration-500 drop-shadow-md"
        />
      </div>
      <span
        className="text-[10px] md:text-[11px] font-['Cinzel'] tracking-[0.2em] md:tracking-[0.25em] uppercase font-bold text-left leading-tight transition-colors duration-300"
        style={{
          color: "#E3C376",
          textShadow:
            "0.5px 0.5px 0px rgba(255,255,255,0.2), 0px 0px 8px rgba(227, 195, 118, 0.35)",
        }}
      >
        {label}
      </span>
      <div className="absolute inset-0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

      <div className="absolute inset-[2px] border border-[#C9A84C]/15 pointer-events-none" />
    </motion.button>
  );
}
