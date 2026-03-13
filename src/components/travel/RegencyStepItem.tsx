import React from "react";

interface RegencyStepItemProps {
  stepNumber: number;
  title: string;
  description: string;
  accent: "rose" | "sage" | "gold";
  children?: React.ReactNode;
  isLast?: boolean;
}

export default function RegencyStepItem({
  stepNumber,
  title,
  description,
  accent,
  children,
}: RegencyStepItemProps) {
  const colorMap = {
    gold: "#c9a961",
    rose: "#a67c7c",
    sage: "#8a9b7f",
  };

  const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five"];

  const accentColor = colorMap[accent];

  return (
    <div
      className="relative pl-6 pb-4"
      style={{
        borderLeft: `1.5px solid ${accentColor}30`,
      }}
    >
      {/* Decorative circle marker */}
      <div
        className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-1.5"
        style={{
          borderColor: accentColor,
          backgroundColor: "#faf5f0",
        }}
      />

      {/* Step label */}
      <span
        className="font-['Cinzel'] text-[9px] tracking-widest uppercase font-bold"
        style={{ color: accentColor }}
      >
        Step {numberWords[stepNumber]}
      </span>

      {/* Step title */}
      <h5
        className="font-['Pinyon_Script'] text-3xl mb-2"
        style={{ color: "#1a2849" }}
      >
        {title}
      </h5>

      {/* Step description */}
      <p
        className="font-['Cormorant_Garamond'] text-base italic leading-snug mb-4"
        style={{ color: "#1a2849" }}
      >
        {description}
      </p>

      {/* Children (buttons, etc.) */}
      {children}
    </div>
  );
}
