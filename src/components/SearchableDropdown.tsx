import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
interface SearchableDropdownProps<T extends Record<string, any>> {
  label?: string; // make optional
  options: T[];
  value: string | number | null; // primitive value (id or string)
  onChange: (value: string | number | null) => void; // return primitive
  displayKey: keyof T;
  valueKey: keyof T;
  placeholder?: string;
}

function SearchableDropdown<T extends Record<string, any>>({
  label,
  options,
  value,
  onChange,
  displayKey,
  valueKey,
  placeholder = "Select...",
}: SearchableDropdownProps<T>) {
  const [query, setQuery] = useState("");

  // filter options based on search query
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          String(option[displayKey])
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  // map primitive value back to object for display
  const selectedOption = options.find((o) => o[valueKey] === value) || null;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <Combobox
        value={selectedOption}
        onChange={(option: T | null) =>
          onChange(option ? option[valueKey] : null)
        }
      >
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 text-sm"
            displayValue={(val: T | null) =>
              val ? String(val[displayKey]) : ""
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </Combobox.Button>
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
        </div>
      </Combobox>
    </div>
  );
}

export default SearchableDropdown;
