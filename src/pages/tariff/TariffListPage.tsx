import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTariffs } from "./service"; // your API function
import { type Tariff } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const TariffListPage: React.FC = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTariffs().then(setTariffs);
  }, []);

  const columns: Column<Tariff>[] = [
    // { key: "tariff_id_f", label: "Tariff Id" }, // can remove, but it still work for save, update, delete//
    { key: "tariff_no_f", label: "Tariff No" },
    { key: "effective_date_f", label: "Effective Date", type: "date" },
    { key: "log_by_f", label: "Log By" },
    { key: "log_date_time_f", label: "Log Date & Time", type: "date", showTime: true },
  ];

  return (
    <EntityList
      title="Tariff"
      data={tariffs}
      columns={columns}
      idKey="tariff_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.Tariff_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.Tariff_Form())}
    />
  );
};

export default TariffListPage;
