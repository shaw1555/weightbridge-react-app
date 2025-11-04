import React, { useEffect, useState } from "react";
import SearchableDropdown from "../../components/SearchableDropdown";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import RadioGroup from "../../components/RadioGroup";
import { SETUP_CATEGORIES } from "../../constants";
import type {
  Setup,
  WeighGateInOut,
  GateInOutInfo,
  GateInOutStatus,
} from "./types";

import {
  fetchSetups,
  fetchGateInOutInfos,
  fetchGateInOutStatus,
} from "./service";

type WeightUOM = Setup;
type GateUOM = Setup;
type PaymentType = Setup;

interface DetailInfoProps {
  onSubmit: () => void;
  weighGateInOutData: WeighGateInOut;
  setWeighGateInOutData: React.Dispatch<React.SetStateAction<WeighGateInOut>>;
  updateGateChargeAmount: (data: WeighGateInOut) => void;
  updateWeightChargeAmount: (data: WeighGateInOut) => void;
}

const DetailInfo: React.FC<DetailInfoProps> = ({
  onSubmit,
  weighGateInOutData,
  setWeighGateInOutData,
  updateGateChargeAmount,
  updateWeightChargeAmount,
}) => {
  const [weightUOMs, setWeightUOMs] = useState<WeightUOM[]>([]);
  const [gateInOutInfos, setGateInOutInfos] = useState<GateInOutInfo[]>([]);
  const [gateInOutStatuss, setGateInOutStatuss] = useState<GateInOutStatus[]>(
    []
  );
  const [gateUOMs, setGateUOMs] = useState<GateUOM[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const setups = await fetchSetups();
        setWeightUOMs(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.WEIGHT_UOM)
        );
        setGateUOMs(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.GATE_UOM)
        );
        setPaymentTypes(
          setups.filter((x) => x.category_f === SETUP_CATEGORIES.PAYMENT_TYPE)
        );

        const gateInOutInfo = await fetchGateInOutInfos();
        setGateInOutInfos(gateInOutInfo);

        const gateInOutStatus = await fetchGateInOutStatus();
        setGateInOutStatuss(gateInOutStatus);
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

  const handleGateAmountFOC = (isFoc: boolean) => {
    handleChange("is_gate_foc_f", isFoc);
    updateGateChargeAmount({
      ...weighGateInOutData,
      is_gate_foc_f: isFoc,
    });
  };

  const handleWeighAmountFOC = (isFoc: boolean) => {
    handleChange("is_weight_foc_f", isFoc);
    updateWeightChargeAmount({
      ...weighGateInOutData,
      is_weight_foc_f: isFoc,
    });
  };

  const updateNetWeighChange = (
    truckCargoWeight?: number,
    truckWeight?: number
  ) => {
    const truckPlusCargoWeight = Number(truckCargoWeight ?? 0);
    const truckOnlyWeight = Number(truckWeight ?? 0);
    const netWeight = truckPlusCargoWeight - truckOnlyWeight;
    handleChange("net_weight_f", netWeight);
  };

  const handleTruckEmptyWeighChange = (val: string | null) => {
    handleChange("truck_weight_f", val);
    handleChange("gate_in_out_truck_weighValue_f", val);
    updateNetWeighChange(weighGateInOutData.truck_cargo_weight_f, Number(val));
  };

  const handleTruckPluseCargoWeighChange = (val: string | null) => {
    handleChange("truck_cargo_weight_f", val);
    handleChange("gate_in_out_truck_weighValue_f", val);
    updateNetWeighChange(Number(val), weighGateInOutData.truck_weight_f);
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
            valueKey="description_f"
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
            onChange={handleWeighAmountFOC}
          />
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <TextInput
            label="Date & Time (In)"
            type="text"
            value={weighGateInOutData.date_time_in_f}
            readOnly
          />
          <TextInput
            label="Date & Time (Out)"
            type="text"
            value={weighGateInOutData.date_time_out_f}
            readOnly
          />
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <TextInput
            label="(Truck + Cargo) Weight"
            type="number"
            value={weighGateInOutData.truck_cargo_weight_f}
            onChange={handleTruckPluseCargoWeighChange}
          />
          <TextInput
            label="Truck/Empty Weight"
            type="number"
            value={weighGateInOutData.truck_weight_f}
            onChange={handleTruckEmptyWeighChange}
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
            valueKey="description_f"
            placeholder="Select a UOM"
          />
          <SearchableDropdown
            label="Payment Type"
            options={paymentTypes}
            value={weighGateInOutData.payment_type_f}
            onChange={(val) => handleChange("payment_type_f", val)}
            displayKey="description_f"
            valueKey="description_f"
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
            onChange={handleGateAmountFOC}
          />
        </div>
        <div className="col-span-1">
          <RadioGroup
            label="Status"
            name="status"
            options={gateInOutStatuss}
            value={weighGateInOutData.gate_in_out_status_f}
            onChange={(val) => handleChange("gate_in_out_status_f", val)}
            direction="horizontal"
            layout="grid"
          />
        </div>
        <div className="col-span-3">
          <RadioGroup
            label="Info"
            name="info"
            options={gateInOutInfos}
            value={weighGateInOutData.gate_in_out_truck_info_f}
            onChange={(val) => handleChange("gate_in_out_truck_info_f", val)}
            direction="horizontal"
            layout="grid"
            columns={4} // 4 columns → 4x1 layout
          />
          <br></br>
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5">
              <DateInput
                label="Date Time"
                value={weighGateInOutData.gate_in_out_truck_dateTime_f}
                onChange={(date) =>
                  handleChange("gate_in_out_truck_dateTime_f", date)
                }
                auto={true}
                includeTime
              />
            </div>
            <div className="col-span-7">
              <TextInput
                label="Weight Value"
                type="number"
                value={weighGateInOutData.gate_in_out_truck_weighValue_f}
                // onChange={(val) =>
                //   handleChange("gate_in_out_truck_weighValue_f", val)
                // }
                readOnly
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
