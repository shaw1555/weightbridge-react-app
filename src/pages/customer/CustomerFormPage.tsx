import React from "react";
import { type Customer } from "./types";
import {
  fetchCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "./service";
import ROUTES from "../../routes";
import EntityForm, { type Field } from "../../components/EntityForm";

const CustomerFormPage: React.FC = () => {
  const fields: Field<Customer>[] = [
    {
      name: "customer_code_f",
      label: "Customer Code",
      type: "text",
    },
    {
      name: "customer_name_f",
      label: "Customer Name",
      type: "text",
      required: true,
    },
    {
      name: "address_f",
      label: "Address",
      type: "text",
    },
    {
      name: "phone_no_f",
      label: "Phone.No",
      type: "text",
    },
    {
      name: "registration_number_f",
      label: "Registration.No",
      type: "text",
    },
  ];
  return (
    <EntityForm<Customer, "customer_id_f">
      title="Customer"
      idField="customer_id_f"
      fields={fields}
      fetchById={fetchCustomerById}
      create={createCustomer}
      update={updateCustomer}
      deleteFn={deleteCustomer}
      listRoute={ROUTES.Customer_List}
      createPermission="Create_Customer"
      updatePermission="Update_Customer"
      deletePermission="Delete_Customer"
    />
  );
};

export default CustomerFormPage;
