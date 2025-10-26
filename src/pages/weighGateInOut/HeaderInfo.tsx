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
  WeighGateInOut,
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
  weighGateInOutData: WeighGateInOut;
  setWeighGateInOutData: React.Dispatch<React.SetStateAction<WeighGateInOut>>;
  onClear: () => void;
  duplicateData: () => void;
  tariff?: Tariff;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({
  onSave,
  weighGateInOutData,
  setWeighGateInOutData,
  onClear,
  duplicateData,
  tariff,
}) => {
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
    onClear();
  };

  // Duplicate handler
  const handleDuplicate = () => {
    duplicateData();
  };

  // Generic change handler
  const handleChange = (field: keyof WeighGateInOut, value: any) => {
    setWeighGateInOutData((prev) => ({
      ...prev,
      [field]: value, // update only this field in parent state
    }));
  };

  const handleSubmit = () => {
    // Call the onSave callback
    onSave(weighGateInOutData);
  };

  return (
    <div className="w-full p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Master Info</h2>

      <div className="grid grid-cols-4 gap-6">
        {/* Row 1 */}
        <DateInput
          label="Date"
          value={weighGateInOutData.date_f}
          onChange={(date) => handleChange("date_f", date)}
        />

        <TextInput label="Tariff No" value={tariff?.tariff_no_f} readOnly />

        <SearchableDropdown
          label="Truck Type"
          options={truckTypes}
          value={weighGateInOutData.truck_type_id_f}
          onChange={(val) => handleChange("truck_type_id_f", val)}
          displayKey="truck_type_f"
          valueKey="truck_type_id_f"
          placeholder="Select a truck type"
        />

        <TextInput
          label="Vessel"
          value={weighGateInOutData.vessel_f}
          onChange={(val) => handleChange("vessel_f", val)}
          placeholder="Enter vessel name"
        />

        {/* Row 2 */}
        <TextInput
          label="Transaction No"
          value={weighGateInOutData.transaction_no_f}
          readOnly
        />

        <SearchableDropdown
          label="Arrange By"
          options={arrangeBys}
          value={weighGateInOutData.truck_arrange_by_f}
          onChange={(val) => handleChange("truck_arrange_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select arrangement"
        />

        <FreeTextDropdown
          label="Truck No"
          options={truckNos}
          value={weighGateInOutData.truck_no_f}
          onChange={(val) => handleChange("truck_no_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select or type truck number"
        />

        <TextInput
          label="Voy"
          value={weighGateInOutData.voy_f}
          onChange={(val) => handleChange("voy_f", val)}
          placeholder="Enter voyage number"
        />
        {/* Row 3 */}
        <SearchableDropdown
          label="Customer Name"
          options={customers}
          value={weighGateInOutData.customer_id_f}
          onChange={(val) => handleChange("customer_id_f", val)}
          displayKey="customer_name_f"
          valueKey="customer_id_f"
          placeholder="Select a customer"
        />

        <SearchableDropdown
          label="Service"
          options={services}
          value={weighGateInOutData.service_id_f}
          onChange={(val) => handleChange("service_id_f", val)}
          displayKey="service_f"
          valueKey="service_id_f"
          placeholder="Select a service"
        />

        <SearchableDropdown
          label="Container Type"
          options={containerSizeTypes}
          value={weighGateInOutData.container_size_type_f}
          onChange={(val) => handleChange("container_size_type_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a container type"
        />

        <SearchableDropdown
          label="Accepted By"
          options={acceptedBys}
          value={weighGateInOutData.accepted_by_f}
          onChange={(val) => handleChange("accepted_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select accepted by"
        />

        {/* Row 4 */}
        <SearchableDropdown
          label="Location"
          options={locations}
          value={weighGateInOutData.location_f}
          onChange={(val) => handleChange("location_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a location"
        />

        <SearchableDropdown
          label="Category"
          options={categorys}
          value={weighGateInOutData.category_id_f}
          onChange={(val) => handleChange("category_id_f", val)}
          displayKey="category_f"
          valueKey="category_id_f"
          placeholder="Select a category"
        />

        <TextInput
          label="Container No"
          value={weighGateInOutData.container_no_f}
          onChange={(val) => {
            const upperVal = val.toUpperCase(); // ✅ convert to uppercase
            handleChange("container_no_f", upperVal);
          }}
          placeholder="(e.g., ABCD1234567 or ABCD1234567, EFGH7654321)"
        />

        <SearchableDropdown
          label="Approved By"
          options={approvedBys}
          value={weighGateInOutData.approved_by_f}
          onChange={(val) => handleChange("approved_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select approved by"
        />

        {/* Row 5 */}
        <SearchableDropdown
          label="Job Department"
          options={jobDepartments}
          value={weighGateInOutData.job_department_f}
          onChange={(val) => handleChange("job_department_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a job department"
        />

        <SearchableDropdown
          label="Product"
          options={products}
          value={weighGateInOutData.product_f}
          onChange={(val) => handleChange("product_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a product"
        />

        <TextInput
          label="B/L No"
          value={weighGateInOutData.bl_no_f}
          onChange={(val) => handleChange("bl_no_f", val)}
          placeholder="Enter B/L number"
        />

        <TextInput
          label="Received By"
          value={weighGateInOutData.received_by_f}
          onChange={(val) => handleChange("received_by_f", val)}
          placeholder="Enter receiver name"
        />

        {/* Full Width Remark */}
        <div className="col-span-4">
          <TextareaInput
            label="Remark"
            value={weighGateInOutData.remark_f}
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
        <Button onClick={handleDuplicate}>Duplicate</Button>
        <Button
          disabled={weighGateInOutData.transaction_id_f !== 0}
          color="green"
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button disabled={!weighGateInOutData.transaction_id_f} color="red">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default HeaderInfo;
