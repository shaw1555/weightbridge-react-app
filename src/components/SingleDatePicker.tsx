import React from "react";
import DateInput from "./DateInput";

interface SingleDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SingleDatePicker: React.FC<SingleDatePickerProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-1">{label}</label>
      <DateInput value={value} onChange={onChange} />
    </div>
  );
};

export default SingleDatePicker;
