import React, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface FreeTextDropdownProps<T> {
  label: string;
  options: T[];
  value?: string;
  onChange: (value: string) => void;
  displayKey: keyof T;
  valueKey: keyof T;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  uppercase?: boolean; // 🆕 new prop
}

export default function FreeTextDropdown<T extends Record<string, any>>({
  label,
  options,
  value,
  onChange,
  displayKey,
  valueKey,
  placeholder = "Select...",
  required = false,
  errorMessage = "This field is required",
  uppercase = false, // 🆕 default false
}: FreeTextDropdownProps<T>) {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const filteredOptions =
    inputValue === ""
      ? options
      : options.filter((opt) =>
          String(opt[displayKey])
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        );

  const showError = required && touched && !inputValue.trim();

  const handleInputChange = (val: string) => {
    const newVal = uppercase ? val.toUpperCase() : val; // 🧠 convert instantly
    setInputValue(newVal);
    onChange(newVal);
    setTouched(true);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Combobox
        value={inputValue}
        onChange={(val: string | null) => {
          const newVal = val ?? "";
          handleInputChange(newVal);
        }}
      >
        <div className="relative mt-1">
          <Combobox.Input
            className={`w-full mt-1 rounded-lg border ${
              showError ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 text-sm bg-yellow-50 ${
              uppercase ? "uppercase" : "" // 🆕 visual style too
            }`}
            displayValue={() => inputValue}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)} // live update
            onBlur={() => setTouched(true)}
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </Combobox.Button>

          {filteredOptions.length > 0 && (
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white shadow-lg border border-gray-200 z-10">
              {filteredOptions.map((opt) => (
                <Combobox.Option
                  key={String(opt[valueKey])}
                  value={String(opt[displayKey])}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {String(opt[displayKey])}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>

      {showError && (
        <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
