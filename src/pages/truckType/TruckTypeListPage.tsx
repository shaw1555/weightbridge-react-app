import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTruckTypes } from "./service"; // your API function
import { type TruckType } from "./types"; // your Product type
import ROUTES from "../../config/routes";
import { EntityList, type Column } from "../../components/EntityList";

const TruckTypeListPage: React.FC = () => {
  const [truckTypes, setTruckTypes] = useState<TruckType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        fetchTruckTypes().then(setTruckTypes);
      } catch (err) {
        setError("Failed to load form names");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const columns: Column<TruckType>[] = [
    // { key: "truckType_id_f", label: "TruckType Id" }, // can remove, but it still work for save, update, delete//
    { key: "truck_type_f", label: "Truck Type" },
  ];

  return (
    <EntityList
      title="Truck Type"
      data={truckTypes}
      columns={columns}
      idKey="truck_type_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.TruckType_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.TruckType_Form())}
    />
  );
};

export default TruckTypeListPage;
