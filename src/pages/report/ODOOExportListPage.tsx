import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DownloadODOOExport, fetchSetups } from "./service"; // your API function
import type { Setup } from "./types"; // your Product type
import SingleDatePicker from "../../components/SingleDatePicker";
import SearchableDropdown from "../../components/SearchableDropdown";
import {
  ALL_LOCATION_NAME,
  STORAGE_KEYS,
  SETUP_CATEGORIES,
} from "../../constants";
import Button from "../../components/Button";

type Location = Setup;

const ODOOExportListPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setselectedLocation] = useState(String);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const handleSelectedLocation = (val: string) => {
    setselectedLocation(val);
  };

  const loadData = async () => {
    setLoading(true);
    try {
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
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Call loadData when component mounts
  useEffect(() => {
    loadData();
  }, []);

  const handleDownloadExcel = async () => {
    DownloadODOOExport(fromDate, today, selectedLocation);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded shadow flex flex-col space-y-4">
        {/* 1st Row - From Date */}
        <SingleDatePicker
          label="From Date"
          value={fromDate}
          onChange={setFromDate}
        />

        {/* 2nd Row - To Date */}
        <SingleDatePicker label="To Date" value={toDate} onChange={setToDate} />

        {/* 3rd Row - Location */}
        <SearchableDropdown
          label="Location"
          options={locations}
          value={selectedLocation}
          onChange={(val) => {
            if (val !== null) handleSelectedLocation(String(val));
          }}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a location"
        />

        {/* 4th Row - Download Button */}
        <div className="mt-6 text-center">
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
        </div>
      </div>
    </div>
  );
};

export default ODOOExportListPage;
