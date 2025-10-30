import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import HeaderInfo from "./HeaderInfo";
import DetailInfo from "./DetailInfo";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/Button";
import type { ActiveTariff, WeighGateInOut } from "./types";
import { initialForm } from "./types"; // this is data (not type)
import {
  fetchActiveTariff,
  fetchWeighGateInOutById,
  createWeighGateInOut,
  updateWeighGateInOut,
  deleteWeighGateInOut,
} from "./service";

export default function WeighGateInOutFormPage() {
  const { id } = useParams<{ id: string }>(); // 👈 get the :id from route
  const [weighGateInOutData, setWeighGateInOutData] =
    useState<WeighGateInOut>(initialForm);
  const [activeTariff, setActiveTariff] = useState<ActiveTariff>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //it must be delcar before useEffect , due to use this funtion inside of useEffect //
  const getInitialWeighGateInOutData = (): WeighGateInOut => {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-10-28"
    return {
      ...initialForm,
      tariff_id_f: activeTariff?.tariff_t.tariff_id_f ?? 0,
      date_f: today, // ✅ added properly
    };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const activeTariff = await fetchActiveTariff();
        setActiveTariff(activeTariff);

        if (!id || id === "new" || id === "0") {
          // 🆕 new record
          setWeighGateInOutData(getInitialWeighGateInOutData());
        } else {
          // ✏️ existing record
          const existingRecord = await fetchWeighGateInOutById(Number(id));
          setWeighGateInOutData(existingRecord);
        }
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const clearData = () => {
    setWeighGateInOutData(getInitialWeighGateInOutData());
  };

  const duplicateData = () => {
    setWeighGateInOutData((prev) => ({
      ...prev,
      transaction_id_f: initialForm.transaction_id_f,
      transaction_no_f: initialForm.transaction_no_f,
      // tariff_id_f: activeTariff?.tariff_t.tariff_id_f ?? 0, // no need, bczo no change //
      truck_no_f: initialForm.truck_no_f,
      container_no_f: initialForm.container_no_f,
      date_time_in_f: initialForm.date_time_in_f,
      date_time_out_f: initialForm.date_time_out_f,
      no_of_container_f: initialForm.no_of_container_f,
      truck_cargo_weight_f: initialForm.truck_cargo_weight_f,
      truck_weight_f: initialForm.truck_weight_f,
      net_weight_f: initialForm.net_weight_f,
      weight_charge_uom_f: initialForm.weight_charge_uom_f,
    }));
  };
  const deleteRecord = async () => {
    try {
      const res = await deleteWeighGateInOut(
        weighGateInOutData.transaction_id_f
      );
      clearData();
      toast.success("Successfully deleted!");
    } catch (error: any) {
      console.error("Delete failed:", error);
      toast.error(error.message || "An error occurred while deleting.");
    }
  };

  const saveHeaderInfo = async () => {
    try {
      if (weighGateInOutData.transaction_id_f === 0) {
        // 👉 Create new record
        const res = await createWeighGateInOut(weighGateInOutData);

        toast.success(`${res.transaction_no_f}`);

        setWeighGateInOutData((prev) => ({
          ...prev,
          transaction_id_f: res.transaction_id_f,
          transaction_no_f: res.transaction_no_f,
        }));
      } else {
        // 👉 Update existing record
        await updateWeighGateInOut(
          weighGateInOutData.transaction_id_f,
          weighGateInOutData
        );

        toast.success("Successfully updated!");
      }
    } catch (error: any) {
      console.error("Save failed:", error);
      toast.error(error.message || "An error occurred while saving.");
    }
  };

  const saveDetailInfo = async () => {
    const res = await axios.post("/api/transactions", weighGateInOutData);
    alert("Block B saved!");
  };

  const updateGateChargeAmount = (data = weighGateInOutData) => {
    const { category_id_f, service_id_f, truck_type_id_f, is_gate_foc_f } = data;

    const matchedDetail = activeTariff?.tariff_detail_t.find(
      (x) =>
        x.category_id_f === category_id_f &&
        x.service_id_f === service_id_f &&
        x.truck_type_id_f === truck_type_id_f
    );

    const tariffUnitPrice = matchedDetail?.unit_price_f ?? 0;
    let tariffGateAmount = tariffUnitPrice;
    if (is_gate_foc_f) {
      tariffGateAmount = 0;
    }

    // create a new object instead of mutating //to refresh UI // re-render
    setWeighGateInOutData({
      ...data,
      gate_charge_unitprice_f: tariffUnitPrice,
      gate_charge_amount_f: tariffGateAmount,
    });
  };

  const updateWeightChargeAmount = (data = weighGateInOutData) => {
    const { weight_charge_unitprice_f, no_of_container_f , is_weight_foc_f} = data;
    let weightChargeAmount = weight_charge_unitprice_f * no_of_container_f;

    if (is_weight_foc_f) {
      weightChargeAmount = 0;
    }

    // create a new object instead of mutating //to refresh UI // re-render
    setWeighGateInOutData({
      ...data,
      weight_charge_amount_f: weightChargeAmount,
    });
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
        <h2 className="text-lg font-semibold ml-2">Weigh Gate In & Out</h2>
      </div>
      <HeaderInfo
        onSubmit={saveHeaderInfo}
        onDelete={deleteRecord}
        weighGateInOutData={weighGateInOutData}
        setWeighGateInOutData={setWeighGateInOutData}
        onClear={clearData}
        duplicateData={duplicateData}
        activeTariff={activeTariff}
        updateGateChargeAmount={updateGateChargeAmount}
        updateWeightChargeAmount={updateWeightChargeAmount}
      />
      <DetailInfo
        onSubmit={saveDetailInfo}
        weighGateInOutData={weighGateInOutData}
        setWeighGateInOutData={setWeighGateInOutData}
        updateGateChargeAmount={updateGateChargeAmount}
        updateWeightChargeAmount={updateWeightChargeAmount}
      />
    </div>
  );
}
