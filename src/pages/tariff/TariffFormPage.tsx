import React from "react";
import { type Tariff } from "./types";
import {
  fetchTariffById,
  createTariff,
  updateTariff,
  deleteTariff,
} from "./service";
import ROUTES from "../../config/routes";
import EntityForm, { type Field } from "../../components/EntityForm";
import { PERMISSIONS } from "../../constants";

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
      createPermission={PERMISSIONS.CREATE_TARIFF_SETUP}
      updatePermission={PERMISSIONS.UPDATE_TARIFF_SETUP}
      deletePermission={PERMISSIONS.DELETE_TARIFF_SETUP}
    />
  );
};

export default TariffFormPage;
