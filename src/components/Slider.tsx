// Suggested Asset Names:
// knob: wax-seal.svg (A high-quality gold/burgundy seal)
// target: seal-outline.svg (A faint gold dashed or solid stroke circle)
// completed: seal-stamped.svg (The seal with a little gold 'gline' or ribbon)

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState } from "react";
import Dove from "../assets/dove.png"; // A subtle dove icon for the completed state (optional)
import Land from "../assets/handLand.png"; // A subtle land icon for the active state (optional)
import Thanks from "../assets/Thanks.png"; // A "Thank You" image to show after completion (optional)

const KNOB_SIZE = 48; // Slightly larger for detail
const PADDING = 4;

export default function RoyalRSVPSlider({ onRSVP }: { onRSVP: () => void }) {
  const [completed, setCompleted] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);

  // Adjusted for slightly larger knob
  const maxDrag = Math.max(0, trackWidth - KNOB_SIZE - PADDING * 2);
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
      ref={(el) => (el && setTrackWidth(el.offsetWidth)) || undefined}
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
      <div
        style={{
          left: PADDING + KNOB_SIZE / 2,
          right: PADDING + KNOB_SIZE / 2,
          height: 1,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(139, 115, 85, 0.1)", // Very faint "pressed" line
          position: "absolute",
        }}
      />

      {/* 2. The Golden Flight Trail (This follows the Dove) */}
      <motion.div
        style={{
          width: x,
          left: PADDING + KNOB_SIZE / 2,
          height: 2,
          top: "50%",
          translateY: "-50%",
          position: "absolute",
          // This gradient makes the "new" part of the line near the bird bright gold
          // and the "old" part near the start fade into a soft silk thread
          background:
            "linear-gradient(90deg, rgba(212,175,55,0.2) 0%, #D4AF37 100%)",
          boxShadow: "0px 0px 6px rgba(242, 212, 121, 0.4)",
          zIndex: 2,
        }}
      />

      {/* 3. The "Lead" Sparkle (The tiny glint right behind the Dove) */}
      <motion.div
        style={{
          x,
          left: PADDING + KNOB_SIZE / 2,
          top: "50%",
          translateY: "-50%",
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FFF5D1 0%, #D4AF37 100%)",
          boxShadow: "0 0 12px #F2D479",
          zIndex: 3,
        }}
        // Makes the sparkle "flicker" slightly as you drag
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
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
        className="absolute inset-0 flex items-center justify-center pl-1"
      >
        {completed ? "Your presence is requested" : "Seal your RSVP"}
      </motion.p>

      {/* Target: The faint gold embossment */}
      <div
        className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          opacity: completed ? 0 : 0.8, // Raised opacity slightly so the hand is clearer
          transition: "opacity 0.5s ease",
          pointerEvents: "none",

          // THE FIX: Create a glowing gold halo background for the hand
          background:
            "radial-gradient(circle, #F9F1D8 0%, rgba(249, 241, 216, 0) 70%)",
          borderRadius: "50%", // Keep the glow circular
          // A soft, internal shadow adds depth, making it look like a watermark
          boxShadow: "inset 0 0 10px rgba(212, 175, 55, 0.1)",
        }}
      >
        <img
          src={Land}
          alt="Waiting Hand"
          draggable="false"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            userSelect: "none",
            // Optional: Give the hand icon itself a final, tiny drop shadow to pop it
            filter: "drop-shadow(0px 1px 1px rgba(139, 115, 85, 0.2))",
          }}
        />
      </div>

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // We remove the red wax background here so the dove sits
          // directly on the track for a cleaner look
        }}
        // Adds a gentle "breathing" animation to the bird while waiting
        animate={!completed ? { y: [0, -2, 0] } : { scale: [1, 1.2, 1] }}
        transition={
          !completed
            ? { repeat: Infinity, duration: 3, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      >
        {completed ? (
          /* The Elegant Gold Checkmark (Success) */
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{
              // INCREASED SCALE: 1.4 makes it 40% larger than the original knob
              scale: 1.4,
              rotate: 0,
              filter: [
                "drop-shadow(0px 0px 0px rgba(212,175,55,0))",
                "drop-shadow(0px 4px 10px rgba(212,175,55,0.3))",
              ],
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1, // Small delay for a more "ceremonial" feel
            }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50, // Ensure it pops above everything else
            }}
          >
            <img
              src={Thanks} // or MonogramIconPNG
              alt="Success Icon"
              style={{
                width: "120%", // Allow the image to bleed slightly outside the knob bounds
                height: "120%",
                objectFit: "contain",
              }}
            />
          </motion.div>
        ) : (
          /* The Messenger Dove (Active Slider) */
          <img
            src={Dove}
            alt="Dove"
            draggable="false" // Stops the browser from "picking up" the image
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
              pointerEvents: "none", // Ensures the drag click goes to the motion.div
              userSelect: "none",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
