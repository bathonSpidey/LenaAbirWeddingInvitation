import { motion } from "framer-motion";
import type { MilestoneDisplayProps } from "./MilestoneDisplay";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  frameOuter: "#F5EDD8", // aged ivory — warm, not pure white
  frameInner: "#EFE5CC", // slightly darker at corners for vignette feel
  inkDark: "#2E1A0E", // deep sepia — like dried ink
  inkMid: "#5C3828", // warm brown for description
  gold: "#C9A84C", // consistent with rest of app
  roseFaint: "rgba(185,140,140,0.35)",
  photoVignette: "rgba(30,12,4,0.55)", // amber-dark edge for photo vignette
} as const;

// Noise SVG baked as data-URI — simulates aged paper grain
const PAPER_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23g)' opacity='0.045'/%3E%3C/svg%3E")`;

// Tilt + drift arrays — non-uniform so the pile feels hand-placed
const TILTS = [-3.2, 2.8, -1.6, 3.5, -2.4];
const DRIFTS = [-20, 16, -8, 22, -14];

// ─── Inline SVG ornaments ─────────────────────────────────────────────────────

/** Tiny botanical sprig — pen-and-ink style, sits above the title */
const SprigOrnament = () => (
  <svg
    viewBox="0 0 80 18"
    width="80"
    height="18"
    fill="none"
    aria-hidden
    style={{ display: "block", margin: "0 auto" }}
  >
    {/* Centre stem */}
    <line
      x1="40"
      y1="17"
      x2="40"
      y2="4"
      stroke={C.gold}
      strokeWidth="0.6"
      strokeLinecap="round"
    />
    {/* Left branch */}
    <path
      d="M40 12 Q33 9 28 10"
      stroke={C.gold}
      strokeWidth="0.55"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M40 8  Q34 5 30 6"
      stroke={C.gold}
      strokeWidth="0.55"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right branch */}
    <path
      d="M40 12 Q47 9 52 10"
      stroke={C.gold}
      strokeWidth="0.55"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M40 8  Q46 5 50 6"
      stroke={C.gold}
      strokeWidth="0.55"
      strokeLinecap="round"
      fill="none"
    />
    {/* Leaf dots */}
    {[28, 30, 52, 50].map((cx, i) => (
      <circle
        key={i}
        cx={cx}
        cy={i < 2 ? 10 : i === 2 ? 10 : 6}
        r="1.1"
        fill={C.gold}
        opacity="0.8"
      />
    ))}
    <circle cx="30" cy="6" r="1.1" fill={C.gold} opacity="0.8" />
    <circle cx="40" cy="4" r="1.3" fill={C.gold} opacity="0.9" />
    {/* Flanking dots on stem line */}
    <line x1="4" y1="9" x2="34" y2="9" stroke={C.roseFaint} strokeWidth="0.4" />
    <line
      x1="46"
      y1="9"
      x2="76"
      y2="9"
      stroke={C.roseFaint}
      strokeWidth="0.4"
    />
    <circle cx="4" cy="9" r="1" fill={C.roseFaint} />
    <circle cx="76" cy="9" r="1" fill={C.roseFaint} />
  </svg>
);

