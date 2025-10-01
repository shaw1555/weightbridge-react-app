import React from "react";

interface TextInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  readOnly?: boolean; // 👈 new
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value = "",
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => !readOnly && onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full mt-1 rounded-lg border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none
    ${
      readOnly
        ? "bg-gray-100 cursor-not-allowed"
        : "focus:border-blue-500 focus:ring focus:ring-blue-200"
    }
    ${type === "number" ? "text-right" : "text-left"}`}
      />
    </div>
  );
};

export default TextInput;
