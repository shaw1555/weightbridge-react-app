import React, { useState } from "react";
import DateInput from "./DateInput";
import Button from "./Button";

interface DateRangeFilterProps {
  label: string;
  startKey: string;
  endKey: string;
  filters: Record<string, any>;
  onFilterApply: (startDate: string, endDate: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  label,
  startKey,
  endKey,
  filters,
  onFilterApply,
}) => {
  const [startDate, setStartDate] = useState(filters[startKey] || "");
  const [endDate, setEndDate] = useState(filters[endKey] || "");

  const handleSearch = () => {
    onFilterApply(startDate, endDate);
  };

  return (
    <div>
      <div className="bg-white rounded shadow p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="font-medium text-gray-700">{label}:</label>
          <div className="flex items-center gap-2">
            <DateInput value={startDate} onChange={setStartDate} />
            <span className="text-gray-500">to</span>
            <DateInput value={endDate} onChange={setEndDate} />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
