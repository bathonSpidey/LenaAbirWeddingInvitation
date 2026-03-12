/**
 * AssameseLaceBorder
 *
 * Wraps any child in a decorative lace frame inspired by Assamese textile patterns.
 * Uses looped teardrop peaks + flanking diamond accents instead of a plain sawtooth.
 *
 * The SVG bleeds 12px outside the child on every side via negative inset.
 * The four sides are drawn as repeating path segments so they scale naturally.
 * Corner diamonds anchor the four ends cleanly.
 *
 * Usage:
 *   <AssameseLaceBorder>
 *     <button ...>Label</button>
 *   </AssameseLaceBorder>
 */
export const AssameseLaceBorder = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="relative inline-flex items-center justify-center group">
    {/* ── Top lace strip ───────────────────────────────────────────── */}
    <svg
      className="pointer-events-none absolute top-0 left-[8%] w-[84%] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
      style={{ height: "12px", transform: "translateY(-100%)" }}
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
    >
      {/* Baseline */}
      <line
        x1="0"
        y1="11"
        x2="100"
        y2="11"
        stroke="#D4AF6A"
        strokeWidth="0.5"
      />
      {/* Teardrop loops every ~12.5 units */}
      {[6.25, 18.75, 31.25, 43.75, 56.25, 68.75, 81.25, 93.75].map((cx, i) => (
        <g key={i}>
          <path
            d={`M${cx} 11 C${cx - 2} 7,${cx - 2} 3,${cx} 1 C${cx + 2} 3,${cx + 2} 7,${cx} 11Z`}
            stroke="#D4AF6A"
            strokeWidth="0.7"
            fill="none"
          />
          {/* Small diamond left */}
          <path
            d={`M${cx - 5} 6 l1.5 -1.5 l1.5 1.5 l-1.5 1.5Z`}
            stroke="#D4AF6A"
            strokeWidth="0.4"
            fill="#D4AF6A"
            fillOpacity="0.45"
          />
          {/* Small diamond right */}
          <path
            d={`M${cx + 2} 6 l1.5 -1.5 l1.5 1.5 l-1.5 1.5Z`}
            stroke="#D4AF6A"
            strokeWidth="0.4"
            fill="#D4AF6A"
            fillOpacity="0.45"
          />
        </g>
      ))}
    </svg>

    {/* ── Bottom lace strip (mirrored) ─────────────────────────────── */}
    <svg
      className="pointer-events-none absolute bottom-0 left-[8%] w-[84%] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
      style={{ height: "12px", transform: "translateY(100%) scaleY(-1)" }}
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="11"
        x2="100"
        y2="11"
        stroke="#D4AF6A"
        strokeWidth="0.5"
      />
      {[6.25, 18.75, 31.25, 43.75, 56.25, 68.75, 81.25, 93.75].map((cx, i) => (
        <g key={i}>
          <path
            d={`M${cx} 11 C${cx - 2} 7,${cx - 2} 3,${cx} 1 C${cx + 2} 3,${cx + 2} 7,${cx} 11Z`}
            stroke="#D4AF6A"
            strokeWidth="0.7"
            fill="none"
          />
          <path
            d={`M${cx - 5} 6 l1.5 -1.5 l1.5 1.5 l-1.5 1.5Z`}
            stroke="#D4AF6A"
            strokeWidth="0.4"
            fill="#D4AF6A"
            fillOpacity="0.45"
          />
          <path
            d={`M${cx + 2} 6 l1.5 -1.5 l1.5 1.5 l-1.5 1.5Z`}
            stroke="#D4AF6A"
            strokeWidth="0.4"
            fill="#D4AF6A"
            fillOpacity="0.45"
          />
        </g>
      ))}
    </svg>

    {/* ── Corner diamond anchors ───────────────────────────────────── */}
    {/* Top-left */}
    <svg
      className="pointer-events-none absolute opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      style={{ top: "-10px", left: "4%", width: "16px", height: "16px" }}
      viewBox="0 0 16 16"
    >
      <path
        d="M8 1 L13 8 L8 15 L3 8Z"
        stroke="#D4AF6A"
        strokeWidth="0.8"
        fill="#D4AF6A"
        fillOpacity="0.3"
      />
      <circle cx="8" cy="8" r="1.5" fill="#D4AF6A" fillOpacity="0.7" />
    </svg>

    {/* Top-right */}
    <svg
      className="pointer-events-none absolute opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      style={{ top: "-10px", right: "4%", width: "16px", height: "16px" }}
      viewBox="0 0 16 16"
    >
      <path
        d="M8 1 L13 8 L8 15 L3 8Z"
        stroke="#D4AF6A"
        strokeWidth="0.8"
        fill="#D4AF6A"
        fillOpacity="0.3"
      />
      <circle cx="8" cy="8" r="1.5" fill="#D4AF6A" fillOpacity="0.7" />
    </svg>

    {/* Bottom-left */}
    <svg
      className="pointer-events-none absolute opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      style={{ bottom: "-10px", left: "4%", width: "16px", height: "16px" }}
      viewBox="0 0 16 16"
    >
      <path
        d="M8 1 L13 8 L8 15 L3 8Z"
        stroke="#D4AF6A"
        strokeWidth="0.8"
        fill="#D4AF6A"
        fillOpacity="0.3"
      />
      <circle cx="8" cy="8" r="1.5" fill="#D4AF6A" fillOpacity="0.7" />
    </svg>

    {/* Bottom-right */}
    <svg
      className="pointer-events-none absolute opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      style={{ bottom: "-10px", right: "4%", width: "16px", height: "16px" }}
      viewBox="0 0 16 16"
    >
      <path
        d="M8 1 L13 8 L8 15 L3 8Z"
        stroke="#D4AF6A"
        strokeWidth="0.8"
        fill="#D4AF6A"
        fillOpacity="0.3"
      />
      <circle cx="8" cy="8" r="1.5" fill="#D4AF6A" fillOpacity="0.7" />
    </svg>

    {children}
  </div>
);
