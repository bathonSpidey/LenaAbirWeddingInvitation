import { motion } from "framer-motion";

const MapleLeafSVG = ({
  className,
  size = 60,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={className}
  >
    {/* Maple leaf — accurate 11-point silhouette */}
    <path
      d="
        M50 8
        C50 8 48 18 44 20
        C40 22 30 16 28 18
        C26 20 32 28 30 30
        C26 32 16 28 14 32
        C12 36 22 40 22 44
        C22 46 14 50 16 54
        C18 58 28 54 30 58
        C30 62 24 70 28 72
        C32 74 38 64 42 66
        C44 68 44 78 48 78
        L48 88
        L52 88
        L52 78
        C56 78 56 68 58 66
        C62 64 68 74 72 72
        C76 70 70 62 70 58
        C72 54 82 58 84 54
        C86 50 78 46 78 44
        C78 40 88 36 86 32
        C84 28 74 32 70 30
        C68 28 74 20 72 18
        C70 16 60 22 56 20
        C52 18 50 8 50 8
        Z
      "
      fill="currentColor"
    />
  </svg>
);

const LeafInstance = ({
  xPos = "10%",
  duration = 15,
  startY = "-10%",
  flip = 1,
}) => (
  <motion.div
    initial={{ y: startY, opacity: 0, rotate: 0 }}
    animate={{
      y: ["-10vh", "110vh"],
      x: [0, 80 * flip, -40 * flip, 20 * flip], // ← asymmetric drift
      rotate: [0, 120, 200, 360],
      rotateX: [0, 60, -40, 80, 0], // ← 3D flip (new)
      opacity: [0, 0.5, 0.45, 0.3, 0],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: ["easeIn", "linear", "linear", "linear"], // ← accelerating fall
    }}
    className="absolute pointer-events-none z-[50]"
    style={{ left: xPos, perspective: 400 }} // ← perspective for 3D
  >
    <MapleLeafSVG className="text-[#B98C8C]/30 w-8 h-8 md:w-12 md:h-12" />
  </motion.div>
);

export const FloatingLeaves = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[50] overflow-hidden">
      <LeafInstance xPos="8%" duration={20} startY="-10%" flip={1} />
      <LeafInstance xPos="25%" duration={28} startY="20%" flip={-1} />
      <LeafInstance xPos="50%" duration={24} startY="-15%" flip={1} />
      <LeafInstance xPos="75%" duration={32} startY="40%" flip={-1} />
      <LeafInstance xPos="90%" duration={18} startY="-5%" flip={1} />
    </div>
  );
};
