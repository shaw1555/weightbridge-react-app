import React, { useEffect, useState } from "react";
import type {
  TariffDetail,
  Tariff,
  Service,
  Category,
  TruckType,
} from "./types";
import {
  fetchServices,
  fetchCategories,
  fetchTruckTypes,
  fetchTariffs,
  fetchTariffDetailById,
  createTariffDetail,
  updateTariffDetail,
  deleteTariffDetail,
} from "./service";

import ROUTES from "../../config/routes";
import EntityForm, { type Field } from "../../components/EntityForm";
import { PERMISSIONS } from "../../constants";

const TariffDetailFormPage: React.FC = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [truckTypes, setTruckTypes] = useState<TruckType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tariffs = await fetchTariffs();
        setTariffs(tariffs);

        const categories = await fetchCategories();
        setCategories(categories);

        const services = await fetchServices();
        setServices(services);

        const truckTypes = await fetchTruckTypes();
        setTruckTypes(truckTypes);
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

  const fields: Field<TariffDetail>[] = [
    {
      name: "tariff_id_f",
      label: "Tariff",
      type: "select",
      required: true,
      options: tariffs.map((ctl) => ({
        label: ctl.tariff_no_f,
        value: ctl.tariff_id_f,
      })),
    },
    {
      name: "service_id_f",
      label: "Service",
      type: "select",
      required: true,
      options: services.map((ctl) => ({
        label: ctl.service_f,
        value: ctl.service_id_f,
      })),
    },
    {
      name: "category_id_f",
      label: "Category",
      type: "select",
      required: true,
      options: categories.map((ctl) => ({
        label: ctl.category_f,
        value: ctl.category_id_f,
      })),
    },

    {
      name: "truck_type_id_f",
      label: "Truck Type",
      type: "select",
      required: true,
      options: truckTypes.map((ctl) => ({
        label: ctl.truck_type_f,
        value: ctl.truck_type_id_f,
      })),
    },
    {
      name: "unit_price_f",
      label: "Unit Price",
      type: "number",
      required: true,
    },
  ];
  return (
    <EntityForm<TariffDetail, "tariff_detail_id_f">
      title="Tariff Detail"
      idField="tariff_detail_id_f"
      fields={fields}
      fetchById={fetchTariffDetailById}
      create={createTariffDetail}
      update={updateTariffDetail}
      deleteFn={deleteTariffDetail}
      listRoute={ROUTES.TariffDetail_List}
  createPermission={PERMISSIONS.CREATE_TARIFF_DETAIL}
updatePermission={PERMISSIONS.UPDATE_TARIFF_DETAIL}
deletePermission={PERMISSIONS.DELETE_TARIFF_DETAIL}

    />
  );
};

export default TariffDetailFormPage;
