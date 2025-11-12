import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SearchableDropdownProps<T extends Record<string, any>> {
  label?: string;
  options: T[];
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  displayKey: keyof T;
  valueKey: keyof T;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean; // 👈 new prop
}

function SearchableDropdown<T extends Record<string, any>>({
  label,
  options,
  value,
  onChange,
  displayKey,
  valueKey,
  placeholder = "Select...",
  required = false,
  errorMessage = "This field is required",
  disabled = false, // 👈 default false
}: SearchableDropdownProps<T>) {
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          String(option[displayKey])
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  const selectedOption = options.find((o) => o[valueKey] === value) || null;
  const showError = required && touched && !value;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Combobox
        value={selectedOption}
        onChange={(option: T | null) => {
          if (disabled) return; // prevent interaction
          onChange(option ? option[valueKey] : null);
          setTouched(true);
        }}
        disabled={disabled} // 👈 disable Combobox
      >
        <div className="relative mt-1">
          <Combobox.Input
            className={`w-full mt-1 rounded-lg border ${
              showError ? "border-red-500" : "border-gray-300"
            } shadow-sm px-3 py-2 text-sm ${
              disabled
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "focus:border-blue-500 focus:ring focus:ring-blue-200"
            }`}
            displayValue={(val: T | null) =>
              val ? String(val[displayKey]) : ""
            }
            onChange={(event) => {
              if (!disabled) {
                setQuery(event.target.value);
                setTouched(true);
              }
            }}
            placeholder={placeholder}
            onBlur={() => setTouched(true)}
            disabled={disabled} // 👈 disable input
          />
          <Combobox.Button
            className={`absolute inset-y-0 right-0 flex items-center pr-2 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </Combobox.Button>

          {!disabled && (
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white shadow-lg border border-gray-200 z-10">
              {filteredOptions.length === 0 && (
                <div className="cursor-default select-none px-4 py-2 text-gray-500">
                  No results found
                </div>
              )}
              {filteredOptions.map((option) => (
                <Combobox.Option
                  key={String(option[valueKey])}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {String(option[displayKey])}
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

export default SearchableDropdown;
