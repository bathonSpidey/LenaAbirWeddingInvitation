import React from "react";

interface TextureSectionProps {
  ref?: React.RefObject<HTMLDivElement>;
  backgroundImage?: string;
  children: React.ReactNode;
}

const TextureSection = React.forwardRef<HTMLDivElement, TextureSectionProps>(
  ({ backgroundImage, children }, ref) => {
    return (
      <div
        ref={ref}
        className="min-h-screen w-full flex flex-col items-center justify-center px-6 snap-start relative"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
    );
  }
);

TextureSection.displayName = "TextureSection";

export default TextureSection;