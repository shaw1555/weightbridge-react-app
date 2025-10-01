import React, { useState, useEffect } from "react";

interface DateInputProps {
  label?: string;
  value?: string; // ISO string: "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss"
  onChange?: (date: string) => void;
  includeTime?: boolean;
  resettable?: boolean;
}
const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  includeTime = false,
}) => {
  const defaultValue = includeTime
    ? new Date().toISOString().slice(0, 19)
    : new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState<string>(value || defaultValue);
  const [auto, setAuto] = useState<boolean>(false);

  useEffect(() => {
    if (value) setDate(value);
  }, [value]);

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
              onChange={(e) => setAuto(e.target.checked)}
            />
            Auto
          </label>
        )}
      </div>
    </div>
  );
};

export default DateInput;
