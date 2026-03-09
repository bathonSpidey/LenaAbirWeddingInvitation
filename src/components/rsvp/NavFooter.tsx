import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface NavFooterProps {
  onOurStory: () => void;
}

export default function NavFooter({ onOurStory }: NavFooterProps) {
  const { t } = useTranslation();
  return (
    <section className="mt-12 pt-8 border-t border-stone-200/60 flex justify-center">
      <motion.button
        onClick={onOurStory}
        initial={{ backgroundColor: "#6B4226" }}
        whileHover={{
          backgroundColor: "#4A2D18",
          scale: 1.04,
          boxShadow: "0 8px 24px rgba(74,45,24,0.35)",
        }}
        whileTap={{ scale: 0.97 }}
        style={{
          clipPath: "polygon(24px 0%, calc(100% - 24px) 0%, 100% 50%, calc(100% - 24px) 100%, 24px 100%, 0% 50%)",
        }}
        className="text-[#fdf8ec] px-16 py-4 font-['Cinzel'] text-[10px] tracking-[0.25em] uppercase font-bold cursor-pointer flex items-center justify-center gap-3 shadow-md min-w-[260px]"
      >
        <span className="text-[#fdf8ec]/70 text-sm leading-none">♡</span>
        {t("navFooter.ourStory")}
        <span className="text-[#fdf8ec]/70 text-sm leading-none">♡</span>
      </motion.button>
    </section>
  );
}
