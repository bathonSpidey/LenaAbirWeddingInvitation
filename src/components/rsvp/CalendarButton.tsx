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
        filter: "brightness(1.08)", // Slight lift on hover
      }}
      whileTap={{ scale: 0.98 }}
      className="
        flex items-center gap-4 py-3 px-5 cursor-pointer relative group
        border border-white/20
        shadow-[4px_4px_15px_rgba(0,0,0,0.08)]
        transition-all duration-300 overflow-hidden
        w-full
      "
      style={{
        backgroundColor: "#B98C8C",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='silk'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23silk)' opacity='0.08'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Icon Container: Pure transparent, no blending */}
      <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 relative flex items-center justify-center bg-transparent">
        <img
          src={iconUrl}
          alt={label}
          /* Removed mix-blend-multiply and brightness/contrast filters */
          className="w-full h-full object-contain drop-shadow-md"
        />
      </div>

      <span
        className="text-[10px] md:text-[11px] font-['Cinzel'] tracking-[0.25em] uppercase font-bold text-left leading-tight"
        style={{
          color: "#FDFBF7",
          textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
        }}
      >
        {label}
      </span>

      {/* Decorative inner frame */}
      <div className="absolute inset-[4px] border border-dashed border-white/10 pointer-events-none" />

      {/* Pearlescent Shine */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </motion.button>
  );
}
