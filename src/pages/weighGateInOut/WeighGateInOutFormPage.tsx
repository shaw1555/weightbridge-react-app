import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderInfo from "./HeaderInfo";
import DetailInfo from "./DetailInfo";
import type { ActiveTariff, WeighGateInOut } from "./types";
import { initialForm } from "./types"; // this is data (not type)
import { fetchActiveTariff } from "./service";

export default function WeighGateInOutFormPage() {
  const [weighGateInOutData, setWeighGateInOutData] =
    useState<WeighGateInOut>(initialForm);
  const [activeTariff, setActiveTariff] = useState<ActiveTariff>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const activeTariff = await fetchActiveTariff();
        setActiveTariff(activeTariff);
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
    setWeighGateInOutData({ ...initialForm }); // ✅ new object each time
  };
  const duplicateData = () => {
    setWeighGateInOutData((prev) => ({
      ...prev,
      transaction_id_f: initialForm.transaction_id_f,
      transaction_no_f: initialForm.transaction_no_f,
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
  const saveHeaderInfo = async (data: WeighGateInOut) => {
    // const res = await axios.post("/api/transactions", data);
    // setTransactionId(res.data.id); // assume API returns { id: "123" }
    setWeighGateInOutData((prev) => ({
      ...prev,
      transaction_id_f: 1,
    }));
    
    // Show all dataHeaderInfo values in an alert
    alert(JSON.stringify(weighGateInOutData, null, 2)); 
  };

  const saveDetailInfo = async (data: WeighGateInOut) => {
    const res = await axios.post("/api/transactions", data); 
    alert("Block B saved!");
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Weigh Gate In & Out</h2>
      <HeaderInfo
        onSave={saveHeaderInfo}
        weighGateInOutData={weighGateInOutData}
        setWeighGateInOutData={setWeighGateInOutData}
        onClear={clearData}
        duplicateData={duplicateData} 
        tariff={activeTariff?.tariff_t}
      />
      <DetailInfo
        onSave={saveDetailInfo}
        weighGateInOutData={weighGateInOutData}
        setWeighGateInOutData={setWeighGateInOutData} 
      />
    </div>
  );
}
