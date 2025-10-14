import React from "react";
import { type User } from "./types";
import { fetchUserById, createUser, updateUser, deleteUser } from "./service";
import ROUTES from "../../routes";
import EntityForm, { type Field } from "../../components/EntityForm";

const UserFormPage: React.FC = () => {
  const fields: Field<User>[] = [
    {
      name: "user_name_f",
      label: "User Name",
      type: "text",
      required: true,
    },
    {
      name: "login_account_f",
      label: "Login Account",
      type: "text",
      required: true,
    },
    {
      name: "password_f",
      label: "Password",
      type: "text",
      // required: true, // no need for update // 
    },
  ];
  return (
    <EntityForm<User, "user_id_f">
      title="User"
      idField="user_id_f"
      fields={fields}
      fetchById={fetchUserById}
      create={createUser}
      update={updateUser}
      deleteFn={deleteUser}
      listRoute={ROUTES.User_List}
      createPermission="Create_User"
      updatePermission="Update_User"
      deletePermission="Delete_User"
    />
  );
};

export default UserFormPage;
