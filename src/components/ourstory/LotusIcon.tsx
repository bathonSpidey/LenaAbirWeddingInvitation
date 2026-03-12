export const LotusIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    {/*
      Lotus: layered upward-cupping petals emerging from water.
      Structure: 2 outer back petals (wide, low), 3 mid petals, 1 tall centre petal.
      All petals taper to a pointed tip and share a common base at the waterline.
    */}

    {/* Water line */}
    <line
      x1="4"
      y1="18.5"
      x2="20"
      y2="18.5"
      stroke="currentColor"
      strokeWidth="0.75"
      opacity="0.3"
      strokeLinecap="round"
    />

    {/* Outer back petals — wide, low, heavily transparent */}
    <path
      d="M5.5 18.5 C5 14 7 10 12 9 C17 10 19 14 18.5 18.5Z"
      fill="currentColor"
      opacity="0.2"
    />

    {/* Mid-left petal */}
    <path
      d="M7 18.5 C6.5 14.5 8 10.5 12 9.5 C11 13 9.5 16 7 18.5Z"
      fill="currentColor"
      opacity="0.45"
    />

    {/* Mid-right petal */}
    <path
      d="M17 18.5 C19.5 16 18 13 12 9.5 C16 10.5 17.5 14.5 17 18.5Z"
      fill="currentColor"
      opacity="0.45"
    />

    {/* Inner left petal */}
    <path
      d="M9 18.5 C8.5 14 10 9.5 12 7.5 C11.2 11 10.2 15 9 18.5Z"
      fill="currentColor"
      opacity="0.75"
    />

    {/* Inner right petal */}
    <path
      d="M15 18.5 C13.8 15 12.8 11 12 7.5 C14 9.5 15.5 14 15 18.5Z"
      fill="currentColor"
      opacity="0.75"
    />

    {/* Centre petal — tallest, fully opaque */}
    <path
      d="M12 18.5 C10.5 14.5 10.5 10 12 6 C13.5 10 13.5 14.5 12 18.5Z"
      fill="currentColor"
      opacity="1"
    />

    {/* Stamen dot */}
    <circle cx="12" cy="13.5" r="1.1" fill="white" opacity="0.6" />
  </svg>
);
