import { motion } from "framer-motion";

interface InfoCardProps {
  title: string;
  body: string;
  buttonLabel: string;
  onButtonClick: () => void;
  variant?: "champagne" | "wedgwood" | "sage";
  icon?: string;
}

export default function InfoCard({
  title,
  body,
  buttonLabel,
  onButtonClick,
  variant = "champagne",
  icon,
}: InfoCardProps) {
  const themes = {
    champagne: {
      bg: "#FAEEED", // Soft Petal Pink
      text: "#AF944D", // Muted Rose Text
      btnBg: "#B98C8C", // Your chosen Rose Quartz for the button
      btnText: "#FDFBF7", // Ivory text for the button
      highlight: "rgba(255,255,255,0.8)",
      shadow: "rgba(166, 124, 124, 0.15)",
    },
    wedgwood: {
      bg: "#E1E9F0",
      text: "#4A647A",
      btnBg: "#4A647A",
      btnText: "#FDFBF7",
      highlight: "rgba(255,255,255,0.6)",
      shadow: "rgba(0,0,0,0.06)",
    },
    sage: {
      bg: "#F2F5F0",
      text: "#5F6B5E",
      btnBg: "#5F6B5E",
      btnText: "#FDFBF7",
      highlight: "rgba(255,255,255,0.6)",
      shadow: "rgba(0,0,0,0.06)",
    },
  };

  return (
    <section
      className="flex flex-col p-5 md:p-6 relative overflow-hidden border shadow-sm h-full"
      style={{
        backgroundColor: themes[variant].bg,
        borderColor: "rgba(201, 168, 76, 0.25)",
        /* HANDMADE PAPER TEXTURE */
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperGrain)' opacity='0.07'/%3E%3C/svg%3E")`,
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Decorative Gold Tooling Corners */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C9A84C]/35" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C9A84C]/35" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-4">
          {/* THE BLIND EMBOSS ICON CONTAINER */}
          {icon && (
            <div
              className="relative p-1.5 rounded-sm flex-shrink-0"
              style={{
                /* Inner shadow for the 'pit' and outer highlight for the 'raised edge' */
                boxShadow: `inset 1.5px 1.5px 3px ${themes[variant].shadow}, 1px 1px 0px ${themes[variant].highlight}`,
                backgroundColor: "rgba(0,0,0,0.01)",
              }}
            >
              <img
                src={icon}
                alt=""
                className="w-10 h-10 md:w-12 md:h-12 object-contain filter drop-shadow-sm brightness-[1.03]"
              />
            </div>
          )}

          <h2
            className="font-['Cinzel'] text-base md:text-lg tracking-[0.22em] uppercase font-bold leading-tight"
            style={{
              color: themes[variant].text,
              textShadow: `1px 1px 0px ${themes[variant].highlight}`,
            }}
          >
            {title}
          </h2>
        </div>

        {/* Body Text */}
        <p className="font-['Cormorant_Garamond'] text-base md:text-[1.15rem] text-stone-800 leading-tight italic mb-6 opacity-95">
          {body}
        </p>

        {/* Action Button */}
        {/* Action Button */}
        <div className="flex justify-center mt-auto">
          <motion.button
            onClick={onButtonClick}
            whileHover={{
              scale: 1.02,
              filter: "brightness(1.1)",
              boxShadow: `0 8px 20px ${themes[variant].shadow}`,
            }}
            whileTap={{ scale: 0.98 }}
            /* 1. REMOVED: bg-[#7A1616] and text-[#F1E4A1] from className */
            className="
      px-10 py-3 relative overflow-hidden group
      border border-white/30
      font-['Cinzel'] text-[10px] font-bold tracking-[0.25em] uppercase
      transition-all duration-300 shadow-md
    "
            style={{
              /* 2. ADDED: This now controls the color dynamically */
              backgroundColor: themes[variant].btnBg,
              color: themes[variant].btnText,
            }}
          >
            {/* The stitching line */}
            <div className="absolute inset-[3px] border border-dashed border-white/20 pointer-events-none opacity-40" />

            <span className="relative z-10">{buttonLabel}</span>

            {/* The metallic glint */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
