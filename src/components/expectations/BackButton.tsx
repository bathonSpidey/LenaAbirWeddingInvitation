import { motion } from "framer-motion";

interface BackButtonProps {
  label: string;
  onClick: () => void;
}

export default function BackButton({ label, onClick }: BackButtonProps) {
  return (
    <motion.div className="flex justify-center mt-12">
      <button
        onClick={onClick}
        className="group relative border border-[#2A3F5C] text-[#2A3F5C] py-3 px-12 text-[10px] font-['Cinzel'] tracking-[0.4em] uppercase overflow-hidden"
      >
        <span className="relative z-10 transition-colors group-hover:text-white">
          {label}
        </span>
        <div className="absolute inset-0 bg-[#2A3F5C] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    </motion.div>
  );
}
