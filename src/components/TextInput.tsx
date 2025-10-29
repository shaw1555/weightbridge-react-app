import React from "react";

interface TextInputProps {
  label?: string;
  value?: string | number | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  readOnly?: boolean;
  className?: string; // 👈 allow parent to pass custom class
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value = null,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
  className = "", // default empty
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value ?? ""} // use empty string when null
        onChange={(e) =>
          !readOnly && onChange?.(e.target.value === "" ? null : e.target.value)
        } // convert empty string to null
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full mt-1 rounded-lg border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none
          ${readOnly ? "bg-gray-100 cursor-not-allowed" : "focus:border-blue-500 focus:ring focus:ring-blue-200"}
          ${type === "number" ? "text-right" : "text-left"}
          ${className}`} // append parent class
      />
    </div>
  );
};

export default TextInput;
