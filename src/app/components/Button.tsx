// components/Button.tsx

import React, { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  variant = "secondary",
  children,
}: ButtonProps) => {
  const getVariantClass = (): string => {
    switch (variant) {
      case "secondary":
        return "bg-gray-300 px-8 py-1";
      case "danger":
        return "bg-red-500 text-white";
      default:
        return "border border-1.5 border-primary  text-primary hover:bg-primary hover:text-white";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 px-3 rounded ${getVariantClass()} hover:border-transparent focus:outline-none focus:shadow-outline`}
    >
      {children}
    </button>
  );
};

export default Button;
