import React, { useEffect, useState } from "react";
import SearchableDropdown from "../../components/SearchableDropdown";
import FreeTextDropdown from "../../components/FreeTextDropdown";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";
import TextareaInput from "../../components/TextareaInput";
import Button from "../../components/Button";
import { SETUP_CATEGORIES } from "../../constants";
import { PERMISSIONS } from "../../constants";
import { AuthService } from "../../services/AuthService";
import type {
  Customer,
  ActiveTariff,
  Setup,
  Service,
  Category,
  TruckType,
  WeighGateInOut,
  ServiceCategoryMapping,
} from "./types";

import {
  fetchCustomers,
  fetchServices,
  fetchCategories,
  fetchTruckTypes,
  fetchSetups,
  fetchServiceCategoryMappings,
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
  onSubmit: () => void;
  onDelete: () => void;
  weighGateInOutData: WeighGateInOut;
  setWeighGateInOutData: React.Dispatch<React.SetStateAction<WeighGateInOut>>;
  onClear: () => void;
  duplicateData: () => void;
  activeTariff?: ActiveTariff;
  updateGateChargeAmount: (data: WeighGateInOut) => void;
  updateWeightChargeAmount: (data: WeighGateInOut) => void;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({
  onSubmit,
  onDelete,
  weighGateInOutData,
  setWeighGateInOutData,
  onClear,
  duplicateData,
  activeTariff,
  updateGateChargeAmount,
  updateWeightChargeAmount,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
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
  const [serviceCategoryMappings, setServiceCategoryMappings] = useState<
    ServiceCategoryMapping[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canCreate = AuthService.hasPermission(
    PERMISSIONS.CREATE_WEIGH_GATE_IN_OUT
  );
  const canUpdate = AuthService.hasPermission(
    PERMISSIONS.UPDATE_WEIGH_GATE_IN_OUT
  );
  const canDelete = AuthService.hasPermission(
    PERMISSIONS.DELETE_WEIGH_GATE_IN_OUT
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const customers = await fetchCustomers();
        setCustomers(customers);

        const services = await fetchServices();
        setServices(services);

        const categorys = await fetchCategories();
        setCategorys(categorys);

        const truckTypes = await fetchTruckTypes();
        setTruckTypes(truckTypes);

        const setups = await fetchSetups();
        setLocations(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.LOCATION)
        );
        setJobDepartments(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.JOB_DEPARTMENT)
        );
        setArrangeBys(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.ARRANGE_BY)
        );
        setAcceptedBys(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.ACCEPTED_BY)
        );
        setApprovedBys(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.APPROVED_BY)
        );
        setProducts(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.PRODUCT)
        );
        setContainerSizeTypes(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.CONTAINER_TYPE)
        );
        setTruckNos(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.TRUCK_NO)
        );

        // ✅ await mapping fetch
        const serviceCategoryMappings = await fetchServiceCategoryMappings();
        setServiceCategoryMappings(serviceCategoryMappings);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData(); // run only once
  }, []); // ✅ empty dependency array = fetch only on mount

  // ✅ Filter categories automatically when service changes
  useEffect(() => {
    if (!weighGateInOutData.service_id_f) {
      setFilteredCategories([]);
      return;
    }

    const catIds = serviceCategoryMappings
      .filter((x) => x.service_id_f === weighGateInOutData.service_id_f)
      .map((x) => x.category_id_f);

    const filtered = categorys.filter((x) => catIds.includes(x.category_id_f));
    setFilteredCategories(filtered);
  }, [weighGateInOutData.service_id_f, serviceCategoryMappings, categorys]);

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

  const handleCategoryIdChange = (val: string | number | null) => {
    handleChange("category_id_f", val);
    updateGateChargeAmount({
      ...weighGateInOutData,
      category_id_f: Number(val),
    });
  };

  const handleServiceIdChange = (val: string | number | null) => {
    handleChange("service_id_f", val);
    updateGateChargeAmount({
      ...weighGateInOutData,
      service_id_f: Number(val),
    });
  };

  const handleTruckTypeIdChange = (val: string | number | null) => {
    handleChange("truck_type_id_f", val);
    updateGateChargeAmount({
      ...weighGateInOutData,
      truck_type_id_f: Number(val),
    });
  };

  // outside the JSX but inside your component
  const handleContainerNoChange = (val: string | null) => {
    const upperVal = val ? val.toUpperCase() : null; // convert to uppercase, allow null
    handleChange("container_no_f", upperVal);

    // Count containers (split by comma, trim spaces, ignore empty)
    const count = upperVal
      ? upperVal
          .split(",")
          .map((x) => x.trim())
          .filter((x) => x !== "").length
      : 0;

    handleChange("no_of_container_f", count);

    updateWeightChargeAmount({
      ...weighGateInOutData,
      container_no_f: upperVal?.toString() ?? "",
      no_of_container_f: count,
    });
  };

  const handleContainerTypeChange = (val: string | number | null) => {
    // Find the matching container type
    const selectedType = containerSizeTypes.find(
      (x) => x.description_f === val
    );

    // Safely read its description_f (if exists)
    const sizeType = selectedType?.description_f ?? null;
    handleChange("container_size_type_f", sizeType);

    // Safely read its option_1_f (unit price)
    const weightUnitPrice: number = Number(selectedType?.option1_f ?? 0);
    handleChange("weight_charge_unitprice_f", weightUnitPrice);

    updateWeightChargeAmount({
      ...weighGateInOutData,
      container_size_type_f: sizeType?.toString() ?? "",
      weight_charge_unitprice_f: weightUnitPrice,
    });
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

        <TextInput
          label="Tariff No"
          value={activeTariff?.tariff_t.tariff_no_f}
          readOnly
        />

        <SearchableDropdown
          label="Truck Type"
          options={truckTypes}
          value={weighGateInOutData.truck_type_id_f}
          onChange={handleTruckTypeIdChange}
          displayKey="truck_type_f"
          valueKey="truck_type_id_f"
          placeholder="Select a truck type"
          required
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
          className={`${
            weighGateInOutData.transaction_no_f &&
            weighGateInOutData.transaction_no_f !== "Auto" &&
            weighGateInOutData.transaction_no_f !== ""
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        />
        <SearchableDropdown
          label="Arrange By"
          options={arrangeBys}
          value={weighGateInOutData.truck_arrange_by_f}
          onChange={(val) => handleChange("truck_arrange_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select arrangement"
          required
        />

        <FreeTextDropdown
          label="Truck No"
          options={truckNos}
          value={weighGateInOutData.truck_no_f}
          onChange={(val) => handleChange("truck_no_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select or type truck number"
          required
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
          required
        />

        <SearchableDropdown
          label="Service"
          options={services}
          value={weighGateInOutData.service_id_f}
          onChange={handleServiceIdChange}
          displayKey="service_f"
          valueKey="service_id_f"
          placeholder="Select a service"
          required
        />

        <SearchableDropdown
          label="Container Type"
          options={containerSizeTypes}
          value={weighGateInOutData.container_size_type_f}
          onChange={handleContainerTypeChange}
          displayKey="description_f"
          //due to value is bind as string -> value={weighGateInOutData.container_size_type_f}
          //send to api wit description_f directly //
          valueKey="description_f" // cannot apply with setup_id_f
          placeholder="Select a container type"
          required
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
          required
          disabled={true}
        />

        <SearchableDropdown
          label="Category"
          options={filteredCategories}
          value={weighGateInOutData.category_id_f}
          onChange={handleCategoryIdChange}
          displayKey="category_f"
          valueKey="category_id_f"
          placeholder="Select a category"
          required
        />

        <TextInput
          label="Container No"
          value={weighGateInOutData.container_no_f}
          onChange={handleContainerNoChange}
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
          required
        />

        <SearchableDropdown
          label="Product"
          options={products}
          value={weighGateInOutData.product_f}
          onChange={(val) => handleChange("product_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select a product"
          required
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
        <Button
          disabled={!weighGateInOutData.transaction_id_f}
          onClick={handleDuplicate}
        >
          Duplicate
        </Button>

        {(weighGateInOutData.transaction_id_f === 0 && canCreate) ||
        (weighGateInOutData.transaction_id_f !== 0 && canUpdate) ? (
          <Button color="green" onClick={onSubmit}>
            {weighGateInOutData.transaction_id_f !== 0 ? "Update" : "Save"}
          </Button>
        ) : null}

        {canDelete && (
          <Button
            disabled={!weighGateInOutData.transaction_id_f}
            color="red"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderInfo;
