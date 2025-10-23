import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderInfo from "./HeaderInfo";
// import DetailInfo from "./DetailInfo";
import type { ActiveTariff } from "./types";

import { fetchActiveTariff } from "./service";

export default function WeighGateInOutFormPage() {
  const [transactionId, setTransactionId] = useState<string | null>(null);
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

  const saveHeaderInfo = async (data: any) => {
    const res = await axios.post("/api/transactions", data);
    // setTransactionId(res.data.id); // assume API returns { id: "123" }
    setTransactionId("123");
    alert("Block A saved!");
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Weigh Gate In & Out</h2>
      <HeaderInfo
        onSave={saveHeaderInfo}
        disabled={!!transactionId}
        tariff={activeTariff?.tariff_t}
      />
      {/* <DetailInfo transactionId={transactionId} /> */}
    </div>
  );
}
