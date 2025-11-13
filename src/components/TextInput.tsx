import React, { useState, useRef } from "react";

interface TextInputProps {
  label?: string;
  value?: string | number | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  uppercase?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value = null,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
  required = false,
  className = "",
  uppercase = false,
}) => {
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => setTouched(true);

  const isInvalid = required && touched && (value === null || value === "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;

    let val = e.target.value;

    // Convert to uppercase while typing
    if (uppercase && type === "text") {
      val = val.toUpperCase();
    }

    onChange?.(val === "" ? null : val);
  };

  // ✅ Select text if current value is zero (supports both click and tab focus)
  const handleFocus = () => {
    if (inputRef.current) {
      const val = inputRef.current.value?.trim();
      const numericVal = Number(val);

      // Check if value is effectively 0
      if (val === "0" || val === "0.0" || val === "0.00" || numericVal === 0) {
        // Delay selection slightly to work after focus event (for both tab/click)
        setTimeout(() => {
          inputRef.current?.select();
        }, 0);
      }
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        ref={inputRef}
        type={type}
        value={value ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        className={`w-full mt-1 rounded-lg border ${
          isInvalid ? "border-red-500" : "border-gray-300"
        } shadow-sm px-3 py-2 text-sm focus:outline-none
          ${
            readOnly
              ? "bg-gray-100 cursor-not-allowed"
              : "focus:border-blue-500 focus:ring focus:ring-blue-200"
          }
          ${type === "number" ? "text-right" : "text-left"}
          ${uppercase ? "uppercase" : ""}
          ${className}`}
      />

      {isInvalid && (
        <p className="text-xs text-red-500 mt-1">This field is required.</p>
      )}
    </div>
  );
};

export default TextInput;
