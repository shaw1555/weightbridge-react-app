import React from "react";
import { type TruckType } from "./types";
import {
  fetchTruckTypeById,
  createTruckType,
  updateTruckType,
  deleteTruckType,
} from "./service";
import ROUTES from "../../routes";
import EntityForm, { type Field } from "../../components/EntityForm";

const TruckTypeFormPage: React.FC = () => {
  const fields: Field<TruckType>[] = [
   
    {
      name: "truck_type_f",
      label: "Truck Type",
      type: "text",
      required: true,
    },
    
  ];
  return (
    <EntityForm<TruckType, "truck_type_id_f">
      title="Truck Type"
      idField="truck_type_id_f"
      fields={fields}
      fetchById={fetchTruckTypeById}
      create={createTruckType}
      update={updateTruckType}
      deleteFn={deleteTruckType}
      listRoute={ROUTES.TruckType_List}
      createPermission="Create_TruckType"
      updatePermission="Update_TruckType"
      deletePermission="Delete_TruckType"
    />
  );
};

export default TruckTypeFormPage;
