import React from "react";

interface ButtonProps {
  children: React.ReactNode;       // Button text or element
  onClick?: () => void;            // Click handler
  color?: "blue" | "red" | "green" | "gray"; // Button color variants
  size?: "sm" | "md" | "lg";      // Button size
  type?: "button" | "submit" | "reset"; // HTML button type
  disabled?: boolean;              // Disabled state
  className?: string;              // Extra custom class
}

const colorClasses: Record<string, string> = {
  blue: "bg-blue-600 text-white hover:bg-blue-700",
  red: "bg-red-600 text-white hover:bg-red-700",
  green: "bg-green-600 text-white hover:bg-green-700",
  gray: "bg-gray-300 text-gray-700 hover:bg-gray-400",
};

const sizeClasses: Record<string, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = "blue",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1
        ${colorClasses[color]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
