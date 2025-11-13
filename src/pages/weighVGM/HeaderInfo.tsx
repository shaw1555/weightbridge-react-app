import React, { useEffect, useState } from "react";
import SearchableDropdown from "../../components/SearchableDropdown";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";
import TextareaInput from "../../components/TextareaInput";
import Button from "../../components/Button";
import { SETUP_CATEGORIES } from "../../constants";
import { PERMISSIONS } from "../../constants";
import { AuthService } from "../../services/AuthService";
import type { Customer, Setup, WeighVGM } from "./types";

import { fetchCustomers, fetchSetups } from "./service";

type WeightBy = Setup;
type AcceptedBy = Setup;
type VGMVerifiedBy = Setup;
type ContainerType = Setup;
type TruckNo = Setup;

interface HeaderInfoProps {
  onSubmit: () => void;
  onDelete: () => void;
  weighVGMData: WeighVGM;
  setWeighVGMData: React.Dispatch<React.SetStateAction<WeighVGM>>;
  onClear: () => void;
  duplicateData: () => void;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({
  onSubmit,
  onDelete,
  weighVGMData,
  setWeighVGMData,
  onClear,
  duplicateData,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [weightBys, setWeightBys] = useState<WeightBy[]>([]);
  const [acceptedBys, setAcceptedBys] = useState<AcceptedBy[]>([]);
  const [approvedBys, setApprovedBys] = useState<VGMVerifiedBy[]>([]);
  const [containerSizeTypes, setContainerSizeTypes] = useState<ContainerType[]>(
    []
  );
  const [truckNos, setTruckNos] = useState<TruckNo[]>([]);

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

        const setups = await fetchSetups();

        setWeightBys(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.WEIGHT_BY)
        );
        setAcceptedBys(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.ACCEPTED_BY)
        );
        setApprovedBys(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.APPROVED_BY)
        );

        setContainerSizeTypes(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.CONTAINER_TYPE)
        );
        setTruckNos(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.TRUCK_NO)
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData(); // run only once
  }, []); // ✅ empty dependency array = fetch only on mount

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
  const handleChange = (field: keyof WeighVGM, value: any) => {
    setWeighVGMData((prev) => ({
      ...prev,
      [field]: value, // update only this field in parent state
    }));
  };

  // outside the JSX but inside your component
  const handleContainerNoChange = (val: string | null) => {
    const upperVal = val ? val.toUpperCase() : null; // convert to uppercase, allow null
    handleChange("container_no_f", upperVal);
  };

  const handleContainerTypeChange = (val: string | number | null) => {
    // Find the matching container type
    const selectedType = containerSizeTypes.find(
      (x) => x.description_f === val
    );

    // Safely read its description_f (if exists)
    const sizeType = selectedType?.description_f ?? null;
    handleChange("container_size_type_f", sizeType);
  };

  return (
    <div className="w-full p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Master Info</h2>

      <div className="grid grid-cols-4 gap-6">
        {/* Row 1 */}
        <SearchableDropdown
          label="Shipper Name"
          options={customers}
          value={weighVGMData.customer_id_f}
          onChange={(val) => handleChange("customer_id_f", val)}
          displayKey="customer_name_f"
          valueKey="customer_id_f"
          placeholder="Select a shipper"
          required
        />

        <DateInput
          label="Date"
          value={weighVGMData.date_f}
          onChange={(date) => handleChange("date_f", date)}
        />

        <TextInput
          label="Transaction No"
          value={weighVGMData.transaction_no_f}
          readOnly
          className={`${
            weighVGMData.transaction_no_f &&
            weighVGMData.transaction_no_f !== "Auto" &&
            weighVGMData.transaction_no_f !== ""
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        />

        <SearchableDropdown
          label="Weighing By"
          options={weightBys}
          value={weighVGMData.weight_by_f}
          onChange={(val) => handleChange("weight_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select weighing by"
          required
        />

        <TextInput
          label="VGM Reference"
          value={weighVGMData.vgm_reference_f}
          onChange={(val) => handleChange("vgm_reference_f", val)}
          placeholder="Enter VGM reference"
        />

        <TextInput
          label="Convoy Note"
          value={weighVGMData.convoy_note_f}
          onChange={(val) => handleChange("convoy_note_f", val)}
          placeholder="Enter convoy note"
        />

        <SearchableDropdown
          label="Container Type"
          options={containerSizeTypes}
          value={weighVGMData.container_size_type_f}
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
          value={weighVGMData.accepted_by_f}
          onChange={(val) => handleChange("accepted_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select accepted by"
        />

        <TextInput
          label="Vehicle No"
          value={weighVGMData.truck_no_f}
          onChange={(val) => handleChange("truck_no_f", val)}
          placeholder="Enter vehicle number"
          required
          uppercase
        />

        <TextInput
          label="Port of Loading"
          value={weighVGMData.port_of_loading_f}
          onChange={(val) => handleChange("port_of_loading_f", val)}
          placeholder="Enter port of loading"
        />

        <TextInput
          label="Container No"
          value={weighVGMData.container_no_f}
          onChange={handleContainerNoChange}
          placeholder="e.g., ABCD1234567"
          required
        />

        <SearchableDropdown
          label="VGM Verified By"
          options={approvedBys}
          value={weighVGMData.vgm_verified_by_f}
          onChange={(val) => handleChange("vgm_verified_by_f", val)}
          displayKey="description_f"
          valueKey="description_f"
          placeholder="Select VGM verified by"
        />

        <TextInput
          label="Booking No"
          value={weighVGMData.booking_no_f}
          onChange={(val) => handleChange("booking_no_f", val)}
          placeholder="Enter booking number"
        />

        <TextInput
          label="Vessel/Voy"
          value={weighVGMData.vessel_voy_f}
          onChange={(val) => handleChange("vessel_voy_f", val)}
          placeholder="Enter vessel/voy Name"
        />

        <TextInput
          label="Seal Number"
          value={weighVGMData.seal_number_f}
          onChange={(val) => handleChange("seal_number_f", val)}
          placeholder="Enter seal number"
        />

        {/* Full Width Remark */}
        <div className="col-span-4">
          <TextareaInput
            label="Remark"
            value={weighVGMData.remark_f}
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
          disabled={!weighVGMData.transaction_id_f}
          onClick={handleDuplicate}
        >
          Duplicate
        </Button>

        {(weighVGMData.transaction_id_f === 0 && canCreate) ||
        (weighVGMData.transaction_id_f !== 0 && canUpdate) ? (
          <Button color="green" onClick={onSubmit}>
            {weighVGMData.transaction_id_f !== 0 ? "Update" : "Save"}
          </Button>
        ) : null}

        {canDelete && (
          <Button
            disabled={!weighVGMData.transaction_id_f}
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
