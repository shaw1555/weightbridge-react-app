import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import SearchableDropdown from "../../components/SearchableDropdown";
import type { LoginRequest, Setup } from "./types";
import ROUTES from "../../config/routes";
import { SETUP_CATEGORIES, STORAGE_KEYS } from "../../constants";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import { fetchSetups } from "./service";

type Location = Setup;

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginRequest>({
    loginAccount: "",
    password: "",
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const setups = await fetchSetups();
        setLocations(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.LOCATION)
        );
        const defaultLoc = localStorage.getItem(STORAGE_KEYS.DEFAULT_LOCATION);
        setSelectedLocation(String(defaultLoc));
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData(); // run only once
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedLocation) {
      setError("Please select a location.");
      return;
    }

    setLoading(true);

    try {
      await AuthService.login(form);
      localStorage.setItem(
        STORAGE_KEYS.DEFAULT_LOCATION,
        String(selectedLocation)
      );
      navigate(ROUTES.Dashboard);
    } catch (err: any) {
      // console.error("Login failed:", err.response.data.message);
      setError(String(err.response.data.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-white-900">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          My Application
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 mb-1">Username</label>
            <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-10" />
            <input
              type="text"
              name="loginAccount"
              value={form.loginAccount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <LockClosedIcon className="absolute w-5 h-5 text-gray-400 left-3 top-10" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <SearchableDropdown
              label="Location"
              options={locations}
              value={selectedLocation ?? null} // 👈 ensures no undefined is passed
              onChange={(val) => setSelectedLocation(val ? String(val) : null)}
              displayKey="description_f"
              valueKey="description_f"
              placeholder="Select a location"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white font-semibold ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
