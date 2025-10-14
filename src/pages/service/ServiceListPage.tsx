import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "./service"; // your API function
import { type Service } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const ServiceListPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);

  const columns: Column<Service>[] = [
    // { key: "service_id_f", label: "Service Id" }, // can remove, but it still work for save, update, delete//
    { key: "service_f", label: "Service"  }, 
  ];

  return (
    <EntityList
      title="Service"
      data={services}
      columns={columns}
      idKey="service_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.Service_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.Service_Form())}
    />
  );
};

export default ServiceListPage;
