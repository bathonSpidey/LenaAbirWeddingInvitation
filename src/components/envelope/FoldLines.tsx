import { EW, EH } from "./constants";

/**
 * Decorative SVG fold lines overlaid on the envelope front pocket.
 * Renders the bottom triangle and diagonal crease lines that give the
 * envelope its classic folded-corner look.
 */
export default function FoldLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${EW} ${EH}`}
      preserveAspectRatio="none"
    >
      {/* Bottom triangle — taller to hide the letter beneath */}
      <polygon
        points={`0,${EH} ${EW / 2},${EH * 0.35} ${EW},${EH}`}
        fill="rgba(80,45,0,0.12)"
      />

      {/* Side triangles */}
      <polygon
        points={`0,0 0,${EH} ${EW / 2},${EH * 0.35}`}
        fill="rgba(255,220,120,0.05)"
      />
      <polygon
        points={`${EW},0 ${EW},${EH} ${EW / 2},${EH * 0.35}`}
        fill="rgba(0,0,0,0.05)"
      />

      {/* Crease lines — match the 0.35 meeting point */}
      <line
        x1="0"
        y1={EH}
        x2={EW / 2}
        y2={EH * 0.35}
        stroke="rgba(70,35,0,0.15)"
        strokeWidth="0.8"
      />
      <line
        x1={EW}
        y1={EH}
        x2={EW / 2}
        y2={EH * 0.35}
        stroke="rgba(70,35,0,0.15)"
        strokeWidth="0.8"
      />
    </svg>
  );
}
