import React from "react";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name: string;
  direction?: "horizontal" | "vertical"; // default horizontal
  layout?: "wrap" | "grid"; // ✅ new
  columns?: number; // only used for grid layout
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  name,
  direction = "horizontal",
  layout = "wrap",
  columns = 2,
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* ✅ Wrapper container */}
      <div
        className={
          layout === "grid"
            ? `grid gap-4 grid-cols-${columns}` // Grid mode
            : direction === "horizontal"
            ? "flex flex-row flex-wrap gap-6" // Wrap mode
            : "flex flex-col gap-3" // Vertical mode
        }
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center space-x-2 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange && onChange(e.target.value)}
              disabled={disabled}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
