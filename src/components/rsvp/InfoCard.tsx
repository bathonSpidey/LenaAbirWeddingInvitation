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
      bg: "#FDFBF7",
      text: "#8B6E2A",
      highlight: "rgba(255,255,255,0.7)",
      shadow: "rgba(0,0,0,0.08)",
    },
    wedgwood: {
      bg: "#F2F5F7",
      text: "#475569",
      highlight: "rgba(255,255,255,0.6)",
      shadow: "rgba(0,0,0,0.06)",
    },
    sage: {
      bg: "#F4F6F2",
      text: "#525E54",
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
        <div className="flex justify-center mt-2">
          <motion.button
            onClick={onButtonClick}
            whileHover={{
              scale: 1.02,
              backgroundColor: "#8B1A1A",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            className="
              px-10 py-2.5 relative overflow-hidden group
              bg-[#7A1616] border border-[#C9A84C]/50
              text-[#F1E4A1] font-['Cinzel'] text-[10px] font-bold tracking-[0.25em] uppercase
              shadow-md transition-all duration-300
            "
          >
            <div className="absolute inset-[3px] border border-dashed border-[#C9A84C]/20 pointer-events-none opacity-40" />
            <span className="relative z-10">{buttonLabel}</span>
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
