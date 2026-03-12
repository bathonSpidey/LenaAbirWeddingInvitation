export const EdelweissIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    {/*
      Edelweiss: small woolly alpine flower.
      Structure: 5–7 white ray-petals around a tight cluster of yellow florets.
      Each petal is a rounded lobe — broader at the tip, narrow at the base.
    */}

    {/* Ray petals — broad rounded lobes radiating from centre */}
    {[0, 51.4, 102.8, 154.2, 205.6, 257.2, 308.6].map((deg) => (
      <ellipse
        key={deg}
        cx="12"
        cy="7.5"
        rx="2.4"
        ry="3.8"
        fill="currentColor"
        opacity="0.9"
        transform={`rotate(${deg} 12 12)`}
      />
    ))}

    {/* Woolly bracts — slightly smaller, offset between petals */}
    {[25.7, 77.1, 128.5, 180, 231.4, 282.8, 334.2].map((deg) => (
      <ellipse
        key={`b-${deg}`}
        cx="12"
        cy="8.2"
        rx="1.6"
        ry="3"
        fill="currentColor"
        opacity="0.55"
        transform={`rotate(${deg} 12 12)`}
      />
    ))}

    {/* Central floret cluster — warm gold tone using currentColor at full opacity */}
    <circle cx="12" cy="12" r="2.8" fill="currentColor" opacity="1" />
    {/* Inner texture dots to suggest clustered florets */}
    {[
      [-0.9, -0.9],
      [0.9, -0.9],
      [-0.9, 0.9],
      [0.9, 0.9],
      [0, 0],
    ].map(([dx, dy], i) => (
      <circle
        key={i}
        cx={12 + dx}
        cy={12 + dy}
        r="0.55"
        fill="white"
        opacity="0.55"
      />
    ))}
  </svg>
);
