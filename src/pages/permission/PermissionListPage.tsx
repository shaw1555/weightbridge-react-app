import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPermissions } from "./service"; // your API function
import { type Permission } from "./types"; // your Product type
import ROUTES from "../../config/routes";
import { EntityList, type Column } from "../../components/EntityList";

const PermissionListPage: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        fetchPermissions().then(setPermissions);
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

  const columns: Column<Permission>[] = [
    { key: "user_name_f", label: "User Name" },
    { key: "form_name_f", label: "Form Name" },
    { key: "view_f", label: "View", type: "checkbox" },
    { key: "save_f", label: "Save", type: "checkbox" },
    { key: "update_f", label: "Update", type: "checkbox" },
    { key: "delete_f", label: "Delete", type: "checkbox" },
    { key: "modified_by_f", label: "Modified By" },
    {
      key: "modified_on_f",
      label: "Modified On",
      type: "date",
      width: "200px",
      showTime: true,
    },
  ];

  return (
    <EntityList
      title="Permission"
      data={permissions}
      columns={columns}
      idKey="permission_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.Permission_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.Permission_Form())}
    />
  );
};

export default PermissionListPage;
