import React from "react";
import { type Tariff } from "./types";
import {
  fetchTariffById,
  createTariff,
  updateTariff,
  deleteTariff,
} from "./service";
import ROUTES from "../../routes";
import EntityForm, { type Field } from "../../components/EntityForm";

const TariffFormPage: React.FC = () => {
  const fields: Field<Tariff>[] = [
    {
      name: "tariff_no_f",
      label: "Tariff No",
      type: "text",
      required: true,
    },
    {
      name: "effective_date_f",
      label: "Effective Date",
      type: "date",
      required: true,
    },     
  ];
  return (
    <EntityForm<Tariff, "tariff_id_f">
      title="Tariff"
      idField="tariff_id_f"
      fields={fields}
      fetchById={fetchTariffById}
      create={createTariff}
      update={updateTariff}
      deleteFn={deleteTariff}
      listRoute={ROUTES.Tariff_List}
      createPermission="Create_Tariff"
      updatePermission="Update_Tariff"
      deletePermission="Delete_Tariff"
    />
  );
};

export default TariffFormPage;
