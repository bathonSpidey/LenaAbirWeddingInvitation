import { motion } from "framer-motion";

export default function CultureMorph({ active }: { active: boolean }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: "20%",
        left: "10%",
        width: 220,
        height: 220,
        zIndex: 2,
        opacity: 0.08,
      }}
    >
      {/* Tea Leaf */}
      <motion.svg
        viewBox="0 0 200 200"
        style={{ position: "absolute", inset: 0 }}
        animate={{
          opacity: active ? 0 : 1,
          scale: active ? 0.8 : 1,
        }}
        transition={{ duration: 1.6 }}
      >
        <path
          d="M100 30 C140 50 150 100 120 140 C90 170 60 140 60 100 C60 70 80 50 100 30"
          fill="#C9A84C"
        />
      </motion.svg>

      {/* Hop Vine */}
      <motion.svg
        viewBox="0 0 200 200"
        style={{ position: "absolute", inset: 0 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.8,
        }}
        transition={{ duration: 2 }}
      >
        <path
          d="M100 40 C120 60 130 90 120 120 C110 150 90 150 80 120 C70 90 80 60 100 40
             M100 120 C110 150 130 170 150 180"
          fill="#C9A84C"
        />
      </motion.svg>
    </div>
  );
}
