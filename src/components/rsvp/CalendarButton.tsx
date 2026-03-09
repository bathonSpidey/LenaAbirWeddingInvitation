import { motion } from "framer-motion";

interface CalendarButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export default function CalendarButton({ icon, label, onClick }: CalendarButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      style={{ background: "#C9A84C" }}
      className="flex items-center gap-3 text-[9px] font-['Cinzel'] text-white tracking-widest uppercase py-2 px-4 cursor-pointer"
    >
      <span className="text-base">{icon}</span>
      {label}
    </motion.button>
  );
}
