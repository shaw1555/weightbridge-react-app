import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTruckTypes } from "./service"; // your API function
import { type TruckType } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const TruckTypeListPage: React.FC = () => {
  const [truckTypes, setTruckTypes] = useState<TruckType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTruckTypes().then(setTruckTypes);
  }, []);

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
