import React from "react";

interface SectionQuoteProps {
  children: React.ReactNode;
  className?: string;
}

const SectionQuote: React.FC<SectionQuoteProps> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={`text-stone-600 leading-relaxed italic ${className}`}
      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22 }}
    >
      {children}
    </p>
  );
};

export default SectionQuote;
