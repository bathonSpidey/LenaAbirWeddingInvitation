import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface NavFooterProps {
  onOurStory: () => void;
}

export default function NavFooter({ onOurStory }: NavFooterProps) {
  const { t } = useTranslation();

  return (
    <section className="mt-8 mb-4 pt-6 relative flex justify-center group/footer">
      {/* IMPROVED: Decorative Divider with delicate fade */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#B98C8C]/30 to-transparent">
        {/* The "Anchor" - Diamond ornament */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 border border-[#B98C8C]/40 bg-[#FFF9F9] shadow-sm" />
      </div>

      <motion.button
        onClick={onOurStory}
        initial={{ backgroundColor: "#B98C8C" }}
        whileHover={{
          backgroundColor: "#A67C7C",
          scale: 1.03,
          boxShadow: "0 12px 30px rgba(185, 140, 140, 0.25)",
        }}
        whileTap={{ scale: 0.97 }}
        style={{
          backgroundColor: "#B98C8C",
          clipPath:
            "polygon(15px 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)",
        }}
        className="group relative text-[#FDFBF7] px-14 py-4 font-['Cinzel'] text-[10px] tracking-[0.4em] uppercase font-bold cursor-pointer flex items-center justify-center gap-5 overflow-hidden min-w-[280px]"
      >
        {/* TEXTURE OVERLAY: Makes it look like expensive cardstock */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Left Icon: Subtle rotation on hover */}
        <motion.span
          animate={{ rotate: [0, 90] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-[#FDFBF7]/50 text-[10px]"
        >
          ✧
        </motion.span>

        {/* MAIN TEXT: Pressed Effect */}
        <span className="relative z-10 drop-shadow-[0.5px_0.5px_0px_rgba(0,0,0,0.15)]">
          {t("navFooter.ourStory")}
        </span>

        {/* Right Icon */}
        <motion.span
          animate={{ rotate: [0, -90] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-[#FDFBF7]/50 text-[10px]"
        >
          ✧
        </motion.span>

        {/* IMPROVED GLINT: Slower, more "metallic" sweep */}
        <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[2000ms] bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
      </motion.button>
    </section>
  );
}
