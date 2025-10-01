import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Column } from "./types";
import EntityListPagination from "./EntityListPagination";
import EntityListRecordInfo from "./EntityListRecordInfo";
import EntityListTable from "./EntityListTable";
import Button from "../Button";

interface EntityListProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  idKey: keyof T; // 👈 must specify which property is the PK
  onRowClick: (id: string | number) => void;
  onAddClick: () => void;
}

function EntityList<T>({
  title,
  data,
  columns,
  idKey,
  onRowClick,
  onAddClick,
}: EntityListProps<T>) {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFilterChange = (key: keyof T, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.every((col) => {
        const filterValue = filters[col.key as string];
        if (!filterValue && filterValue !== 0) return true;
        const cellValue = item[col.key];
        switch (col.type) {
          case "number":
            return Number(cellValue) === Number(filterValue);
          case "date":
            return String(cellValue).startsWith(filterValue);
          case "select":
            return String(cellValue) === String(filterValue);
          case "checkbox":
            return Boolean(cellValue) === Boolean(filterValue);
          default:
            return String(cellValue)
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());
        }
      })
    );
  }, [data, filters, columns]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const toggleRow = (id: string | number) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectAll = (checked: boolean) => {
    const newSelected: Record<string, boolean> = {};
    filteredData.forEach((item) => {
      newSelected[String(item[idKey])] = checked;
    });
    setSelectedRows(newSelected);
  };

  const allSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedRows[String(row[idKey])]);

  const selectedCount = Object.values(selectedRows).filter(Boolean).length;

  const exportToExcel = () => {
    const exportData = filteredData.filter(
      (row) => selectedRows[String(row[idKey])]
    );
    const rowsToExport = exportData.length ? exportData : filteredData;

    const worksheet = XLSX.utils.json_to_sheet(
      rowsToExport.map((row) =>
        columns.reduce((acc, col) => {
          acc[col.label] = row[col.key];
          return acc;
        }, {} as Record<string, any>)
      )
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const wbout = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${title}.xlsx`
    );
  };

  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== "" && v !== undefined && v !== null && v !== false
  );

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, filteredData.length);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mt-4 mb-4 gap-2">
          <div className="flex items-center gap-4">
            <Button onClick={onAddClick}>Add</Button>
            <span className="text-xl font-bold">{title}</span>
          </div>

          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}

            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm flex items-center gap-1"
              onClick={exportToExcel}
            >
              Export to Excel
              {selectedCount > 0 && (
                <span className="bg-white text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {selectedCount} selected
                </span>
              )}
            </button>

            <EntityListRecordInfo
              start={startRow}
              end={endRow}
              total={filteredData.length}
            />

            <EntityListPagination
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setRowsPerPage(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <EntityListTable
          data={paginatedData}
          columns={columns}
          filters={filters}
          onFilterChange={handleFilterChange}
          onRowClick={(rowId) => onRowClick(rowId)}
          selectedRows={selectedRows}
          onToggleRow={toggleRow}
          onSelectAll={selectAll}
          allSelected={allSelected}
          idKey={idKey} // 🔑 dynamic ID key
        />
      </div>
    </div>
  );
}

export default EntityList;
