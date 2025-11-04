import React, { useEffect, useState } from "react";
import type { Permission, User } from "./types";
import {
  fetchUsers,
  fetchPermissionFormNames,
  fetchPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
} from "./service";

import ROUTES from "../../config/routes";
import EntityForm, { type Field } from "../../components/EntityForm";
import { PERMISSIONS } from "../../constants";

const PermissionFormPage: React.FC = () => {
  const [permissionFormNames, setPermissionFormNames] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const names = await fetchPermissionFormNames();
        setPermissionFormNames(names);

        const users = await fetchUsers();
        setUsers(users);
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

  const fields: Field<Permission>[] = [
    {
      name: "user_id_f",
      label: "User Name",
      type: "select",
      required: true,
      options: users.map((user) => ({
        label: user.user_name_f,
        value: user.user_id_f,
      })),
    },
    {
      name: "form_name_f",
      label: "Form Name",
      type: "select",
      required: true,
      options: permissionFormNames.map((name) => ({
        label: name,
        value: name,
      })),
    },
    {
      name: "view_f",
      label: "View",
      type: "checkbox",
    },
    {
      name: "save_f",
      label: "Save",
      type: "checkbox",
    },
    {
      name: "update_f",
      label: "Update",
      type: "checkbox",
    },
    {
      name: "delete_f",
      label: "Delete",
      type: "checkbox",
    },
  ];
  return (
    <EntityForm<Permission, "permission_id_f">
      title="Permission"
      idField="permission_id_f"
      fields={fields}
      fetchById={fetchPermissionById}
      create={createPermission}
      update={updatePermission}
      deleteFn={deletePermission}
      listRoute={ROUTES.Permission_List}
      createPermission={PERMISSIONS.CREATE_PERMISSION}
      updatePermission={PERMISSIONS.UPDATE_PERMISSION}
      deletePermission={PERMISSIONS.DELETE_PERMISSION}
    />
  );
};

export default PermissionFormPage;
