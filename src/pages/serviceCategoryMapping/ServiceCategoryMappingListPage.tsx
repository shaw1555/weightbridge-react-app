import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServiceCategoryMappings } from "./service"; // your API function
import { type ServiceCategoryMapping } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const ServiceCategoryMappingListPage: React.FC = () => {
  const [serviceCategoryMappings, setServiceCategoryMappings] = useState<
    ServiceCategoryMapping[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        fetchServiceCategoryMappings().then(setServiceCategoryMappings);
      } catch (err) {
        setError("Failed to load service Category Mapping");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const columns: Column<ServiceCategoryMapping>[] = [
    { key: "service_f", label: "Service" },
    { key: "category_f", label: "Category" },
  ];

  return (
    <EntityList
      title="Service Category Mapping"
      data={serviceCategoryMappings}
      columns={columns}
      idKey="service_category_mapping_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.ServiceCategoryMapping_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.ServiceCategoryMapping_Form())}
    />
  );
};

export default ServiceCategoryMappingListPage;
