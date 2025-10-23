import React, { useEffect, useState } from "react";
import SearchableDropdown from "../../components/SearchableDropdown";
import FreeTextDropdown from "../../components/FreeTextDropdown";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";
import TextareaInput from "../../components/TextareaInput";
import Button from "../../components/Button";

import type {
  Customer,
  Tariff,
  Setup,
  Service,
  Category,
  TruckType,
} from "./types";

import {
  fetchCustomers,
  fetchServices,
  fetchCategories,
  fetchTruckTypes,
  fetchSetups,
} from "./service";

type Location = Setup;
type JobDepartment = Setup;
type ArrangeBy = Setup;
type AcceptedBy = Setup;
type ApprovedBy = Setup;
type Product = Setup;
type ContainerType = Setup;
type TruckNo = Setup;

interface HeaderInfoProps {
  onSave: (data: any) => void;
  disabled: boolean;
  tariff?: Tariff;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({
  onSave,
  disabled,
  tariff,
}) => {
  const initialForm = {
    date_f: "",
    transaction_no_f: "Auto",
    customer_id_f: null as number | null,
    location_f: null as string | null,
    job_department_f: null as string | null,
    remark_f: "",
    tariff_detail_id_f: "",
    truck_arrange_by_f: null as string | null,
    service_id_f: null as number | null,
    category_id_f: null as number | null,
    truck_type_id_f: null as number | null,
    product_f: null as string | null,

    truck_no_f: "", // FreeTextDropdown can store string
    container_size_type_f: null as string | null,
    container_no_f: "",
    vessel_f: "",
    voy_f: "",
    bl_no_f: "",
    accepted_by_f: null as string | null,
    approved_by_f: null as string | null,
    received_by_f: "",
  };

  const [form, setForm] = useState(initialForm);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [truckTypes, setTruckTypes] = useState<TruckType[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [jobDepartments, setJobDepartments] = useState<JobDepartment[]>([]);
  const [arrangeBys, setArrangeBys] = useState<ArrangeBy[]>([]);
  const [acceptedBys, setAcceptedBys] = useState<AcceptedBy[]>([]);
  const [approvedBys, setApprovedBys] = useState<ApprovedBy[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [containerSizeTypes, setContainerSizeTypes] = useState<ContainerType[]>(
    []
  );
  const [truckNos, setTruckNos] = useState<TruckNo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const customers = await fetchCustomers();
        setCustomers(customers);

        const services = await fetchServices();
        setServices(services);

        const categorys = await fetchCategories();
        setCategorys(categorys);

        const truckTypes = await fetchTruckTypes();
        setTruckTypes(truckTypes);

        const setups = await fetchSetups();
        setLocations(setups.filter((x) => x.category_f === "Location"));
        setJobDepartments(
          setups.filter((x) => x.category_f === "JobDeparment")
        );
        setArrangeBys(setups.filter((x) => x.category_f === "ArrangeBy"));
        setAcceptedBys(setups.filter((x) => x.category_f === "AcceptedBy"));
        setApprovedBys(setups.filter((x) => x.category_f === "ApprovedBy"));
        setProducts(setups.filter((x) => x.category_f === "Product"));
        setContainerSizeTypes(
          setups.filter((x) => x.category_f === "ContainerType")
        );
        setTruckNos(setups.filter((x) => x.category_f === "TruckNo"));
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Reset handler
  const handleReset = () => {
    setForm(initialForm);
  };

  // Generic change handler
  const handleChange = (field: keyof typeof form, value: any) => {
    console.log("value ", value);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Show all form values in an alert
    alert(JSON.stringify(form, null, 2));

    // Call the onSave callback
    onSave(form);
  };

  return (
    <div className="w-full p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Master Info</h2>

      <div className="grid grid-cols-4 gap-6">
        {/* Row 1 */}
        <DateInput
          label="Date"
          value={form.date_f}
          onChange={(date) => handleChange("date_f", date)}
        />

        <TextInput label="Tariff No" value={tariff?.tariff_no_f} readOnly />

        <SearchableDropdown
          label="Truck Type"
          options={truckTypes}
          value={form.truck_type_id_f}
          onChange={(val) => handleChange("truck_type_id_f", val)}
          displayKey="truck_type_f"
          valueKey="truck_type_id_f"
          placeholder="Select a truck type"
        />

        <TextInput
          label="B/L No"
          value={form.bl_no_f}
          onChange={(val) => handleChange("bl_no_f", val)}
          placeholder="Enter B/L number"
        />

        {/* Row 2 */}
        <TextInput
          label="Transaction No"
          value={form.transaction_no_f}
          readOnly
        />

        <SearchableDropdown
          label="Arrange By"
          options={arrangeBys}
          value={form.truck_arrange_by_f}
          onChange={(val) => handleChange("truck_arrange_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select arrangement"
        />

        <FreeTextDropdown
          label="Truck No"
          options={truckNos}
          value={form.truck_no_f}
          onChange={(val) => handleChange("truck_no_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select or type truck number"
        />

        <SearchableDropdown
          label="Accepted By"
          options={acceptedBys}
          value={form.accepted_by_f}
          onChange={(val) => handleChange("accepted_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select accepted by"
        />

        {/* Row 3 */}
        <SearchableDropdown
          label="Customer Name"
          options={customers}
          value={form.customer_id_f}
          onChange={(val) => handleChange("customer_id_f", val)}
          displayKey="customer_name_f"
          valueKey="customer_id_f"
          placeholder="Select a customer"
        />

        <SearchableDropdown
          label="Service"
          options={services}
          value={form.service_id_f}
          onChange={(val) => handleChange("service_id_f", val)}
          displayKey="service_f"
          valueKey="service_id_f"
          placeholder="Select a service"
        />

        <SearchableDropdown
          label="Container Type"
          options={containerSizeTypes}
          value={form.container_size_type_f}
          onChange={(val) => handleChange("container_size_type_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a container type"
        />

        <SearchableDropdown
          label="Approved By"
          options={approvedBys}
          value={form.approved_by_f}
          onChange={(val) => handleChange("approved_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select approved by"
        />

        {/* Row 4 */}
        <SearchableDropdown
          label="Location"
          options={locations}
          value={form.location_f}
          onChange={(val) => handleChange("location_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a location"
        />

        <SearchableDropdown
          label="Category"
          options={categorys}
          value={form.category_id_f}
          onChange={(val) => handleChange("category_id_f", val)}
          displayKey="category_f"
          valueKey="category_id_f"
          placeholder="Select a category"
        />

        <TextInput
          label="Container No"
          value={form.container_no_f}
          onChange={(val) => handleChange("container_no_f", val)}
          placeholder="Enter Container No"
        />

        <TextInput
          label="Received By"
          value={form.received_by_f}
          onChange={(val) => handleChange("received_by_f", val)}
          placeholder="Enter receiver name"
        />

        {/* Row 5 */}
        <SearchableDropdown
          label="Job Department"
          options={jobDepartments}
          value={form.job_department_f}
          onChange={(val) => handleChange("job_department_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a job department"
        />

        <SearchableDropdown
          label="Product"
          options={products}
          value={form.product_f}
          onChange={(val) => handleChange("product_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a product"
        />

        <TextInput
          label="Vessel"
          value={form.vessel_f}
          onChange={(val) => handleChange("vessel_f", val)}
          placeholder="Enter vessel name"
        />

        <TextInput
          label="Voy"
          value={form.voy_f}
          onChange={(val) => handleChange("voy_f", val)}
          placeholder="Enter voyage number"
        />

        {/* Full Width Remark */}
        <div className="col-span-4">
          <TextareaInput
            label="Remark"
            value={form.remark_f}
            onChange={(val) => handleChange("remark_f", val)}
            placeholder="Enter remarks"
            rows={2}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-3">
        <Button color="gray" onClick={handleReset}>
          New
        </Button>
        <Button>Duplicate</Button>
        <Button color="green" onClick={handleSubmit}>
          Save
        </Button>
        <Button color="red">Delete</Button>
      </div>
    </div>
  );
};

export default HeaderInfo;
