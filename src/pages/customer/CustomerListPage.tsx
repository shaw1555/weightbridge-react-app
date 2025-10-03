import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCustomers } from "./service"; // your API function
import { type Customer } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);

  const columns: Column<Customer>[] = [
    { key: "customer_id_f", label: "Customer Id" },
    { key: "customer_code_f", label: "Customer Code" },
    { key: "customer_name_f", label: "Customer Name" },
    { key: "address_f", label: "Address" },
    { key: "phone_no_f", label: "Phone.No" },
    { key: "registration_number_f", label: "Registration.No" },
    { key: "log_by_f", label: "Log By" },
    { key: "log_date_time_f", label: "Log Date & Time" },
  ];

  return (
    <EntityList
      title="Customer"
      data={customers}
      columns={columns}
      idKey="customer_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.Customer_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.Customer_Form())}
    />
  );
};

export default CustomerListPage;
