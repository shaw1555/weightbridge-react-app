import React from "react";

interface TextareaInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean; // support read-only
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  value = "",
  onChange,
  placeholder,
  rows = 3,
  readOnly = false,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => !readOnly && onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full mt-1 rounded-lg border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none
          ${readOnly ? "bg-gray-100 cursor-not-allowed" : "focus:border-blue-500 focus:ring focus:ring-blue-200"}`}
      />
    </div>
  );
};

export default TextareaInput;
