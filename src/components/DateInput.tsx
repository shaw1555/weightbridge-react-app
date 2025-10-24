import React, { useState, useEffect } from "react";

interface DateInputProps {
  label?: string;
  value?: string; // ISO string: "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss"
  onChange?: (date: string) => void;
  includeTime?: boolean;
  resettable?: boolean;
  auto?: boolean; // ✅ NEW: allow auto mode to be passed as a prop
  onAutoChange?: (isAuto: boolean) => void; // ✅ NEW: notify parent when auto toggled
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  includeTime = false,
  auto: autoProp = false, // default false
  onAutoChange,
}) => {
  const defaultValue = includeTime
    ? new Date().toISOString().slice(0, 19)
    : new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState<string>(value || defaultValue);
  const [auto, setAuto] = useState<boolean>(autoProp);

  // ✅ Keep local state in sync with prop
  useEffect(() => {
    setAuto(autoProp);
  }, [autoProp]);

  useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  // ✅ Auto update time every second if enabled
  useEffect(() => {
    if (!auto || !includeTime) return;

    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 19);
      setDate(now);
      onChange?.(now);
    }, 1000);

    return () => clearInterval(interval);
  }, [auto, includeTime, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    onChange?.(newDate);
  };

  const handleAutoToggle = (checked: boolean) => {
    setAuto(checked);
    onAutoChange?.(checked); // ✅ Notify parent if needed
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex items-center gap-2">
        <input
          type={includeTime ? "datetime-local" : "date"}
          step={includeTime ? 1 : undefined}
          value={date}
          onChange={handleChange}
          disabled={auto}
          className={`max-w-xs border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
            auto
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "focus:ring-blue-400"
          }`}
        />

        {includeTime && (
          <label className="flex items-center gap-1 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={auto}
              onChange={(e) => handleAutoToggle(e.target.checked)}
            />
            Auto
          </label>
        )}
      </div>
    </div>
  );
};

export default DateInput;
