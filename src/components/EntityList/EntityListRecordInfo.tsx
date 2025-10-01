import React from "react";

interface EntityListRecordInfoProps {
  start: number;
  end: number;
  total: number;
}

const EntityListRecordInfo: React.FC<EntityListRecordInfoProps> = ({
  start,
  end,
  total,
}) => {
  return (
    <span className="text-sm text-gray-600">
      {start}-{end} / {total}
    </span>
  );
};

export default EntityListRecordInfo;
