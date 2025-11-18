import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchWeighVGMs, fetchSetups } from "./service"; // your API function
import type { WeighVGM, Setup } from "./types"; // your Product type
import ROUTES from "../../config/routes";
import { EntityList, type Column } from "../../components/EntityList";
import DateRangeFilter from "../../components/DateRangeFilter";
import Checkbox from "../../components/Checkbox";

const WeighVGMListPage: React.FC = () => {
  const [weighVGMs, setWeighVGMs] = useState<WeighVGM[]>([]);
  const [inactive, setInactive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<{
    fromDate: string;
    toDate: string;
  }>({
    fromDate: new Date().toISOString().split("T")[0], // e.g. "2025-10-22"
    toDate: new Date().toISOString().split("T")[0],
  });

  const navigate = useNavigate();

  const handleDateFilterApply = (fromDate: string, toDate: string) => {
    setFilters({ fromDate, toDate });
    fetchData(fromDate, toDate);
  };

  const handleInactiveChange = (val: boolean) => {
    setInactive(val);
  };

  const fetchData = async (fromDate: string, toDate: string) => {
    setLoading(true);
    try {
      const data = await fetchWeighVGMs(fromDate, toDate);
      setWeighVGMs(data);
    } catch (error) {
      console.error("Error fetching weighVGMs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically recompute filtered data
  const filteredWeighVGMs = useMemo(() => {
    return weighVGMs.filter(
      (x) =>
        x.inactive_f === inactive  
    );
  }, [weighVGMs, inactive]);

  useEffect(() => {
    fetchData(filters.fromDate, filters.toDate);
  }, [filters.fromDate, filters.toDate]);

  const columns: Column<WeighVGM>[] = [
    { key: "date_f", label: "Date", type: "date" },
        { key: "transaction_no_f", label: "Transaction No", width: "240px" },
    { key: "customer_name_f", label: "Customer", width: "300px" },
    { key: "registration_number_f", label: "Registration No" },
    { key: "vgm_reference_f", label: "VGM Reference" },
    { key: "truck_no_f", label: "Truck No", width: "100px" },
    { key: "booking_no_f", label: "Booking No" },
    { key: "convoy_note_f", label: "Convoy Note" },
    { key: "port_of_loading_f", label: "Port of Loading" },
    { key: "vessel_voy_f", label: "Vessel/Voy", width: "230px" },
    { key: "seal_number_f", label: "Seal No" },
    { key: "container_no_f", label: "Container No" },
    { key: "container_size_type_f", label: "Container Size Type" },
    {
      key: "date_time_in_f",
      label: "Date Time In",
      type: "date",
      showTime: true,
      width: "200px",
    },
    {
      key: "date_time_out_f",
      label: "Date Time Out",
      type: "date",
      showTime: true,
      width: "200px",
    },
    {
      key: "truck_cargo_weight_f",
      label: "Truck Cargo Weight",
      type: "number",
    },
    { key: "truck_weight_f", label: "Truck Weight", type: "number" },
    { key: "net_weight_f", label: "Net Weight", type: "number" },
    { key: "remark_f", label: "Remark" },
    { key: "weight_by_f", label: "Weight By", width: "150px" },
    { key: "accepted_by_f", label: "Accepted By", width: "150px" },
    { key: "vgm_verified_by_f", label: "VGM Verified By", width: "150px" },
    { key: "log_by_f", label: "Log By", width: "150px" },
    {
      key: "log_date_time_f",
      label: "Log Date Time",
      type: "date",
      showTime: true,
      width: "200px",
    },
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

        <Checkbox
          label="Inactive"
          checked={inactive}
          onChange={(val) => handleInactiveChange(val)}
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
          title="Weigh VGM"
          data={filteredWeighVGMs}
          columns={columns}
          idKey="transaction_id_f" // 👈 tell which field is the PK
          onRowClick={(id) => {
            const selected = filteredWeighVGMs.find(
              (item) => String(item.transaction_id_f) === String(id)
            );
            if (selected?.inactive_f) {
              toast.warning("This record is inactive and cannot be modified.");
              return;
            }
            navigate(ROUTES.WeighVGM_Form(String(id)));
          }}
          onAddClick={() => navigate(ROUTES.WeighVGM_Form())}
        />
      </div>
    </div>
  );
};

export default WeighVGMListPage;
