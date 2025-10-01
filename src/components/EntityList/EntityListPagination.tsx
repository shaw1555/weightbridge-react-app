import React from "react";

interface EntityListPaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const EntityListPagination: React.FC<EntityListPaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onPageSizeChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          ⏮
        </button>
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ◀
        </button>
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ▶
        </button>
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          ⏭
        </button>
      </div>

      <select
        value={rowsPerPage}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border rounded p-1 text-sm"
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default EntityListPagination;
