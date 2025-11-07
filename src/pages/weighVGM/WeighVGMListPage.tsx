import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchWeighVGMs, fetchSetups } from "./service"; // your API function
import type { WeighVGM, Setup } from "./types"; // your Product type
import ROUTES from "../../config/routes";
import { EntityList, type Column } from "../../components/EntityList";
import DateRangeFilter from "../../components/DateRangeFilter";
import Checkbox from "../../components/Checkbox";
import SearchableDropdown from "../../components/SearchableDropdown";
import {
  ALL_LOCATION_NAME,
  STORAGE_KEYS,
  SETUP_CATEGORIES,
} from "../../constants";

type Location = Setup;

const WeighVGMListPage: React.FC = () => {
  const [weighVGMs, setWeighVGMs] = useState<WeighVGM[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setselectedLocation] = useState(String);

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

  const handleSelectedLocation = (val: string) => {
    setselectedLocation(val);
  };

  const fetchData = async (fromDate: string, toDate: string) => {
    setLoading(true);
    try {
      const data = await fetchWeighVGMs(fromDate, toDate);
      setWeighVGMs(data);

      const setups = await fetchSetups();

      // Filter for locations
      const dbLocation = setups.filter(
        (x) => x.category_f === SETUP_CATEGORIES.LOCATION
      );

      // Add "All Location" at the beginning
      const allLocations: Location[] = [
        {
          setup_id_f: 0,
          category_f: SETUP_CATEGORIES.LOCATION,
          description_f: ALL_LOCATION_NAME.ALLLOCATION,
        },
        ...dbLocation,
      ];
      setLocations(allLocations);

      const defaultLoc = localStorage.getItem(STORAGE_KEYS.DEFAULT_LOCATION);
      setselectedLocation(String(defaultLoc));
    } catch (error) {
      console.error("Error fetching weighVGMs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically recompute filtered data
  const filteredWeighGateInOuts = useMemo(() => {
    return weighVGMs.filter(
      (x) =>
        selectedLocation === ALL_LOCATION_NAME.ALLLOCATION ||
        x.location_f === selectedLocation
    );
  }, [weighVGMs, selectedLocation]);

  useEffect(() => {
    fetchData(filters.fromDate, filters.toDate);
  }, [filters.fromDate, filters.toDate]);

  const columns: Column<WeighVGM>[] = [
    { key: "transaction_no_f", label: "Transaction No", width: "240px" },

    { key: "date_f", label: "Date", type: "date" },
    { key: "customer_name_f", label: "Customer", width: "300px" },
    { key: "registration_number_f", label: "Registration No" },
    { key: "vgm_reference_f", label: "VGM Reference" },
    { key: "truck_no_f", label: "Truck No", width: "100px" },
    { key: "booking_no_f", label: "Booking No" },
    { key: "convoy_note_f", label: "Convoy Note" },
    { key: "port_of_loading_f", label: "Port of Loading" },
    { key: "vessel_voy_f", label: "Vessel/Voy" , width: "230px" },
    { key: "seal_number_f", label: "Seal No" },
    { key: "container_size_type_f", label: "Container Size Type" },

    { key: "container_no_f", label: "Container No" },

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
    { key: "location_f", label: "Location" },
    { key: "weight_by_f", label: "Weight By" , width: "150px" },
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
        <div className="w-64">
          {" "}
          {/* adjust width as needed, e.g., w-48, w-72 */}
          <SearchableDropdown
            // label="Location"
            options={locations}
            value={selectedLocation}
            onChange={(val) => {
              if (val !== null) handleSelectedLocation(String(val));
            }}
            displayKey="description_f"
            valueKey="description_f"
            placeholder="Select a location"
          />
        </div>
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
          data={filteredWeighGateInOuts}
          columns={columns}
          idKey="transaction_id_f" // 👈 tell which field is the PK
          onRowClick={(id) => {
            navigate(ROUTES.WeighVGM_Form(String(id)));
          }}
          onAddClick={() => navigate(ROUTES.WeighVGM_Form())}
        />
      </div>
    </div>
  );
};

export default WeighVGMListPage;
