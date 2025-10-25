import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTariffDetails } from "./service"; // your API function
import { type TariffDetail } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const TariffDetailListPage: React.FC = () => {
  const [tariffDetails, setTariffDetails] = useState<TariffDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        fetchTariffDetails().then(setTariffDetails);
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

  const columns: Column<TariffDetail>[] = [
    { key: "tariff_no_f", label: "Tariff No" },
    { key: "category_f", label: "Ctegory" },
    { key: "service_f", label: "Service" },
    { key: "truck_type_f", label: "Truck Type" },
    { key: "unit_price_f", label: "Unit Price", type: "number" },
    { key: "log_by_f", label: "Log By" },
    {
      key: "log_date_time_f",
      label: "Log Date & time",
      type: "date",
      width: "200px",
      showTime: true,
    },
  ];

  return (
    <EntityList
      title="Tariff Detail"
      data={tariffDetails}
      columns={columns}
      idKey="tariff_detail_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.TariffDetail_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.TariffDetail_Form())}
    />
  );
};

export default TariffDetailListPage;
