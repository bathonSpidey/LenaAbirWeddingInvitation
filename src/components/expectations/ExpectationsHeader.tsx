import { motion } from "framer-motion";

interface ExpectationsHeaderProps {
  label: string;
  heading: string;
  subtitle: string;
}

export default function ExpectationsHeader({
  label,
  heading,
  subtitle,
}: ExpectationsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-12"
    >
      <p className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase text-[#AF944D] mb-4 font-bold">
        {label}
      </p>
      <h2 className="font-['Pinyon_Script'] text-6xl md:text-8xl text-[#2A3F5C] mb-6 leading-none">
        {heading}
      </h2>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-px bg-[#AF944D]/40" />
        <div className="w-2 h-2 rotate-45 border border-[#AF944D]" />
        <div className="w-16 h-px bg-[#AF944D]/40" />
      </div>
      <p className="font-['Cormorant_Garamond'] text-2xl text-[#2A3F5C] italic max-w-xl leading-relaxed drop-shadow-sm">
        {subtitle}
      </p>
    </motion.div>
  );
}
