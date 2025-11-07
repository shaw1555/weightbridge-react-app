// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { GATE_STATUS, SETUP_CATEGORIES , STORAGE_KEYS} from "../../constants";
// import HeaderInfo from "./HeaderInfo";
// import DetailInfo from "./DetailInfo";
// import { ArrowLeft } from "lucide-react";
// import Button from "../../components/Button";
// import type { ActiveTariff, Setup, WeighVGM } from "./types";
// import { initialForm } from "./types"; // this is data (not type)
// import {
//   fetchActiveTariff,
//   fetchWeighGateInOutById,
//   createWeighGateInOut,
//   updateWeighGateInOut,
//   updateWeighDetailGateInOut,
//   deleteWeighGateInOut,
//   fetchSetups,
// } from "./service";

// export default function WeighVGMFormPage() {
//   const { id } = useParams<{ id: string }>(); // 👈 get the :id from route
//   const [weighGateInOutData, setWeighGateInOutData] =
//     useState<WeighVGM>(initialForm);
//   const [activeTariff, setActiveTariff] = useState<ActiveTariff>();
//   const [setups, setSetup] = useState<Setup[]>();
//   const [commericalTaxPercentage, setCommericalTaxPercentage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   //it must be delcar before useEffect , due to use this funtion inside of useEffect //
//   const getInitialWeighGateInOutData = (
//     activeTariff: ActiveTariff,
//     setups: Setup[]
//   ): WeighVGM => {
//     const defaultDept = setups.find(
//       (x) => x.category_f === SETUP_CATEGORIES.JOB_DEPARTMENT && x.is_default_f
//     );
//     const defaultWeightUOM = setups.find(
//       (x) => x.category_f === SETUP_CATEGORIES.WEIGHT_UOM && x.is_default_f
//     );
//     const defaultGateUOM = setups.find(
//       (x) => x.category_f === SETUP_CATEGORIES.GATE_UOM && x.is_default_f
//     );
//     const defaultPaymentType = setups.find(
//       (x) => x.category_f === SETUP_CATEGORIES.PAYMENT_TYPE && x.is_default_f
//     );

//     const defaultLoc = localStorage.getItem(STORAGE_KEYS.DEFAULT_LOCATION);

//     const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

//     return {
//       ...initialForm,
//       tariff_id_f: activeTariff?.tariff_t?.tariff_id_f ?? 0,
//       tariff_no_f: activeTariff?.tariff_t?.tariff_no_f ?? "",
//       date_f: today,
//       job_department_f: defaultDept?.description_f ?? "",
//       weight_charge_uom_f: defaultWeightUOM?.description_f ?? "",
//       gate_charge_uom_f: defaultGateUOM?.description_f ?? "",
//       payment_type_f: defaultPaymentType?.description_f ?? "",
//       location_f: defaultLoc ?? "",
//     };
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // ✅ Fetch once
//         const [activeTariffData, setups] = await Promise.all([
//           fetchActiveTariff(),
//           fetchSetups(),
//         ]);

//         setActiveTariff(activeTariffData);
//         setSetup(setups);

//         // ✅ Extract tax once
//         const tax = setups.find((x) => x.category_f === "CommericalTax");
//         setCommericalTaxPercentage(Number(tax?.description_f ?? 0));

//         if (!id || id === "new" || id === "0") {
//           // 🆕 New record
//           const initialData = getInitialWeighGateInOutData(
//             activeTariffData,
//             setups
//           );
//           setWeighGateInOutData(initialData);
//         } else {
//           // ✏️ Existing record
//           const existingRecord = await fetchWeighGateInOutById(Number(id));
//           if (!existingRecord.date_time_in_f)
//             existingRecord.gate_in_out_status_f = GATE_STATUS.IN;
//           else existingRecord.gate_in_out_status_f = GATE_STATUS.OUT;
//           setWeighGateInOutData(existingRecord);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   const clearData = () => {
//     if (!activeTariff || !setups) return;
//     setWeighGateInOutData(getInitialWeighGateInOutData(activeTariff, setups));
//   };

