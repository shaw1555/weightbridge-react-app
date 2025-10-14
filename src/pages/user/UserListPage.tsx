import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "./service"; // your API function
import { type User } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const columns: Column<User>[] = [
    // { key: "user_id_f", label: "User Id" }, // can remove, but it still work for save, update, delete//
    { key: "user_name_f", label: "User Name" },
    { key: "login_account_f", label: "Login Account" },
    // { key: "password_f", label: "Password" },
    { key: "created_by_f", label: "Created By" },
    { key: "created_on_f", label: "Created On", type: "date", showTime: true },
    { key: "modified_by_f", label: "Modified By" },
    {
      key: "modified_on_f",
      label: "Modified On",
      type: "date",
      showTime: true,
    },
  ];

  return (
    <EntityList
      title="User"
      data={users}
      columns={columns}
      idKey="user_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.User_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.User_Form())}
    />
  );
};

export default UserListPage;
