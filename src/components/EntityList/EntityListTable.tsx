import React from "react";
import { Filter } from "lucide-react";
import type { Column } from "./types";

interface EntityListTableProps<T> {
  data: T[];
  columns: Column<T>[];
  filters: Record<string, any>;
  onFilterChange: (key: keyof T, value: any) => void;
  onRowClick: (id: string | number) => void;
  selectedRows: Record<string, boolean>;
  onToggleRow: (id: string | number) => void;
  onSelectAll: (checked: boolean) => void;
  allSelected: boolean;
  idKey: keyof T; // 👈 configurable ID key
}

function EntityListTable<T>({
  data,
  columns,
  filters,
  onFilterChange,
  onRowClick,
  selectedRows,
  onToggleRow,
  onSelectAll,
  allSelected,
  idKey,
}: EntityListTableProps<T>) {
  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2 text-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
            />
          </th>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className="border border-gray-300 p-2 bg-gray-100 text-left font-semibold"
            >
              <div className="flex items-center gap-1">
                <span>{col.label}</span>
                <Filter className="w-3 h-3 text-gray-500" />
              </div>
            </th>
          ))}
        </tr>

        {/* Filters Row */}
        <tr className="bg-gray-50">
          <th className="border border-gray-300 p-2"></th>
          {columns.map((col) => (
            <th key={String(col.key)} className="border border-gray-300 p-2">
              <input
                type={col.type || "text"}
                placeholder="Filter..."
                value={filters[col.key as string] ?? ""}
                onChange={(e) => onFilterChange(col.key, e.target.value)}
                className="border border-gray-300 rounded w-full p-1 text-sm placeholder-gray-400"
              />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => {
          const itemId = String(item[idKey]);
          return (
            <tr
              key={itemId}
              className={`cursor-pointer hover:bg-blue-50 transition ${
                selectedRows[itemId] ? "bg-blue-100" : ""
              }`}
            >
              <td
                className="border border-gray-300 p-2 text-center w-12"
                style={{ minWidth: 40, maxWidth: 40 }}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={!!selectedRows[itemId]}
                  onChange={() => onToggleRow(itemId)}
                />
              </td>

              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="border border-gray-300 p-2"
                  onClick={() => onRowClick(itemId)}
                >
                  {col.render ? col.render(item) : String(item[col.key] ?? "")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EntityListTable;