//   const duplicateData = () => {
//     setWeighGateInOutData((prev) => ({
//       ...prev,
//       transaction_id_f: initialForm.transaction_id_f,
//       transaction_no_f: initialForm.transaction_no_f,
//       // tariff_id_f: activeTariff?.tariff_t.tariff_id_f ?? 0, // no need, bczo no change //
//       truck_no_f: initialForm.truck_no_f,
//       container_no_f: initialForm.container_no_f,
//       date_time_in_f: initialForm.date_time_in_f,
//       date_time_out_f: initialForm.date_time_out_f,
//       no_of_container_f: initialForm.no_of_container_f,
//       truck_cargo_weight_f: initialForm.truck_cargo_weight_f,
//       truck_weight_f: initialForm.truck_weight_f,
//       net_weight_f: initialForm.net_weight_f,
//       gate_in_out_truck_weighValue_f:
//         initialForm.gate_in_out_truck_weighValue_f,
//     }));
//   };
//   const deleteRecord = async () => {
//     try {
//       const res = await deleteWeighGateInOut(
//         weighGateInOutData.transaction_id_f
//       );
//       clearData();
//       toast.success("Successfully deleted!");
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       toast.error(error.message || "An error occurred while deleting.");
//     }
//   };

//   const validation = () => {
//     if (!weighGateInOutData.customer_id_f) {
//       toast.warn("Customer Name is required.");
//       return false;
//     }

//     if (!weighGateInOutData.location_f) {
//       toast.warn("Location is required.");
//       return false;
//     }

//     if (!weighGateInOutData.job_department_f) {
//       toast.warn("Job Department is required.");
//       return false;
//     }

//     if (!weighGateInOutData.truck_arrange_by_f) {
//       toast.warn("Arrange By is required.");
//       return false;
//     }

//     if (!weighGateInOutData.service_id_f) {
//       toast.warn("Service is required.");
//       return false;
//     }

//     if (!weighGateInOutData.category_id_f) {
//       toast.warn("Category is required.");
//       return false;
//     }

//     if (!weighGateInOutData.product_f) {
//       toast.warn("Product is required.");
//       return false;
//     }

//     if (!weighGateInOutData.truck_no_f?.trim()) {
//       toast.warn("Truck No is required.");
//       return false;
//     }

//     if (!weighGateInOutData.truck_type_id_f) {
//       toast.warn("Truck Type is required.");
//       return false;
//     }

//     if (!weighGateInOutData.container_size_type_f) {
//       toast.warn("Container Type is required.");
//       return false;
//     }

//     return true;
//   };

//   const saveHeaderInfo = async () => {
//     try {
//       if (!validation()) return;

//       if (weighGateInOutData.transaction_id_f === 0) {
//         // 👉 Create new record
//         const res = await createWeighGateInOut(weighGateInOutData);

//         toast.success(`${res.transaction_no_f}`);

//         setWeighGateInOutData((prev) => ({
//           ...prev,
//           transaction_id_f: res.transaction_id_f,
//           transaction_no_f: res.transaction_no_f,
//         }));
//       } else {
//         // 👉 Update existing record
//         await updateWeighGateInOut(
//           weighGateInOutData.transaction_id_f,
//           weighGateInOutData
//         );

//         toast.success("Successfully updated!");
//       }
//     } catch (error: any) {
//       console.error("Save failed:", error);
//       toast.error(error.message || "An error occurred while saving.");
//     }
//   };

//   const saveDetailInfo = async () => {
//     try {
//       // 👉 Update Weight Detail existing record
//       await updateWeighDetailGateInOut(
//         weighGateInOutData.transaction_id_f,
//         weighGateInOutData
//       );

//       const {
//         gate_in_out_status_f,
//         gate_in_out_truck_dateTime_f,
//         date_time_in_f,
//         date_time_out_f,
//       } = weighGateInOutData;

//       let updatedFields: Partial<WeighVGM> = {};

//       if (gate_in_out_status_f === GATE_STATUS.IN) {
//         updatedFields = {
//           date_time_in_f: gate_in_out_truck_dateTime_f,
//           gate_in_out_status_f: date_time_out_f
//             ? GATE_STATUS.IN
//             : GATE_STATUS.OUT, // toggle if out time missing
//         };
//       } else if (gate_in_out_status_f === GATE_STATUS.OUT) {
//         updatedFields = {
//           date_time_out_f: gate_in_out_truck_dateTime_f,
//           gate_in_out_status_f: date_time_in_f
//             ? GATE_STATUS.OUT
//             : GATE_STATUS.IN, // toggle if in time missing
//         };
//       }

