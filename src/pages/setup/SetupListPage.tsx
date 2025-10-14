import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSetups } from "./service"; // your API function
import { type Setup } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const SetupListPage: React.FC = () => {
  const [setups, setSetups] = useState<Setup[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSetups().then(setSetups);
  }, []);

  const columns: Column<Setup>[] = [
    // { key: "setup_id_f", label: "Setup Id" }, // can remove, but it still work for save, update, delete//
    { key: "category_f", label: "Category" },
    { key: "description_f", label: "Description" },
    { key: "note_f", label: "Note" },
    { key: "option1_f", label: "Option1" },
    { key: "is_default_f", label: "Default", type: "checkbox" },
    { key: "log_by_f", label: "Log By" },
    { key: "log_date_time_f", label: "Log Date & Time", type: "date", showTime: true },
  ];

  return (
    <EntityList
      title="Setup"
      data={setups}
      columns={columns}
      idKey="setup_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.Setup_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.Setup_Form())}
    />
  );
};

export default SetupListPage;
