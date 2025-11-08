import React, { useEffect, useState } from "react";
import SearchableDropdown from "../../components/SearchableDropdown";
import DateInput from "../../components/DateInput";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import RadioGroup from "../../components/RadioGroup";
import { SETUP_CATEGORIES } from "../../constants";
import { PERMISSIONS } from "../../constants";
import { AuthService } from "../../services/AuthService";
import type { Setup, WeighVGM, VGMGateInOutInfo } from "./types";

import {
  fetchSetups,
  fetchVGMGateInOutInfo,
  DownloadWeightSlip,
} from "./service";

interface DetailInfoProps {
  onSubmit: () => void;
  weighVGMData: WeighVGM;
  setWeighVGMData: React.Dispatch<React.SetStateAction<WeighVGM>>;
}

const DetailInfo: React.FC<DetailInfoProps> = ({
  onSubmit,
  weighVGMData: weighGateInOutData,
  setWeighVGMData: setWeighGateInOutData,
}) => {
  const [vGMGateInOutInfos, setVGMGateInOutInfos] = useState<
    VGMGateInOutInfo[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canUpdate = AuthService.hasPermission(
    PERMISSIONS.UPDATE_WEIGH_GATE_IN_OUT
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const gateInOutInfo = await fetchVGMGateInOutInfo();
        setVGMGateInOutInfos(gateInOutInfo);
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

  const OnDownloadWeightSlip = async () => {
    await DownloadWeightSlip(weighGateInOutData.transaction_no_f);
  };

  return (
    <div className="w-full p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Weight Info</h2>

      <div className="grid grid-cols-3 gap-6">
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
            label="Truck Weight"
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
        <div className="border rounded-lg p-4 space-y-4">
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

          {/* <RadioGroup
            label="Weigh On"
            name="info"
            options={vGMGateInOutInfos}
            value={weighGateInOutData.gate_in_out_truck_info_f}
            onChange={(val) => handleChange("gate_in_out_truck_info_f", val)}
            direction="horizontal"
            layout="wrap"
            columns={2}
          /> */}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-3">
        {canUpdate && (
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
        )}
        <div className="border rounded-xl p-4 relative">
          <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold">
            Download
          </span>

          <div className="flex gap-3">
            <Button
              disabled={!weighGateInOutData.transaction_id_f}
              onClick={OnDownloadWeightSlip}
            >
              Weight Slip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