/** Corner filigree — rendered in all 4 corners of the frame */
const CornerFiligree = ({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) => {
  const scaleX = corner === "tr" || corner === "br" ? -1 : 1;
  const scaleY = corner === "bl" || corner === "br" ? -1 : 1;
  return (
    <svg
      viewBox="0 0 18 18"
      width="18"
      height="18"
      fill="none"
      aria-hidden
      style={{
        position: "absolute",
        top: corner.startsWith("t") ? "6px" : undefined,
        bottom: corner.startsWith("b") ? "6px" : undefined,
        left: corner.endsWith("l") ? "6px" : undefined,
        right: corner.endsWith("r") ? "6px" : undefined,
        transform: `scale(${scaleX}, ${scaleY})`,
        opacity: 0.55,
        pointerEvents: "none",
      }}
    >
      {/* Curved arm */}
      <path
        d="M2 16 Q2 2 16 2"
        stroke={C.gold}
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small leaf at tip */}
      <circle cx="16" cy="2" r="1.2" fill={C.gold} />
      <circle cx="2" cy="16" r="1.2" fill={C.gold} />
      {/* Mid curl */}
      <path
        d="M5 13 Q5 8 10 8 Q8 10 8 13"
        stroke={C.gold}
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
};

/** Wax seal dot — sits at the very top centre of the photo like a mounting pin */
const WaxSeal = ({ flag }: { flag: string }) => (
  <div
    style={{
      position: "absolute",
      top: "-11px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "26px",
      height: "26px",
      borderRadius: "50%",
      background: "radial-gradient(circle at 38% 36%, #D4A84B, #8B5E1A)",
      boxShadow:
        "0 2px 6px rgba(40,15,0,0.45), inset 0 1px 2px rgba(255,220,120,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 5,
      border: "0.5px solid rgba(180,130,40,0.6)",
      fontSize: "13px",
      lineHeight: 1,
    }}
  >
    {flag.slice(0, 2) /* first emoji only */}
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * PolaroidMilestone — Bridgerton era edition
 *
 * Aged ivory frame with paper grain texture, corner filigree, wax seal pin,
 * botanical sprig ornament above the title, and a photo with warm amber vignette.
 * Drops from above with spring-overshoot landing; tilted at rest; lifts on hover.
 */
export const PolaroidMilestone = ({
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
      initial={{
        opacity: 0,
        y: -110,
        x: drift * 1.6,
        rotate: tilt + (tilt > 0 ? 7 : -7),
      }}
      whileInView={{ opacity: 1, y: 0, x: drift, rotate: tilt }}
      whileHover={{ scale: 1.04, rotate: 0, x: 0, zIndex: 10 }}
      transition={{ duration: 0.7, ease: [0.34, 1.22, 0.64, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      style={{
        width: "min(272px, 80vw)",
        margin: "0 auto",
        position: "relative",
        transformOrigin: "center bottom",
        // Multi-layer shadow: soft ambient + sharp near
        filter:
          "drop-shadow(0 2px 2px rgba(40,15,0,0.18)) drop-shadow(0 10px 28px rgba(40,15,0,0.22))",
        cursor: "default",
      }}
    >
      {/* Wax seal "pin" — sits above the photo, centred */}
      <WaxSeal flag={flag} />

      {/* ── Polaroid outer frame ── */}
      <div
        style={{
          background: C.frameOuter,
          // Uneven border: top/sides thinner, bottom deep — true Polaroid proportion
          padding: "11px 11px 0 11px",
          borderRadius: "3px",
          position: "relative",
          overflow: "hidden",
          // Inner edge shadow creates the aged-corner vignette on the frame
          boxShadow: `inset 0 0 0 0.5px rgba(150,115,70,0.3),
             inset 0 0 30px rgba(100,65,25,0.07)`,
        }}
      >
        {/* Paper grain overlay on entire frame */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: PAPER_GRAIN,
            backgroundSize: "260px 260px",
            backgroundRepeat: "repeat",
            pointerEvents: "none",
            mixBlendMode: "multiply",
            zIndex: 2,
          }}
        />

        {/* Corner filigree — all four corners */}
        <CornerFiligree corner="tl" />
        <CornerFiligree corner="tr" />
        <CornerFiligree corner="bl" />
        <CornerFiligree corner="br" />

        {/* ── Photo area ── */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: "linear-gradient(150deg, #d6c9b4 0%, #bfad99 100%)",
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
                // Warm amber cast + slight desaturation = aged film look
                filter:
                  "sepia(0.28) contrast(1.04) brightness(0.95) saturate(0.82)",
              }}
            />
          ) : (
            // Future milestone placeholder
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                background: "linear-gradient(150deg, #ddd0bc 0%, #c8b99f 100%)",
              }}
            >
              {/* Ornamental diamond cluster */}
              <div
                style={{ position: "relative", width: "32px", height: "32px" }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "8px",
                    transform: "rotate(45deg)",
                    border: `1px solid ${C.gold}`,
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "2px",
                    transform: "rotate(45deg)",
                    border: `0.5px solid ${C.gold}`,
                    opacity: 0.3,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "8px",
                  letterSpacing: "0.4em",
                  color: `rgba(180,130,60,0.65)`,
                  textTransform: "uppercase",
                }}
              >
                Coming Soon
              </span>
            </div>
          )}

          {/* Amber vignette over photo — fades edges, adds era warmth */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 50% 50%,
                   transparent 42%,
                   rgba(60,28,8,0.38) 100%)`,
              pointerEvents: "none",
            }}
          />

          {/* Bottom fade — bleeds into the caption strip */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40px",
              background: `linear-gradient(to top, ${C.frameOuter}, transparent)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── Caption strip — inside the wide ivory bottom border ── */}
        <div
          style={{
            padding: "16px 14px 22px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "7px",
            position: "relative",
            zIndex: 3,
          }}
        >
          {/* Location · Year — gold Cinzel label */}
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "7px",
              letterSpacing: "0.32em",
              color: C.gold,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {location} · {year}
          </p>

          {/* Botanical sprig ornament above the title */}
          <SprigOrnament />

          {/* Title — large, dramatic, deep ink */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "26px",
              fontStyle: "italic",
              fontWeight: 500,
              color: C.inkDark,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </p>

          {/* Ornamental rule — double line with centre diamond */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: "100%",
              padding: "0 10px",
            }}
          >
            <div
              style={{ flex: 1, height: "0.5px", background: C.roseFaint }}
            />
            <div
              style={{
                width: "4px",
                height: "4px",
                transform: "rotate(45deg)",
                background: C.gold,
                opacity: 0.7,
                flexShrink: 0,
              }}
            />
            <div
              style={{ flex: 1, height: "0.5px", background: C.roseFaint }}
            />
          </div>

          {/* Description — warm ink, generous line-height */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13.5px",
              fontStyle: "italic",
              color: C.inkMid,
              margin: 0,
              lineHeight: 1.7,
              letterSpacing: "0.01em",
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
