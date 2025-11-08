import React, { useState } from "react";

interface TextInputProps {
  label?: string;
  value?: string | number | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  readOnly?: boolean;
  required?: boolean; // ✅ new prop
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value = null,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
  required = false, // ✅ default false
  className = "",
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => setTouched(true);

  const isInvalid = required && touched && (value === null || value === "");

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>} {/* ✅ show red asterisk */}
        </label>
      )}

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) =>
          !readOnly && onChange?.(e.target.value === "" ? null : e.target.value)
        }
        onBlur={handleBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required} // ✅ adds HTML5 required behavior
        className={`w-full mt-1 rounded-lg border ${
          isInvalid ? "border-red-500" : "border-gray-300"
        } shadow-sm px-3 py-2 text-sm focus:outline-none
          ${
            readOnly
              ? "bg-gray-100 cursor-not-allowed"
              : "focus:border-blue-500 focus:ring focus:ring-blue-200"
          }
          ${type === "number" ? "text-right" : "text-left"}
          ${className}`}
      />

      {/* ✅ Show validation message */}
      {isInvalid && (
        <p className="text-xs text-red-500 mt-1">This field is required.</p>
      )}
    </div>
  );
};

export default TextInput;
