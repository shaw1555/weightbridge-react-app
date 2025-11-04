import React from "react";
import { type Service } from "./types";
import {
  fetchServiceById,
  createService,
  updateService,
  deleteService,
} from "./service";
import ROUTES from "../../config/routes";
import EntityForm, { type Field } from "../../components/EntityForm";
import { PERMISSIONS } from "../../constants";

const ServiceFormPage: React.FC = () => {
  const fields: Field<Service>[] = [
    {
      name: "service_f",
      label: "Service",
      type: "text",
      required: true,
    },
  ];
  return (
    <EntityForm<Service, "service_id_f">
      title="Service"
      idField="service_id_f"
      fields={fields}
      fetchById={fetchServiceById}
      create={createService}
      update={updateService}
      deleteFn={deleteService}
      listRoute={ROUTES.Service_List}
      createPermission={PERMISSIONS.CREATE_SERVICE}
      updatePermission={PERMISSIONS.UPDATE_SERVICE}
      deletePermission={PERMISSIONS.DELETE_SERVICE}
    />
  );
};

export default ServiceFormPage;
