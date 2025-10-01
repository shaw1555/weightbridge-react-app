import React from "react";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-200 ${
          disabled ? "cursor-not-allowed bg-gray-100" : ""
        }`}
      />
      {label && (
        <label
          className={`ml-2 text-sm font-medium text-gray-700 ${
            disabled ? "text-gray-400" : ""
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
