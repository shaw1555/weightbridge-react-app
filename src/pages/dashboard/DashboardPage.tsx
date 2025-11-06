// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import type {
  TodayGroupByCustomerCount,
  TodayGroupByCustomerAmount,
  SevenDayAgoGroupByDateCount,
  SevenDayAgoGroupByDateAmount,
  Setup,
} from "./types";
import {
  fetchTodayGroupByCustomerCounts,
  fetchTodayGroupByCustomerAmounts,
  fetchSevenDayAgoGroupByDateCounts,
  fetchSevenDayAgoGroupByDateAmounts,
  fetchSetups,
} from "./service";
import {
  ALL_LOCATION_NAME,
  STORAGE_KEYS,
  SETUP_CATEGORIES,
} from "../../constants";
import SearchableDropdown from "../../components/SearchableDropdown";

type Location = Setup;
const COLORS = [
  "#6f6e6bff",
  "#3abf6dff",
  "#fdbd3fff",
  "#ff6d38ff",
  "#978333ff",
  "#d82e2eff",
  "#5b3fbeff",
];

const DashboardPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setselectedLocation] = useState(String);
  const [todayGroupByCustomerCounts, setTodayGroupByCustomerCounts] = useState<
    TodayGroupByCustomerCount[]
  >([]);
  const [todayGroupByCustomerAmounts, setTodayGroupByCustomerAmounts] =
    useState<TodayGroupByCustomerAmount[]>([]);
  const [sevenDayAgoGroupByDateCounts, setSevenDayAgoGroupByDateCounts] =
    useState<SevenDayAgoGroupByDateCount[]>([]);
  const [sevenDayAgoGroupByDateAmounts, setSevenDayAgoGroupByDateAmounts] =
    useState<SevenDayAgoGroupByDateAmount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
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
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        fetchTodayGroupByCustomerCounts(selectedLocation).then(
          setTodayGroupByCustomerCounts
        );
        fetchTodayGroupByCustomerAmounts(selectedLocation).then(
          setTodayGroupByCustomerAmounts
        );
        fetchSevenDayAgoGroupByDateCounts(selectedLocation).then(
          setSevenDayAgoGroupByDateCounts
        );
        fetchSevenDayAgoGroupByDateAmounts(selectedLocation).then(
          setSevenDayAgoGroupByDateAmounts
        );
      } catch (err) {
        setError("Failed to load TodayGroupByCustomerCount");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedLocation]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleSelectedLocation = (val: string) => {
    setselectedLocation(val);
  };

  return (
    <div>
      {/* if want user to allow to select location, pls uncomment below code.*/}
      {/* <div className="p-6 flex items-center space-x-3">
        <div className="w-64">
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
        </div>
      </div> */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">
            Today Weigh In & Out: Group By Customer Count
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={todayGroupByCustomerCounts}>
              <XAxis dataKey="customer_name_f" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count_f" fill="#ff6d38ff" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">
            Today Weigh In & Out: Group By Customer Amount
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={todayGroupByCustomerAmounts}>
              <XAxis dataKey="customer_name_f" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="grand_total_amount_f"
                stroke="#82ca9d"
                name="Amount"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">
            Last 7 days Weigh In & Out: Group By Date Count
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sevenDayAgoGroupByDateCounts as any}
                name="Count"
                dataKey="count_f"
                nameKey="date_f"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {sevenDayAgoGroupByDateCounts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">
            Last 7 days Weigh In & Out: Group By Date Amount
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={sevenDayAgoGroupByDateAmounts}>
              <XAxis dataKey="date_f" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="grand_total_amount_f"
                stroke="#6f6e6bff"
                fill="#6f6e6bff"
                name="Amount"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>{" "}
    </div>
  );
};

export default DashboardPage;
