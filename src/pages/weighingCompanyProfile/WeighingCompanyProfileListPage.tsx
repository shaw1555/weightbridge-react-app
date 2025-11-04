import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWeighingCompanyProfiles } from "./service"; // your API function
import { type WeighingCompanyProfile } from "./types"; // your Product type
import ROUTES from "../../config/routes";
import { EntityList, type Column } from "../../components/EntityList";

const WeighingCompanyProfileListPage: React.FC = () => {
  const [weighingCompanyProfiles, setWeighingCompanyProfiles] = useState<
    WeighingCompanyProfile[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        fetchWeighingCompanyProfiles().then(setWeighingCompanyProfiles);
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

  const columns: Column<WeighingCompanyProfile>[] = [
    { key: "weighing_company_name_f", label: "Weighing Company Name",
        width: "200px",
     },
    {
      key: "weighing_company_authorization_number_f",
      label: "Weighing Company Authorization Number",
    },
    { key: "method_used_f", label: "Method Used" },
    { key: "signatory_company_name_f", label: "Signatory Company Name" },
    { key: "signatory_company_address_f", label: "Signatory Company Address" },
    { key: "email_f", label: "Email" },
    { key: "phone_number_f", label: "Phone Number" },
    { key: "log_by_f", label: "Log By" },
    {
      key: "log_date_time_f",
      label: "Log Date & Time",
      type: "date",
      width: "200px",
      showTime: true,
    },
  ];

  return (
    <EntityList
      title="Weighing Company Profile"
      data={weighingCompanyProfiles}
      columns={columns}
      idKey="profile_id_f" // 👈 tell which field is the PK
      onRowClick={(id) =>
        navigate(ROUTES.WeighingCompanyProfile_Form(String(id)))
      }
    />
  );
};

export default WeighingCompanyProfileListPage;
