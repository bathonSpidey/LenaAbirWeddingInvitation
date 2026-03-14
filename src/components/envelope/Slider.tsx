import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import Dove from "../../assets/dove.png";
import Land from "../../assets/handLand.png";
import Thanks from "../../assets/Thanks.png";

const KNOB_SIZE = 48;
const PADDING = 4;

export default function RoyalRSVPSlider({ onRSVP }: { onRSVP: () => void }) {
  const [completed, setCompleted] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const maxDrag = Math.max(0, trackWidth - KNOB_SIZE - PADDING * 2);
  const centerX = Math.max(0, (trackWidth - KNOB_SIZE) / 2 - PADDING);

  // S-curve y offset only active while dragging (not sliding to center)
  const yCurve = useTransform(
    x,
    [0, maxDrag * 0.25, maxDrag * 0.5, maxDrag * 0.75, maxDrag],
    [0, -12, 0, 12, 0],
  );

  const pathLengthValue = useTransform(x, [0, maxDrag], [0, 1]);
  const textOpacity = useTransform(x, [0, maxDrag * 0.3], [1, 0]);

  const triggerSuccess = () => {
    setCompleted(true);
    animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 25 });

    setTimeout(() => {
      // Switch to manual y control and snap it to 0 (the S-curve endpoint is ~0 anyway)
      setSliding(true);
      y.set(yCurve.get()); // sync current value before taking over
      animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });

      // Slide x to center in a straight line
      animate(x, centerX, {
        type: "spring",
        stiffness: 120,
        damping: 28,
        restDelta: 0.5,
      }).then(() => {
        setTimeout(onRSVP, 400);
      });
    }, 600);
  };

  const handleDragEnd = () => {
    if (x.get() >= maxDrag * 0.8) {
      triggerSuccess();
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  const handleDoveClick = () => {
    if (completed) return;
    animate(x, maxDrag, {
      duration: 1.2,
      ease: [0.45, 0.05, 0.55, 0.95],
    }).then(triggerSuccess);
  };

  // While sliding to center, use the manually controlled y (animating to 0)
  // While dragging, use the S-curve derived from x
  const activeY = sliding ? y : yCurve;

  return (
    <div
      ref={(el) => (el && setTrackWidth(el.offsetWidth)) || undefined}
      className="relative rounded-full select-none mx-auto"
      style={{
        height: KNOB_SIZE + PADDING * 2,
        background: "#FDFBF7",
        border: "1px solid #D4AF37",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.03)",
        width: "100%",
        maxWidth: 320,
      }}
    >
      {/* 1. The S-Curve Flight Path */}
      <motion.svg
        key={trackWidth}
        animate={{ opacity: completed ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          left: PADDING + KNOB_SIZE / 2,
          width: maxDrag,
          height: 40,
          top: "50%",
          transform: "translateY(-50%)",
          overflow: "visible",
          zIndex: 1,
        }}
      >
        <motion.path
          d={`M 0 20 Q ${maxDrag / 4} 5, ${maxDrag / 2} 10 T ${maxDrag} 20`}
          fill="transparent"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: pathLengthValue }}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212,175,55,0)" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* 2. Instruction Text */}
      <motion.p
        style={{
          opacity: textOpacity,
          fontFamily: "'Cinzel', serif",
          fontSize: "9px",
          letterSpacing: "0.2em",
          color: "#8B7355",
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        Slide the Messenger
      </motion.p>

      {/* 3. The Target Hand */}
      <motion.div
        animate={
          completed ? { scale: 0.8, opacity: 0 } : { scale: 1.4, opacity: 1 }
        }
        transition={{ duration: 0.5 }}
        className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ width: KNOB_SIZE, height: KNOB_SIZE }}
      >
        <img src={Land} alt="Waiting" className="w-4/5 h-4/5 object-contain" />
      </motion.div>

      {/* 4. The Dove / Success Icon */}
      <motion.div
        drag={!completed ? "x" : false}
        dragConstraints={{ left: 0, right: maxDrag }}
        onDragEnd={handleDragEnd}
        onClick={handleDoveClick}
        style={{
          x,
          y: activeY,
          left: PADDING,
          top: PADDING,
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          position: "absolute",
          zIndex: 10,
          cursor: completed ? "default" : "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={!completed ? { y: [0, -2, 0] } : {}}
        transition={
          !completed
            ? { repeat: Infinity, duration: 3, ease: "easeInOut" }
            : {}
        }
      >
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.img
              key="dove"
              src={Dove}
              exit={{ scale: 0, opacity: 0, rotate: 15 }}
              transition={{ duration: 0.3 }}
              className="w-[90%] h-[90%] object-contain pointer-events-none"
            />
          ) : (
            <motion.img
              key="thanks"
              src={Thanks}
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1.4, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-full h-full object-contain"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* 5. The Sparkle Trail */}
      <motion.div
        animate={{ opacity: completed ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{
          x,
          left: PADDING + KNOB_SIZE / 2,
          top: "50%",
          translateY: "-50%",
          position: "absolute",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#FFF",
          boxShadow: "0 0 10px #D4AF37",
          zIndex: 2,
        }}
      />
    </div>
  );
}