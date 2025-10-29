import React, { useEffect, useState } from "react";
import SearchableDropdown from "../../components/SearchableDropdown";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import RadioGroup from "../../components/RadioGroup";

import type { Setup, WeighGateInOut } from "./types";

import { fetchSetups } from "./service";

type WeightUOM = Setup;
type GateUOM = Setup;
type PaymentType = Setup;

interface DetailInfoProps {
  onSubmit: () => void;
  weighGateInOutData: WeighGateInOut;
  setWeighGateInOutData: React.Dispatch<React.SetStateAction<WeighGateInOut>>;
}

const optionStatus = [
  { label: "In", value: "in" },
  { label: "Out", value: "out" },
];

const optionInfo = [
  { label: "Truck Only", value: "truck" },
  { label: "Empty Container", value: "empty" },
  { label: "Laden Container", value: "laden" },
  { label: "General Cargo", value: "cargo" },
];

const DetailInfo: React.FC<DetailInfoProps> = ({
  onSubmit,
  weighGateInOutData,
  setWeighGateInOutData,
}) => {
  const [weightUOMs, setWeightUOMs] = useState<WeightUOM[]>([]);
  const [gateUOMs, setGateUOMs] = useState<GateUOM[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const setups = await fetchSetups();
        setWeightUOMs(setups.filter((x) => x.category_f === "WeightUOM"));
        setGateUOMs(setups.filter((x) => x.category_f === "GateUOM"));
        setPaymentTypes(setups.filter((x) => x.category_f === "PaymentType"));
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

  // Generic change handler
  const handleChange = (field: keyof typeof weighGateInOutData, value: any) => {
    setWeighGateInOutData((prev) => ({ ...prev, [field]: value }));
  };

  
  return (
    <div className="w-full p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Weight Info</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 space-y-4">
          <SearchableDropdown
            label="UOM"
            options={weightUOMs}
            value={weighGateInOutData.weight_charge_uom_f}
            onChange={(val) => handleChange("weight_charge_uom_f", val)}
            displayKey="description_f"
            valueKey="setup_id_f"
            placeholder="Select a UOM"
          />
          <TextInput
            label="No. Container"
            type="number"
            value={weighGateInOutData.no_of_container_f}
            readOnly
          />

          <TextInput
            label="Unit Charge"
            type="number"
            value={weighGateInOutData.weight_charge_unitprice_f}
            readOnly
          />
          <TextInput
            label="Amount"
            type="number"
            value={weighGateInOutData.weight_charge_amount_f}
            readOnly
          />
          <Checkbox
            label="FOC"
            checked={weighGateInOutData.is_weight_foc_f}
            onChange={(val) => handleChange("is_weight_foc_f", val)}
          />
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <TextInput
            label="Date & Time (In)"
            type="number"
            value={weighGateInOutData.date_time_in_f}
            readOnly
          />
          <TextInput
            label="Date & Time (Out)"
            type="number"
            value={weighGateInOutData.date_time_out_f}
            readOnly
          />
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <TextInput
            label="(Truck + Cargo) Weight"
            type="number"
            value={weighGateInOutData.truck_cargo_weight_f}
            onChange={(val) => handleChange("truck_cargo_weight_f", val)}
          />
          <TextInput
            label="Truck/Empty Weight"
            type="number"
            value={weighGateInOutData.truck_weight_f}
            onChange={(val) => handleChange("truck_weight_f", val)}
          />
          <TextInput
            label="Net Weight"
            type="number"
            value={weighGateInOutData.net_weight_f}
            readOnly
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4 mt-6 border-b pb-2">
        Gate In / Out
      </h2>

      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-2 border rounded-lg p-4 space-y-4">
          <SearchableDropdown
            label="UOM"
            options={gateUOMs}
            value={weighGateInOutData.gate_charge_uom_f}
            onChange={(val) => handleChange("gate_charge_uom_f", val)}
            displayKey="description_f"
            valueKey="setup_id_f"
            placeholder="Select a UOM"
          />
          <SearchableDropdown
            label="Payment Type"
            options={paymentTypes}
            value={weighGateInOutData.payment_type_f}
            onChange={(val) => handleChange("payment_type_f", val)}
            displayKey="description_f"
            valueKey="setup_id_f"
            placeholder="Select a Payment Type"
          />
          <TextInput
            label="Amount"
            type="number"
            value={weighGateInOutData.gate_charge_amount_f}
            readOnly
          />
          <Checkbox
            label="FOC"
            checked={weighGateInOutData.is_gate_foc_f}
            onChange={(val) => handleChange("is_gate_foc_f", val)}
          />
        </div>
        <div className="col-span-1">
          <RadioGroup
            label="Status"
            name="status"
            options={optionStatus}
            value={weighGateInOutData.gateInOutStatus}
            onChange={(val) => handleChange("gateInOutStatus", val)}
            direction="horizontal"
            layout="grid"
          />
        </div>
        <div className="col-span-3">
          <RadioGroup
            label="Info"
            name="info"
            options={optionInfo}
            value={weighGateInOutData.gateInOutTruckInfo}
            onChange={(val) => handleChange("gateInOutTruckInfo", val)}
            direction="horizontal"
            layout="grid"
            columns={4} // 4 columns → 4x1 layout
          />
          <br></br>
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5">
              <DateInput
                label="Date Time"
                value={weighGateInOutData.gateInOutTruckDateTime}
                onChange={(date) =>
                  handleChange("gateInOutTruckDateTime", date)
                }
                auto={true}
                includeTime
              />
            </div>
            <div className="col-span-7">
              <TextInput
                label="Weight Value"
                type="number"
                value={weighGateInOutData.gateInOutTruckWeighValue}
                onChange={(val) =>
                  handleChange("gateInOutTruckWeighValue", val)
                }
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4 mt-6 border-b pb-2">
        Final Amount
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 border rounded-lg p-4 space-y-4">
          <TextInput
            label="Sub Total"
            type="number"
            value={weighGateInOutData.sub_total_amount_f}
            readOnly
          />
          <TextInput
            label="Commercial Tax 5%"
            type="number"
            value={weighGateInOutData.commerical_tax_amount_f}
            readOnly
          />
          <TextInput
            label="Grand Total"
            type="number"
            value={weighGateInOutData.grand_total_amount_f}
            readOnly
          />
        </div>
        {/* <div className="col-span-1 "> </div> */}
        <div className="col-span-2 self-end justify-self-end">
          {/* Buttons */}
          <div className="flex justify-end mt-6 gap-3">
            <div className="border rounded-xl p-4 relative">
              <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold"></span>
              <div className="flex gap-3">
                <Button
                  disabled={!weighGateInOutData.transaction_id_f}
                  color="green"
                  onClick={onSubmit}
                >
                  Update Weight and Gate Info
                </Button>
              </div>
            </div>

            <div className="border rounded-xl p-4 relative">
              <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold">
                Print Preview
              </span>

              <div className="flex gap-3">
                <Button disabled={!weighGateInOutData.transaction_id_f}>
                  Receipt / Invoice
                </Button>
                <Button disabled={!weighGateInOutData.transaction_id_f}>
                  Weight Slip
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
