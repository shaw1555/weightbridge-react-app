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
}

export default function FreeTextDropdown<T extends Record<string, any>>({
  label,
  options,
  value,
  onChange,
  displayKey,
  valueKey,
  placeholder = "Select...",
}: FreeTextDropdownProps<T>) {
  const [inputValue, setInputValue] = useState("");

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

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Combobox value={inputValue} onChange={(val: string | null) => {
        const newVal = val ?? "";
        setInputValue(newVal);
        onChange(newVal);
      }}>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 text-sm bg-yellow-50"
            displayValue={() => inputValue}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);
              onChange(val); // call onChange on every input
            }}
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
    </div>
  );
}
