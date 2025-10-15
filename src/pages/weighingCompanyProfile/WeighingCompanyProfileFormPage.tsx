import React from "react";
import { type WeighingCompanyProfile } from "./types";
import {
  fetchWeighingCompanyProfileById,
  createWeighingCompanyProfile,
  updateWeighingCompanyProfile,
  deleteWeighingCompanyProfile,
} from "./service";
import ROUTES from "../../routes";
import EntityForm, { type Field } from "../../components/EntityForm";

const WeighingCompanyProfileFormPage: React.FC = () => {
  const fields: Field<WeighingCompanyProfile>[] = [
    {
      name: "weighing_company_name_f",
      label: "Weighing Company Profile Name",
      type: "text",
      required: true,
    },
    {
      name: "weighing_company_authorization_number_f",
      label: "Weighing Company Authorization Number",
      type: "text",
    },
    {
      name: "method_used_f",
      label: "Method Used",
      type: "text",
    },
    {
      name: "signatory_company_name_f",
      label: "Signatory Company Name",
      type: "text",
    },
    {
      name: "signatory_company_address_f",
      label: "Signatory Company Address",
      type: "text",
    },
    {
      name: "email_f",
      label: "Email",
      type: "text",
    },
    {
      name: "phone_number_f",
      label: "Phone Number",
      type: "text",
    },
  ];
  return (
    <EntityForm<WeighingCompanyProfile, "profile_id_f">
      title="Weighing Company Profile"
      idField="profile_id_f"
      fields={fields}
      fetchById={fetchWeighingCompanyProfileById}
      create={createWeighingCompanyProfile}
      update={updateWeighingCompanyProfile}
      deleteFn={deleteWeighingCompanyProfile}
      listRoute={ROUTES.WeighingCompanyProfile_List}
      // createPermission="Create_WeighingCompanyProfile"
      updatePermission="Update_WeighingCompanyProfile"
      // deletePermission="Delete_WeighingCompanyProfile"
    />
  );
};

export default WeighingCompanyProfileFormPage;
