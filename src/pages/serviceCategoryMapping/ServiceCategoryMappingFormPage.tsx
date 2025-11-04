import React, { useEffect, useState } from "react";
import type { ServiceCategoryMapping, Service, Category } from "./types";
import {
  fetchServices,
  fetchCategories,
  fetchServiceCategoryMappingById,
  createServiceCategoryMapping,
  updateServiceCategoryMapping,
  deleteServiceCategoryMapping,
} from "./service";
import ROUTES from "../../config/routes";
import EntityForm, { type Field } from "../../components/EntityForm";
import { PERMISSIONS } from "../../constants";

const ServiceCategoryMappingCategoryMappingFormPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);

        const services = await fetchServices();
        setServices(services);
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

  const fields: Field<ServiceCategoryMapping>[] = [
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
  ];
  return (
    <EntityForm<ServiceCategoryMapping, "service_category_mapping_id_f">
      title="Service Category Mapping"
      idField="service_category_mapping_id_f"
      fields={fields}
      fetchById={fetchServiceCategoryMappingById}
      create={createServiceCategoryMapping}
      update={updateServiceCategoryMapping}
      deleteFn={deleteServiceCategoryMapping}
      listRoute={ROUTES.ServiceCategoryMapping_List}
      createPermission={PERMISSIONS.CREATE_SERVICE_CATEGORY_MAPPING}
      updatePermission={PERMISSIONS.UPDATE_SERVICE_CATEGORY_MAPPING}
      deletePermission={PERMISSIONS.DELETE_SERVICE_CATEGORY_MAPPING}
    />
  );
};

export default ServiceCategoryMappingCategoryMappingFormPage;
