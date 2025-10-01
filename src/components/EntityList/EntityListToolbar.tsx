import React from "react";

interface EntityListToolbarProps {
  title: string;
  onAdd: () => void;
  onExport: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  selectedCount: number;
}

const EntityListToolbar: React.FC<EntityListToolbarProps> = ({
  title,
  onAdd,
  onExport,
  onClearFilters,
  hasActiveFilters,
  selectedCount,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 gap-2">
      <div className="flex items-center gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onAdd}
        >
          Add
        </button>
        <span className="text-xl font-bold">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        {hasActiveFilters && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        )}

        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm flex items-center gap-1"
          onClick={onExport}
        >
          Export to Excel
          {selectedCount > 0 && (
            <span className="bg-white text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
              {selectedCount} selected
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default EntityListToolbar;
