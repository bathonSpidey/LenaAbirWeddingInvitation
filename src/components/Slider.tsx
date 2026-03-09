// Suggested Asset Names: 
// knob: wax-seal.svg (A high-quality gold/burgundy seal)
// target: seal-outline.svg (A faint gold dashed or solid stroke circle)
// completed: seal-stamped.svg (The seal with a little gold 'gline' or ribbon)

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState } from "react";

const KNOB_SIZE = 48; // Slightly larger for detail
const PADDING = 4;

export default function RoyalRSVPSlider({ onRSVP }) {
  const [completed, setCompleted] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);
  
  // Adjusted for slightly larger knob
  const maxDrag = Math.max(0, trackWidth - KNOB_SIZE - PADDING * 2);
  const fillOpacity = useTransform(x, [0, maxDrag], [0, 1]);
  const textOpacity = useTransform(x, [0, maxDrag * 0.3], [1, 0]);

  const handleDragEnd = () => {
    if (x.get() >= maxDrag * 0.85) {
      animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 25 });
      setCompleted(true);
      setTimeout(onRSVP, 800);
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  return (
    <div
      ref={(el) => el && setTrackWidth(el.offsetWidth)}
      className="relative rounded-full select-none"
      style={{
        height: KNOB_SIZE + PADDING * 2,
        // The "Parchment" track
        background: "#FDFBF7", 
        border: "1px solid #D4AF37", // Classic Gold
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
        width: "100%",
        maxWidth: 320,
      }}
    >
      {/* The "Gold Ribbon" fill that follows the slider */}
      <motion.div
        style={{
          width: x,
          left: PADDING + KNOB_SIZE / 2,
          height: 2,
          top: "50%",
          translateY: "-50%",
          background: "linear-gradient(90deg, #D4AF37, #F2D479)",
          position: "absolute",
        }}
      />

      <motion.p
        style={{
          opacity: textOpacity,
          fontFamily: "'Cinzel', serif", // Ensure this is loaded in your project
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: "#8B7355",
          textTransform: "uppercase",
        }}
        className="absolute inset-0 flex items-center justify-center pl-8"
      >
        {completed ? "Your presence is requested" : "Seal your RSVP"}
      </motion.p>

      {/* Target: The faint gold embossment */}
      <div
        className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ 
          width: KNOB_SIZE, 
          height: KNOB_SIZE,
          border: "1.5px dashed #D4AF37",
          borderRadius: "50%",
          opacity: completed ? 0 : 0.4
        }}
      />

      {/* Knob: The Wax Seal */}
      <motion.div
        drag={!completed && "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        onDragEnd={handleDragEnd}
        style={{
          x,
          left: PADDING,
          top: PADDING,
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          position: "absolute",
          zIndex: 10,
          cursor: completed ? "default" : "grab",
        }}
      >
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #a52a2a, #800000)", // Wax Red
          border: "2px solid #D4AF37",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          color: "#D4AF37",
          fontWeight: "bold",
          fontFamily: "'Playfair Display', serif"
        }}>
          {completed ? "✓" : "R"} 
        </div>
      </motion.div>
    </div>
  );
}