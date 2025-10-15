import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWeighingCompanyProfiles } from "./service"; // your API function
import { type WeighingCompanyProfile } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const WeighingCompanyProfileListPage: React.FC = () => {
  const [weighingCompanyProfiles, setWeighingCompanyProfiles] = useState<
    WeighingCompanyProfile[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeighingCompanyProfiles().then(setWeighingCompanyProfiles);
  }, []);

  const columns: Column<WeighingCompanyProfile>[] = [
    { key: "weighing_company_name_f", label: "Weighing Company Name" },
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
