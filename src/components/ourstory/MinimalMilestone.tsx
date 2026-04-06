import { motion } from "framer-motion";
import type { MilestoneDisplayProps } from "./MilestoneDisplay";

/**
 * MinimalMilestone
 *
 * Text-first, no frame. The year runs vertically as a large numeral on the
 * left margin, anchoring each entry. The title and description sit alongside
 * it in an open editorial layout — no card, no border, just careful spacing
 * and a hairline rule.
 *
 * Animation: fades up cleanly, no rotation or drift. Matches a refined,
 * content-forward aesthetic.
 */
export const MinimalMilestone = ({
  year,
  location,
  flag,
  title,
  desc,
  image,
}: MilestoneDisplayProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, amount: 0.3 }}
    className="relative mx-auto"
    style={{ width: "min(360px, 90vw)" }}
  >
    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
      {/* ── Large year numeral — vertical anchor ── */}
      <div style={{ flexShrink: 0, paddingTop: "4px" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "52px",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(185,140,140,0.18)",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          {year}
        </p>
      </div>

      {/* ── Content column ── */}
      <div style={{ flex: 1, paddingTop: "6px" }}>
        {/* Location + flag */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "8px",
            letterSpacing: "0.3em",
            color: "#C9A84C",
            margin: "0 0 8px",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ fontSize: "13px" }}>{flag}</span>
          {location}
        </p>

        {/* Title */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "26px",
            fontStyle: "italic",
            fontWeight: 500,
            color: "#3E2A1E",
            margin: "0 0 10px",
            lineHeight: 1.15,
          }}
        >
          {title}
        </p>

        {/* Hairline rule */}
        <div
          style={{
            height: "0.5px",
            background:
              "linear-gradient(to right, rgba(185,140,140,0.4), transparent)",
            marginBottom: "10px",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "15px",
            fontStyle: "italic",
            color: "#7A5848",
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          {desc}
        </p>

        {/* Optional image — shown as a small strip below text */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.92 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              marginTop: "14px",
              height: "90px",
              overflow: "hidden",
              borderRadius: "2px",
              transformOrigin: "left center",
            }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "saturate(0.75) brightness(0.96)",
              }}
            />
          </motion.div>
        )}
      </div>
    </div>

    {/* Bottom rule separating entries */}
    <div
      style={{
        height: "0.5px",
        background:
          "linear-gradient(to right, transparent, rgba(185,140,140,0.2), transparent)",
        marginTop: "20px",
      }}
    />
  </motion.div>
);
