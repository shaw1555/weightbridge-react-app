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
  idKey: keyof T;
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
  const formatDate = (value: any, showTime?: boolean) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);
    return showTime ? date.toLocaleString() : date.toLocaleDateString();
  };

  const getAlignmentClass = (type?: string) => {
    switch (type) {
      case "checkbox":
        return "text-center";
      case "number":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            {/* ✅ Fixed width for checkbox column only */}
            <th
              className="border border-gray-300 p-2 text-center"
              style={{ width: 40, minWidth: 40, maxWidth: 40 }}
            >
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="mx-auto block"
              />
            </th>

            {columns.map((col) => {
              const alignmentClass = getAlignmentClass(col.type);
              const isRightAligned = col.type === "number";
              return (
                <th
                  key={String(col.key)}
                  className={`border border-gray-300 p-2 bg-gray-100 font-semibold ${alignmentClass}`}
                  style={
                    col.width ? { width: col.width, minWidth: col.width } : {}
                  }
                >
                  <div
                    className={`flex items-center gap-1 ${
                      isRightAligned ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{col.label}</span>
                    <Filter className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
              );
            })}
          </tr>

          {/* Filters Row */}
          <tr className="bg-gray-50">
            <th
              className="border border-gray-300 p-2"
              style={{ width: 40, minWidth: 40, maxWidth: 40 }}
            ></th>
            {columns.map((col) => {
              const alignmentClass = getAlignmentClass(col.type);
              const isCheckbox = col.type === "checkbox";
              const inputType =
                col.type === "number"
                  ? "number"
                  : col.type === "date"
                  ? "date"
                  : "text";

              return (
                <th
                  key={String(col.key)}
                  className={`border border-gray-300 p-2 ${alignmentClass}`}
                >
                  <input
                    type={inputType}
                    placeholder={isCheckbox ? "" : "Filter..."}
                    value={filters[String(col.key)] ?? ""}
                    onChange={(e) => onFilterChange(col.key, e.target.value)}
                    className="border border-gray-300 rounded w-full p-1 text-sm placeholder-gray-400"
                    disabled={isCheckbox}
                  />
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            const itemId = String(item[idKey]);
            return (
              <tr
                key={itemId}
                className={`cursor-pointer hover:bg-blue-50 transition
            odd:bg-gray-50 even:bg-white
            ${selectedRows[itemId] ? "bg-blue-100" : ""}`}
              >
                {/* ✅ Fixed width for checkbox cell */}
                <td
                  className="border border-gray-300 p-2 text-center"
                  style={{ width: 40, minWidth: 40, maxWidth: 40 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={!!selectedRows[itemId]}
                    onChange={() => onToggleRow(itemId)}
                    className="mx-auto block"
                  />
                </td>

                {columns.map((col) => {
                  const alignmentClass = getAlignmentClass(col.type);
                  let content: React.ReactNode;

                  if (col.type === "checkbox") {
                    content = (
                      <input
                        type="checkbox"
                        checked={!!item[col.key]}
                        readOnly
                        className="mx-auto block cursor-default"
                      />
                    );
                  } else if (col.type === "date") {
                    content = formatDate(item[col.key], col.showTime);
                  } else if (col.render) {
                    content = col.render(item);
                  } else if (col.type === "number") {
                    const num = Number(item[col.key]);
                    content = isNaN(num) ? "" : num.toLocaleString();
                  } else {
                    content = String(item[col.key] ?? "");
                  }

                  return (
                    <td
                      key={String(col.key)}
                      className={`border border-gray p-2 ${alignmentClass}`}
                      onClick={() => onRowClick(itemId)}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EntityListTable;
