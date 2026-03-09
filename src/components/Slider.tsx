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
        height: KNOB_SIZE + PADDING * 2, // Extra height for the text and curve
        // The "Parchment" track
        background: "#FDFBF7",
        border: "1px solid #D4AF37", // Classic Gold
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
        width: "100%",
        maxWidth: 320,
      }}
    >
      {/* The "Gold Ribbon" fill that follows the slider */}
      <svg
        key={trackWidth} // Forces re-render when track width is found
        className="absolute pointer-events-none"
        style={{
          left: PADDING + KNOB_SIZE / 2,
          // We stop exactly at the center of the target hand
          width: maxDrag,
          height: 40,
          top: "50%",
          translate: "translateY(-50%)",
          overflow: "visible",
          zIndex: 1,
        }}
      >
        <motion.path
          // This "d" creates a curve that scales perfectly to your maxDrag distance
          d={`M 0 20 Q ${maxDrag / 4} 5, ${maxDrag / 2} 10 T ${maxDrag} 10`}
          fill="transparent"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            pathLength: useTransform(x, [0, maxDrag], [0, 1]),
          }}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.1)" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>

      {/* 2. The Sparkle following the exact curve */}
      <motion.div
        style={{
          x,
          // This Y-transform must match the "S-curve" of the path above
          y: useTransform(
            x,
            [0, maxDrag * 0.25, maxDrag * 0.5, maxDrag * 0.75, maxDrag],
            [0, -4, 0, 4, 0],
          ),
          left: PADDING + KNOB_SIZE / 2,
          top: "50%",
          translate: "translateY(-50%)",
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#FFF5D1",
          boxShadow: "0 0 12px #F2D479",
          zIndex: 3,
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
          y: useTransform(
            x,
            [0, maxDrag * 0.25, maxDrag * 0.5, maxDrag * 0.75, maxDrag],
            [0, -12, 0, 12, 0],
          ),
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
