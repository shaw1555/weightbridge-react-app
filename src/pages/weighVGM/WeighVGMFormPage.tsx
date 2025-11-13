import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GATE_VGM_TRUCK_INFO,
  SETUP_CATEGORIES,
  STORAGE_KEYS,
} from "../../constants";
import HeaderInfo from "./HeaderInfo";
import DetailInfo from "./DetailInfo";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/Button";
import type { Setup, WeighVGM } from "./types";
import { initialForm } from "./types"; // this is data (not type)
import {
  fetchWeighVGMById,
  createWeighVGM,
  updateWeighVGM,
  updateWeighDetailVGM,
  deleteWeighVGM,
  fetchSetups,
} from "./service";

export default function WeighVGMFormPage() {
  const { id } = useParams<{ id: string }>(); // 👈 get the :id from route
  const [WeighVGMData, setWeighVGMData] = useState<WeighVGM>(initialForm);
  const [setups, setSetup] = useState<Setup[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //it must be delcar before useEffect , due to use this funtion inside of useEffect //
  const getInitialWeighVGMData = (): WeighVGM => {
    const defaultLoc = localStorage.getItem(STORAGE_KEYS.DEFAULT_LOCATION);

    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    return {
      ...initialForm,
      date_f: today,
      location_f: defaultLoc ?? "",
    };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // ✅ Fetch once
        const [setups] = await Promise.all([fetchSetups()]);

        setSetup(setups);

        if (!id || id === "new" || id === "0") {
          // 🆕 New record
          const initialData = getInitialWeighVGMData();
          setWeighVGMData(initialData);
        } else {
          // ✏️ Existing record
          const existingRecord = await fetchWeighVGMById(Number(id));
          if (!existingRecord.date_time_in_f)
            existingRecord.gate_in_out_truck_info_f =
              GATE_VGM_TRUCK_INFO.TRUCK_PLUS_CARGO;
          else
            existingRecord.gate_in_out_truck_info_f =
              GATE_VGM_TRUCK_INFO.TRUCK_ONLY;
          setWeighVGMData(existingRecord);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const clearData = () => {
    setWeighVGMData(getInitialWeighVGMData());
  };

  const duplicateData = () => {
    setWeighVGMData((prev) => ({
      ...prev,
      transaction_id_f: initialForm.transaction_id_f,
      transaction_no_f: initialForm.transaction_no_f,
      truck_no_f: initialForm.truck_no_f,
      container_no_f: initialForm.container_no_f,
      date_time_in_f: initialForm.date_time_in_f,
      date_time_out_f: initialForm.date_time_out_f,
      truck_cargo_weight_f: initialForm.truck_cargo_weight_f,
      truck_weight_f: initialForm.truck_weight_f,
      net_weight_f: initialForm.net_weight_f,
      gate_in_out_truck_weighValue_f:
        initialForm.gate_in_out_truck_weighValue_f,
    }));
  };
  const deleteRecord = async () => {
    try {
      const res = await deleteWeighVGM(WeighVGMData.transaction_id_f);
      clearData();
      toast.success("Successfully deleted!");
    } catch (error: any) {
      console.error("Delete failed:", error);
      toast.error(error.message || "An error occurred while deleting.");
    }
  };

  const validation = () => {
    if (!WeighVGMData.customer_id_f) {
      toast.warn("Customer Name is required.");
      return false;
    }

    if (!WeighVGMData.truck_no_f?.trim()) {
      toast.warn("Vehicle No is required.");
      return false;
    }

    if (!WeighVGMData.container_size_type_f) {
      toast.warn("Container Type is required.");
      return false;
    }

    if (!WeighVGMData.container_no_f) {
      toast.warn("Container No is required.");
      return false;
    }

    if (!WeighVGMData.weight_by_f) {
      toast.warn("Weighing By is required.");
      return false;
    }

    return true;
  };

  const saveHeaderInfo = async () => {
    try {
      if (!validation()) return;

      if (WeighVGMData.transaction_id_f === 0) {
        // 👉 Create new record
        const res = await createWeighVGM(WeighVGMData);

        toast.success(`${res.transaction_no_f}`);

        setWeighVGMData((prev) => ({
          ...prev,
          transaction_id_f: res.transaction_id_f,
          transaction_no_f: res.transaction_no_f,
        }));
      } else {
        // 👉 Update existing record
        await updateWeighVGM(WeighVGMData.transaction_id_f, WeighVGMData);

        toast.success("Successfully updated!");
      }
    } catch (error: any) {
      console.error("Save failed:", error);
      toast.error(error.message || "An error occurred while saving.");
    }
  };

  const saveDetailInfo = async () => {
    try {
      // 👉 Update Weight Detail existing record
      await updateWeighDetailVGM(WeighVGMData.transaction_id_f, WeighVGMData);

      const {
        gate_in_out_truck_info_f,
        gate_in_out_truck_dateTime_f,
        date_time_in_f,
        date_time_out_f,
      } = WeighVGMData;

      let updatedFields: Partial<WeighVGM> = {};

      // Handle date/time logic
      if (!date_time_in_f) {
        updatedFields.date_time_in_f = gate_in_out_truck_dateTime_f;
      } else if (!date_time_out_f) {
        updatedFields.date_time_out_f = gate_in_out_truck_dateTime_f;
      }

      // Toggle gate_in_out_truck_info_f value
      updatedFields.gate_in_out_truck_info_f =
        gate_in_out_truck_info_f === GATE_VGM_TRUCK_INFO.TRUCK_PLUS_CARGO
          ? GATE_VGM_TRUCK_INFO.TRUCK_ONLY
          : GATE_VGM_TRUCK_INFO.TRUCK_PLUS_CARGO;

      // ✅ Only update once, avoids duplicated setState calls
      setWeighVGMData((prev) => ({
        ...prev,
        ...updatedFields,
      }));

      toast.success("Successfully updated!");
    } catch (error: any) {
      console.error("Save failed:", error);
      toast.error(error.message || "An error occurred while updating.");
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex items-center mb-4">
        <Button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          // title="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h2 className="text-lg font-semibold ml-2">Weigh VGM</h2>
      </div>
      <HeaderInfo
        onSubmit={saveHeaderInfo}
        onDelete={deleteRecord}
        weighVGMData={WeighVGMData}
        setWeighVGMData={setWeighVGMData}
        onClear={clearData}
        duplicateData={duplicateData}
      />
      <DetailInfo
        onSubmit={saveDetailInfo}
        weighVGMData={WeighVGMData}
        setWeighVGMData={setWeighVGMData}
      />
    </div>
  );
}
