import { motion } from "framer-motion";
import type { MilestoneDisplayProps } from "./MilestoneDisplay";

// Even indexes slide from left, odd from right — classic postcard through a letterbox
const SLIDE_DIRS = [-1, 1, -1, 1];

/**
 * PostcardMilestone
 *
 * A mailed travel postcard: landscape photo on top, then a divided body —
 * handwritten message on the left, stamp + postmark + address lines on the right.
 * Perforated stamp edge is simulated with a radial-gradient mask.
 *
 * Animation: slides in from alternating left/right with a slight rotation,
 * settles flat. Hover lifts with a subtle tilt toward the viewer.
 */
export const PostcardMilestone = ({
  year,
  location,
  flag,
  title,
  desc,
  image,
  index,
}: MilestoneDisplayProps) => {
  const dir = SLIDE_DIRS[index % SLIDE_DIRS.length];
  // Slight persistent lean — each card rests at a small angle
  const restTilt = dir * 1.2;

  return (
    <motion.div
      initial={{ opacity: 0, x: dir * 120, rotate: dir * 6 }}
      whileInView={{ opacity: 1, x: 0, rotate: restTilt }}
      whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.35, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative mx-auto"
      style={{
        width: "min(340px, 90vw)",
        transformOrigin: "center center",
        filter: "drop-shadow(2px 6px 18px rgba(60,35,20,0.22))",
        cursor: "default",
      }}
    >
      {/* ── Card body ── */}
      <div
        style={{
          background: "#FEFCF6",
          borderRadius: "3px",
          overflow: "hidden",
          boxShadow: "inset 0 0 0 0.5px rgba(175,150,110,0.25)",
        }}
      >
        {/* ── Landscape photo ── */}
        <div
          style={{
            width: "100%",
            height: "160px",
            background: "linear-gradient(160deg, #cfc4b2 0%, #b8a898 100%)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "contrast(1.04) brightness(0.95) saturate(0.85)",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  transform: "rotate(45deg)",
                  border: "1px solid rgba(185,140,140,0.4)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "8px",
                  letterSpacing: "0.35em",
                  color: "rgba(185,140,140,0.5)",
                  textTransform: "uppercase",
                }}
              >
                Coming Soon
              </span>
            </div>
          )}

          {/* Location ribbon over photo bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "18px 12px 7px",
              background:
                "linear-gradient(to top, rgba(30,15,5,0.55), transparent)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "14px", lineHeight: 1 }}>{flag}</span>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "8px",
                letterSpacing: "0.28em",
                color: "rgba(255,245,220,0.9)",
                textTransform: "uppercase",
              }}
            >
              {location}
            </span>
          </div>
        </div>

        {/* ── Dashed divider between photo and body ── */}
        <div
          style={{
            height: "1px",
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(185,140,140,0.3) 0, rgba(185,140,140,0.3) 6px, transparent 6px, transparent 12px)",
          }}
        />

        {/* ── Card body: message left / stamp right ── */}
        <div style={{ display: "flex", minHeight: "130px" }}>
          {/* Left: handwritten message */}
          <div
            style={{
              flex: 1,
              padding: "14px 12px 14px 16px",
              borderRight: "0.5px dashed rgba(185,140,140,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "19px",
                fontStyle: "italic",
                fontWeight: 500,
                color: "#3E2A1E",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {title}
            </p>

            <div
              style={{
                height: "0.5px",
                background:
                  "linear-gradient(to right, rgba(185,140,140,0.4), transparent)",
              }}
            />

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px",
                fontStyle: "italic",
                color: "#7A5848",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {desc}
            </p>
          </div>

          {/* Right: stamp + postmark + address lines */}
          <div
            style={{
              width: "96px",
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            {/* Perforated stamp */}
            <div
              style={{
                width: "52px",
                height: "60px",
                border: "1.5px solid rgba(185,140,140,0.45)",
                borderRadius: "2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                position: "relative",
                background: "rgba(252,248,238,0.7)",
                // Perforated edge via box-shadow dots
                boxShadow:
                  "0 -4px 0 -2px #FEFCF6, 0 4px 0 -2px #FEFCF6, -4px 0 0 -2px #FEFCF6, 4px 0 0 -2px #FEFCF6",
              }}
            >
              <span style={{ fontSize: "20px", lineHeight: 1 }}>{flag}</span>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "5.5px",
                  letterSpacing: "0.12em",
                  color: "#A67C7C",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                {year}
              </span>
            </div>

            {/* Postmark circle */}
            <div
              style={{
                width: "56px",
                height: "40px",
                border: "1px solid rgba(185,140,140,0.35)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.65,
                position: "relative",
              }}
            >
              {/* Horizontal cancel lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: "6px 0",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: "0.5px",
                      background: "rgba(185,140,140,0.4)",
                      margin: "0 -8px",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "5.5px",
                  letterSpacing: "0.06em",
                  color: "#A67C7C",
                  textAlign: "center",
                  lineHeight: 1.6,
                  position: "relative",
                  zIndex: 1,
                  background: "rgba(254,252,246,0.7)",
                  padding: "1px 3px",
                }}
              >
                {location.toUpperCase().slice(0, 10)}
                <br />
                {year}
              </span>
            </div>

            {/* Address lines */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
                paddingTop: "2px",
              }}
            >
              {[72, 60, 68].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: "0.5px",
                    width: `${w}%`,
                    background: "rgba(185,140,140,0.25)",
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
