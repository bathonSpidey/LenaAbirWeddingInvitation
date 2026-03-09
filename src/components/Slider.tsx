import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState } from "react";
import weddingCake from "../assets/wedding-cake.svg";
import coupleSvg from "../assets/couple.svg";
import afterSlideSvg from "../assets/after-slide.svg";

const KNOB_SIZE = 44;
const PADDING = 4;

export default function FlowerSlider({ onRSVP }: { onRSVP: () => void }) {
  const [completed, setCompleted] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);
  const maxDrag = Math.max(0, trackWidth - KNOB_SIZE - PADDING * 2);

  const fillOpacity = useTransform(x, [0, maxDrag], [0, 1]);
  const textOpacity = useTransform(x, [0, maxDrag * 0.25], [1, 0]);
  const knobScale = useTransform(x, [maxDrag * 0.7, maxDrag], [1, 1.12]);

  const handleDragEnd = () => {
    if (x.get() >= maxDrag * 0.8) {
      animate(x, maxDrag, { type: "spring", stiffness: 400, damping: 30 });
      setCompleted(true);
      setTimeout(onRSVP, 650);
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  return (
    <div
      ref={(el) => {
        if (el && el.offsetWidth !== trackWidth) setTrackWidth(el.offsetWidth);
      }}
      className="relative rounded-full select-none"
      style={{
        height: KNOB_SIZE + PADDING * 2,
        border: "1.5px solid rgba(185,145,40,0.75)",
        background: "linear-gradient(90deg, #f5e8c0 0%, #e8d08a 100%)",
        boxShadow: "inset 0 1px 4px rgba(120,90,20,0.15), 0 1px 6px rgba(180,140,40,0.18)",
        width: "100%",
        maxWidth: 300,
      }}
    >
      {/* Animated gold fill */}
      <motion.div
        style={{
          opacity: fillOpacity,
          background:
            "linear-gradient(90deg, rgba(185,145,40,0.55) 0%, rgba(201,160,30,0.85) 100%)",
        }}
        className="absolute inset-0 rounded-full pointer-events-none"
      />

      {/* Slide label */}
      <motion.p
        style={{
          opacity: textOpacity,
          fontFamily: "'Cinzel', serif",
          fontSize: 7,
          letterSpacing: "0.35em",
          color: "rgba(90,60,10,0.8)",
          textTransform: "uppercase",
          userSelect: "none",
          pointerEvents: "none",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {completed ? "See you there!" : "Slide to RSVP"}
      </motion.p>

      {/* Bride & Groom target on the right */}
      <motion.div
        className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ width: KNOB_SIZE, height: KNOB_SIZE }}
        animate={completed ? { scale: [1, 1.35, 1] } : {}}
        transition={{ duration: 0.45 }}
      >
        <img
          src={coupleSvg}
          alt="couple"
          style={{ width: 32, height: 32, objectFit: "contain" }}
        />
      </motion.div>

      {/* Draggable bouquet knob */}
      <motion.div
        drag={completed ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.03}
        style={{
          x,
          scale: knobScale,
          position: "absolute",
          left: PADDING,
          top: PADDING,
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          borderRadius: "50%",
          background: completed
            ? "linear-gradient(135deg, #c8a84b, #a07820)"
            : "linear-gradient(135deg, #d4a82a, #b8880c)",
          border: `1.5px solid ${completed ? "rgba(140,100,10,0.9)" : "rgba(160,118,20,0.7)"}`,
          cursor: completed ? "default" : "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(180,140,60,0.22), 0 1px 3px rgba(0,0,0,0.1)",
          zIndex: 10,
          touchAction: "none",
          overflow: "hidden",
        }}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: "grabbing" }}
        animate={completed ? { rotate: [0, -15, 15, 0] } : {}}
        transition={completed ? { duration: 0.4 } : {}}
      >
        {completed ? (
          <img
            src={afterSlideSvg}
            alt="celebration"
            style={{ width: 28, height: 28, objectFit: "contain", pointerEvents: "none" }}
          />
        ) : (
          <img
            src={weddingCake}
            alt="wedding cake"
            style={{ width: 26, height: 26, objectFit: "contain", pointerEvents: "none" }}
          />
        )}
      </motion.div>
    </div>
  );
}
