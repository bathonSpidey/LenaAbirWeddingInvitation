import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MilestoneVariant = "polaroid" | "postcard" | "minimal";

export interface MilestoneDisplayProps {
  // Content
  year: string;
  location: string;
  flag: string;
  title: string;
  desc: string;
  image?: string;
  index: number;

  // Style
  variant?: MilestoneVariant;
}

// ─── Variant: Polaroid ────────────────────────────────────────────────────────

// Tilt angles per card index — feels naturally scattered, not mechanical
const TILTS = [-3, 2.5, -1.8, 3.2];
// X drift so cards don't all land perfectly centred
const DRIFTS = [-18, 14, -10, 20];

const PolaroidMilestone = ({
  year,
  location,
  flag,
  title,
  desc,
  image,
  index,
}: MilestoneDisplayProps) => {
  const tilt = TILTS[index % TILTS.length];
  const drift = DRIFTS[index % DRIFTS.length];

  return (
    <motion.div
      // Cards drop in from above + slight x drift, landing with their final tilt.
      // Feels like someone placing them one by one onto a table.
      initial={{
        opacity: 0,
        y: -100,
        x: drift * 1.5,
        rotate: tilt + (tilt > 0 ? 6 : -6),
      }}
      whileInView={{ opacity: 1, y: 0, x: drift, rotate: tilt }}
      whileHover={{ scale: 1.03, rotate: 0, x: 0, zIndex: 10 }}
      transition={{
        duration: 0.65,
        ease: [0.34, 1.26, 0.64, 1], // spring-like overshoot on landing
      }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative mx-auto"
      style={{
        width: "min(270px, 78vw)",
        transformOrigin: "center bottom",
        filter: "drop-shadow(2px 8px 20px rgba(60,35,20,0.25))",
        cursor: "default",
      }}
    >
      {/* ── Polaroid frame ── */}
      <div
        style={{
          background: "#FEFCF8",
          // Generous bottom border = classic Polaroid proportion.
          // All content (title + desc) lives inside this strip.
          padding: "9px 9px 0 9px",
          borderRadius: "2px",
          boxShadow:
            "inset 0 0 0 0.5px rgba(175,155,125,0.2), inset 0 2px 6px rgba(175,155,125,0.08)",
          overflow: "hidden",
        }}
      >
        {/* ── Photo area ── */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: "linear-gradient(145deg, #d9cfc2 0%, #c4b8a8 100%)",
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
                filter: "contrast(1.03) brightness(0.97) saturate(0.88)",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  transform: "rotate(45deg)",
                  border: "1px solid rgba(185,140,140,0.4)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  color: "rgba(185,140,140,0.55)",
                  textTransform: "uppercase",
                }}
              >
                Coming Soon
              </span>
            </div>
          )}

          {/* Flag — top-right of photo */}
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              fontSize: "17px",
              lineHeight: 1,
              filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.35))",
            }}
          >
            {flag}
          </span>
        </div>

        {/* ── Caption strip — lives inside the white Polaroid border ── */}
        <div
          style={{
            padding: "14px 10px 18px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {/* Location · Year — small elegant label at top of strip */}
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "7.5px",
              letterSpacing: "0.28em",
              color: "#C9A84C",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {flag} {location} · {year}
          </p>

          {/* Title — Cormorant italic, generous size */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              fontStyle: "italic",
              fontWeight: 500,
              color: "#3E2A1E",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {title}
          </p>

          {/* Thin ornamental rule */}
          <div
            style={{
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(185,140,140,0.35), transparent)",
              margin: "2px 16px",
            }}
          />

          {/* Description — smaller Cormorant, sits right inside the Polaroid border */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "14px",
              fontStyle: "italic",
              color: "#7A5848",
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Variant: Postcard (stub — ready to flesh out) ────────────────────────────

const PostcardMilestone = (props: MilestoneDisplayProps) => {
  // TODO: implement postcard layout
  return <PolaroidMilestone {...props} />;
};

// ─── Variant: Minimal (stub — ready to flesh out) ─────────────────────────────

const MinimalMilestone = (props: MilestoneDisplayProps) => {
  // TODO: implement minimal layout
  return <PolaroidMilestone {...props} />;
};

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * MilestoneDisplay
 *
 * A pluggable display component for story milestones.
 * Swap `variant` to change the entire visual treatment without touching StoryMilestone data.
 *
 * Variants:
 *   "polaroid"  — scattered Polaroid photos with handwritten caption (default)
 *   "postcard"  — stamp + postmark + address lines (stub)
 *   "minimal"   — text-first, no frame (stub)
 *
 * Usage:
 *   <MilestoneDisplay variant="polaroid" {...milestoneProps} />
 */
export const MilestoneDisplay = ({
  variant = "polaroid",
  ...props
}: MilestoneDisplayProps) => {
  switch (variant) {
    case "postcard":
      return <PostcardMilestone {...props} />;
    case "minimal":
      return <MinimalMilestone {...props} />;
    case "polaroid":
    default:
      return <PolaroidMilestone {...props} />;
  }
};
