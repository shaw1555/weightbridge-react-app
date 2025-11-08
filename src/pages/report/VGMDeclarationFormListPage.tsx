import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; 
import { fetchVGMDeclarationForm, DownloadVGMDeclarationForm } from "./service"; // your API function
import type { VGMDeclarationForm } from "./types"; // your Product type
import { EntityList, type Column } from "../../components/EntityList";
import DateRangeFilter from "../../components/DateRangeFilter";

const VGMDeclarationFormListPage: React.FC = () => {
  const [datas, setDatas] = useState<VGMDeclarationForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<{
    fromDate: string;
    toDate: string;
  }>({
    fromDate: new Date().toISOString().split("T")[0], // e.g. "2025-10-22"
    toDate: new Date().toISOString().split("T")[0],
  });

  const handleDateFilterApply = (fromDate: string, toDate: string) => {
    setFilters({ fromDate, toDate });
    fetchData(fromDate, toDate);
  };

  const fetchData = async (fromDate: string, toDate: string) => {
    setLoading(true);
    try {
      const data = await fetchVGMDeclarationForm(fromDate, toDate);
      setDatas(data);
    } catch (error) {
      console.error("Error fetching VGMDeclarationForm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filters.fromDate, filters.toDate);
  }, [filters.fromDate, filters.toDate]);

  const columns: Column<VGMDeclarationForm>[] = [
    { key: "customer_name_f", label: "Customer", width: "500px" },
    { key: "booking_no_f", label: "Booking No", width: "300px" },
    { key: "port_of_loading_f", label: "Port of Loading", width: "300px" },
  ];

  return (
    <div>
      {/* Top Toolbar */}
      <div className="flex items-center space-x-4">
        <DateRangeFilter
          label="Transaction Date"
          startKey="fromDate"
          endKey="toDate"
          filters={filters}
          onFilterApply={handleDateFilterApply}
        />
      </div>

      {/* Table */}
      <div className="mt-1 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10 rounded">
            <p className="text-gray-700 text-lg font-medium">Loading...</p>
          </div>
        )}

        <EntityList
          title="VGM Declaration Form"
          data={datas}
          columns={columns}
          idKey="transaction_id_f" // 👈 tell which field is the PK
          onRowClick={(id) => {
            const selected = datas.find(
              (item) => String(item.transaction_id_f) === String(id)
            );
            if (!selected) {
              toast.warning("Invalid for download file.");
              return;
            }
            DownloadVGMDeclarationForm(selected);
          }}
        />
      </div>
    </div>
  );
};

export default VGMDeclarationFormListPage;
