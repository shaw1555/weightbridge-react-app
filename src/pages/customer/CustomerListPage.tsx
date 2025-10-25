import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCustomers } from "./service"; // your API function
import { type Customer } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        fetchCustomers().then(setCustomers);
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

  const columns: Column<Customer>[] = [
    // { key: "customer_id_f", label: "Customer Id" }, // can remove, but it still work for save, update, delete//
    { key: "customer_code_f", label: "Customer Code" },
    { key: "customer_name_f", label: "Customer Name" },
    { key: "address_f", label: "Address" },
    { key: "phone_no_f", label: "Phone.No" },
    { key: "registration_number_f", label: "Registration.No" },
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
