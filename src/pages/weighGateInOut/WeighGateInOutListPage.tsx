import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchWeighGateInOuts, fetchSetups } from "./service"; // your API function
import type { WeighGateInOut, Setup } from "./types"; // your Product type
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

const WeighGateInOutListPage: React.FC = () => {
  const [weighGateInOuts, setWeighGateInOuts] = useState<WeighGateInOut[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setselectedLocation] = useState(String);
  const [inactive, setInactive] = useState(false);
  const [selfOwn, setSelfOwn] = useState(false);
  const [subContractor, setSubContractor] = useState(false);

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

  const handleInactiveChange = (val: boolean) => {
    setInactive(val);
  };

  const handleSelfOwnChange = (val: boolean) => {
    setSelfOwn(val);
  };

  const handleSubContractorChange = (val: boolean) => {
    setSubContractor(val);
  };

  const fetchData = async (fromDate: string, toDate: string) => {
    setLoading(true);
    try {
      const data = await fetchWeighGateInOuts(fromDate, toDate);
      setWeighGateInOuts(data);

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
      console.error("Error fetching weighGateInOuts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically recompute filtered data
  const filteredWeighGateInOuts = useMemo(() => {
    return weighGateInOuts.filter(
      (x) =>
        x.inactive_f === inactive &&
        (!selfOwn || x.self_own_f === true) &&
        (!subContractor || x.self_own_f === false) &&
        (selectedLocation === ALL_LOCATION_NAME.ALLLOCATION ||
          x.location_f === selectedLocation)
    );
  }, [weighGateInOuts, inactive, selfOwn, subContractor, selectedLocation]);

  useEffect(() => {
    fetchData(filters.fromDate, filters.toDate);
  }, [filters.fromDate, filters.toDate]);

  const columns: Column<WeighGateInOut>[] = [
    // { key: "weighGateInOut_id_f", label: "WeighGateInOut Id" }, // can remove, but it still work for save, update, delete//
    { key: "transaction_no_f", label: "Transaction No", width: "240px" },
    { key: "truck_no_f", label: "Truck No", width: "100px" },
    { key: "product_f", label: "Product", width: "150px" },
    { key: "date_f", label: "Date", type: "date" },
    { key: "customer_name_f", label: "Customer", width: "280px" },
    { key: "container_no_f", label: "Container No" },
    { key: "container_size_type_f", label: "Container Size Type" },
    // { key: "service_id_f", label: "Service ID" },
    { key: "service_f", label: "Service" },
    // { key: "category_id_f", label: "Category ID" },
    { key: "category_f", label: "Category" },
    // { key: "truck_type_id_f", label: "Truck Type ID" },
    { key: "truck_type_f", label: "Truck Type" },
    { key: "payment_type_f", label: "Payment Type" },
    { key: "location_f", label: "Location" },
    { key: "gate_charge_uom_f", label: "Gate Charge UOM" },
    {
      key: "gate_charge_amount_f",
      label: "Gate Charge Amount",
      type: "number",
    },
    { key: "is_gate_foc_f", label: "Is Gate FOC", type: "checkbox" },
    { key: "weight_charge_uom_f", label: "Weight Charge UOM", width: "120px" },

    { key: "no_of_container_f", label: "No of Container", type: "number" },
    {
      key: "weight_charge_unitprice_f",
      label: "Weight Charge Unit Price",
      type: "number",
    },
    {
      key: "weight_charge_amount_f",
      label: "Weight Charge Amount",
      type: "number",
    },
    { key: "is_weight_foc_f", label: "Is Weight FOC", type: "checkbox" },
    { key: "sub_total_amount_f", label: "Sub Total Amount", type: "number" },
    {
      key: "commerical_tax_amount_f",
      label: "Commercial Tax Amount",
      type: "number",
    },
    {
      key: "grand_total_amount_f",
      label: "Grand Total Amount",
      type: "number",
    },
    { key: "job_department_f", label: "Job Department" },
    { key: "truck_arrange_by_f", label: "Truck Arrange By" },
    { key: "bl_no_f", label: "BL No" },
    { key: "vessel_f", label: "Vessel" },
    { key: "voy_f", label: "Voy" },
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
    { key: "gate_in_info_f", label: "Gate In Info", width: "150px" },
    { key: "gate_in_weight_f", label: "Gate In Weight", type: "number" },
    { key: "gate_out_info_f", label: "Gate Out Info", width: "150px" },
    { key: "gate_out_weight_f", label: "Gate Out Weight", type: "number" },
    { key: "remark_f", label: "Remark" },
    { key: "received_by_f", label: "Received By" },
    { key: "accepted_by_f", label: "Accepted By", width: "150px" },
    { key: "approved_by_f", label: "Approved By", width: "150px" },
    // { key: "inactive_f", label: "Inactive", type: "checkbox" },
    { key: "log_by_f", label: "Log By", width: "150px" },
    {
      key: "log_date_time_f",
      label: "Log Date Time",
      type: "date",
      showTime: true,
      width: "200px",
    },
    { key: "self_own_f", label: "Self Own", type: "checkbox" },
    // { key: "lock_f", label: "Lock", type: "checkbox" },
    {
      key: "gate_charge_unitprice_f",
      label: "Gate Charge Unit Price",
      type: "number",
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

        <Checkbox
          label="Inactive"
          checked={inactive}
          onChange={(val) => handleInactiveChange(val)}
        />
        <Checkbox
          label="Self Own"
          checked={selfOwn}
          onChange={(val) => handleSelfOwnChange(val)}
        />
        <Checkbox
          label="Sub Contractor"
          checked={subContractor}
          onChange={(val) => handleSubContractorChange(val)}
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
          title="Weigh Gate In & Out"
          data={filteredWeighGateInOuts}
          columns={columns}
          idKey="transaction_id_f" // 👈 tell which field is the PK
          // onRowClick={(id) => navigate(ROUTES.WeighGateInOut_Form(String(id)))}
          onRowClick={(id) => {
            const selected = filteredWeighGateInOuts.find(
              (item) => String(item.transaction_id_f) === String(id)
            );
            if (selected?.inactive_f) {
              toast.warning("This record is inactive and cannot be modified.");
              return;
            }
            navigate(ROUTES.WeighGateInOut_Form(String(id)));
          }}
          onAddClick={() => navigate(ROUTES.WeighGateInOut_Form())}
        />
      </div>
    </div>
  );
};

export default WeighGateInOutListPage;
