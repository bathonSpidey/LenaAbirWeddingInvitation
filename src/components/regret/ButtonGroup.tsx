import React from "react";

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-6 justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