//       // ✅ Only update once, avoids duplicated setState calls
//       setWeighGateInOutData((prev) => ({
//         ...prev,
//         ...updatedFields,
//       }));

//       toast.success("Successfully updated!");
//     } catch (error: any) {
//       console.error("Save failed:", error);
//       toast.error(error.message || "An error occurred while updating.");
//     }
//   };

//   const calculateFinalAmount = (weightAmount: number, gateAount: number) => {
//     const subTotal = weightAmount + gateAount;
//     const commTaxAmt = (subTotal * commericalTaxPercentage) / 100;
//     const grandTotal = subTotal + commTaxAmt;

//     setWeighGateInOutData((prev) => ({
//       ...prev,
//       sub_total_amount_f: subTotal,
//       commerical_tax_amount_f: commTaxAmt,
//       grand_total_amount_f: grandTotal,
//     }));
//   };

//   const updateGateChargeAmount = (data = weighGateInOutData) => {
//     const {
//       category_id_f,
//       service_id_f,
//       truck_type_id_f,
//       is_gate_foc_f,
//       weight_charge_amount_f,
//     } = data;

//     const matchedDetail = activeTariff?.tariff_detail_t.find(
//       (x) =>
//         x.category_id_f === category_id_f &&
//         x.service_id_f === service_id_f &&
//         x.truck_type_id_f === truck_type_id_f
//     );

//     const tariffUnitPrice = matchedDetail?.unit_price_f ?? 0;
//     let tariffGateAmount = tariffUnitPrice;
//     if (is_gate_foc_f) {
//       tariffGateAmount = 0;
//     }

//     // create a new object instead of mutating //to refresh UI // re-render
//     setWeighGateInOutData({
//       ...data,
//       gate_charge_unitprice_f: tariffUnitPrice,
//       gate_charge_amount_f: tariffGateAmount,
//     });

//     calculateFinalAmount(weight_charge_amount_f, tariffGateAmount);
//   };

//   const updateWeightChargeAmount = (data = weighGateInOutData) => {
//     const {
//       weight_charge_unitprice_f,
//       no_of_container_f,
//       is_weight_foc_f,
//       gate_charge_amount_f,
//     } = data;
//     let weightChargeAmount = weight_charge_unitprice_f * no_of_container_f;

//     if (is_weight_foc_f) {
//       weightChargeAmount = 0;
//     }

//     // create a new object instead of mutating //to refresh UI // re-render
//     setWeighGateInOutData({
//       ...data,
//       weight_charge_amount_f: weightChargeAmount,
//     });

//     calculateFinalAmount(weightChargeAmount, gate_charge_amount_f);
//   };

//   return (
//     <div className="p-6 bg-gray-50">
//       <div className="flex items-center mb-4">
//         <Button
//           onClick={() => window.history.back()}
//           className="p-2 rounded-full hover:bg-gray-200 transition-colors"
//           // title="Go Back"
//         >
//           <ArrowLeft className="w-5 h-5 text-gray-700" />
//         </Button>
//         <h2 className="text-lg font-semibold ml-2">Weigh Gate In & Out</h2>
//       </div>
//       <HeaderInfo
//         onSubmit={saveHeaderInfo}
//         onDelete={deleteRecord}
//         weighGateInOutData={weighGateInOutData}
//         setWeighGateInOutData={setWeighGateInOutData}
//         onClear={clearData}
//         duplicateData={duplicateData}
//         activeTariff={activeTariff}
//         updateGateChargeAmount={updateGateChargeAmount}
//         updateWeightChargeAmount={updateWeightChargeAmount}
//       />
//       <DetailInfo
//         onSubmit={saveDetailInfo}
//         weighGateInOutData={weighGateInOutData}
//         setWeighGateInOutData={setWeighGateInOutData}
//         updateGateChargeAmount={updateGateChargeAmount}
//         updateWeightChargeAmount={updateWeightChargeAmount}
//       />
//     </div>
//   );
// }


export default function WeighVGMFormPage() {

  return <div>hello</div>

}