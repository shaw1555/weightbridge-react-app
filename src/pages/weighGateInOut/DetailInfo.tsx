// import React, { useEffect, useState } from "react";
// import SearchableDropdown from "../../components/SearchableDropdown";
// import FreeTextDropdown from "../../components/FreeTextDropdown";
// import DateInput from "../../components/DateInput";
// import TextInput from "../../components/TextInput";
// import TextareaInput from "../../components/TextareaInput";
// import Button from "../../components/Button";
// import Checkbox from "../../components/Checkbox";
// import RadioGroup from "../../components/RadioGroup";

// import type { weightUom, gateUom, paymentType } from "./types";

// interface BlockAFormProps {
//   onSave: (data: any) => void;
//   disabled: boolean;
// }

// const weightUoms: weightUom[] = [{ id: 1, name: "Per Container" }];
// const gateUoms: gateUom[] = [{ id: 1, name: "Per Truck" }];
// const paymentTypes: paymentType[] = [{ id: 1, name: "Cash" }];

// const optionStatus = [
//   { label: "In", value: "in" },
//   { label: "Out", value: "out" },
// ];

// const optionInfo = [
//   { label: "Truck Only", value: "truck" },
//   { label: "Empty Container", value: "empty" },
//   { label: "Laden Container", value: "laden" },
//   { label: "General Cargo", value: "cargo" },
// ];

// const DetailInfo: React.FC<BlockAFormProps> = ({ onSave, disabled }) => {
//   const initialForm = {
//     weightUomName: null as number | null,
//     gateUomName: null as number | null,
//     paymentTypeName: null as number | null,
//     numberOfContainer: "0.00",
//     unitCharge: "0.00",
//     weightAmount: "0.00",
//     gateAmount: "0.00",
//     dateTimeIn: "",
//     dateTimeOut: "",
//     truckCargoWeight: "0.00",
//     truckEmptyWeight: "0.00",
//     netWeight: "0.00",
//     subTotal: "0.00",
//     commercialTax5Percent: "0.00",
//     grandTotal: "0.00",
//     weightFOC: false,
//     gateFOC: false,
//     status: "",
//     info: "",
//     dateTime: "",
//     weightValue: "0.00",
//   };

//   const [form, setForm] = useState(initialForm);

//   // Example: recalc event handler
//   const handleRecalculate = () => {
//     const calculated = 12.3456;
//     setForm({
//       ...form,
//       numberOfContainer: calculated.toFixed(2), // e.g. "12.35"
//     });
//   };

//   // Generic change handler
//   const handleChange = (field: keyof typeof form, value: any) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = () => {
//     // Show all form values in an alert
//     alert(JSON.stringify(form, null, 2));

//     // Call the onSave callback
//     onSave(form);
//   };

//   // 🔹 run once when component loads
//   useEffect(() => {
//     handleRecalculate();
//   }, []);

//   return (
//     <div className="w-full p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
//       <h2 className="text-lg font-semibold mb-4 border-b pb-2">Weight Info</h2>

//       <div className="grid grid-cols-3 gap-6">
//         <div className="border rounded-lg p-4 space-y-4">
//           <SearchableDropdown
//             label="UOM"
//             options={weightUoms}
//             value={form.weightUomName}
//             onChange={(val) => handleChange("weightUomName", val)}
//             displayKey="name"
//             valueKey="id"
//             placeholder="Select a UOM"
//           />
//           <TextInput
//             label="No. Container"
//             type="number"
//             value={form.numberOfContainer}
//             readOnly
//           />

//           <TextInput
//             label="Unit Charge"
//             type="number"
//             value={form.unitCharge}
//             readOnly
//           />
//           <TextInput
//             label="Amount"
//             type="number"
//             value={form.weightAmount}
//             readOnly
//           />
//           <Checkbox
//             label="FOC"
//             checked={form.weightFOC}
//             onChange={(val) => handleChange("weightFOC", val)}
//           />
//         </div>

//         <div className="border rounded-lg p-4 space-y-4">
//           <TextInput
//             label="Date & Time (In)"
//             type="number"
//             value={form.dateTimeIn}
//             readOnly
//           />
//           <TextInput
//             label="Date & Time (Out)"
//             type="number"
//             value={form.dateTimeOut}
//             readOnly
//           />
//         </div>

//         <div className="border rounded-lg p-4 space-y-4">
//           <TextInput
//             label="(Truck + Cargo) Weight"
//             type="number"
//             value={form.truckCargoWeight}
//             onChange={(val) => handleChange("truckCargoWeight", val)}
//           />
//           <TextInput
//             label="Truck/Empty Weight"
//             type="number"
//             value={form.truckEmptyWeight}
//             onChange={(val) => handleChange("truckEmptyWeight", val)}
//           />
//           <TextInput
//             label="Net Weight"
//             type="number"
//             value={form.netWeight}
//             readOnly
//           />
//         </div>
//       </div>

//       <h2 className="text-lg font-semibold mb-4 mt-6 border-b pb-2">
//         Gate In / Out
//       </h2>

//       <div className="grid grid-cols-6 gap-6">
//         <div className="col-span-2 border rounded-lg p-4 space-y-4">
//           <SearchableDropdown
//             label="UOM"
//             options={gateUoms}
//             value={form.gateUomName}
//             onChange={(val) => handleChange("gateUomName", val)}
//             displayKey="name"
//             valueKey="id"
//             placeholder="Select a UOM"
//           />
//           <SearchableDropdown
//             label="Payment Type"
//             options={paymentTypes}
//             value={form.paymentTypeName}
//             onChange={(val) => handleChange("paymentTypeName", val)}
//             displayKey="name"
//             valueKey="id"
//             placeholder="Select a Payment Type"
//           />
//           <TextInput
//             label="Amount"
//             type="number"
//             value={form.gateAmount}
//             readOnly
//           />
//           <Checkbox
//             label="FOC"
//             checked={form.gateFOC}
//             onChange={(val) => handleChange("gateFOC", val)}
//           />
//         </div>
//         <div className="col-span-1">
//           <RadioGroup
//             label="Status"
//             name="status"
//             options={optionStatus}
//             value={form.status}
//             onChange={(val) => handleChange("status", val)}
//             direction="horizontal"
//             layout="grid"
//           />
//         </div>
//         <div className="col-span-3">
//           <RadioGroup
//             label="Info"
//             name="info"
//             options={optionInfo}
//             value={form.info}
//             onChange={(val) => handleChange("info", val)}
//             direction="horizontal"
//             layout="grid"
//             columns={4} // 4 columns → 4x1 layout
//           />
//           <br></br>
//           <div className="grid grid-cols-12 gap-4 items-center">
//             <div className="col-span-5">
//               <DateInput
//                 label="Date Time"
//                 value={form.dateTime}
//                 onChange={(date) => handleChange("dateTime", date)}
//                 includeTime
//               />
//             </div>
//             <div className="col-span-7">
//               <TextInput
//                 label="Weight Value"
//                 type="number"
//                 value={form.weightValue}
//                 onChange={(val) => handleChange("weightValue", val)}
//               />
//             </div>
//           </div>
//           {/* <div className="border rounded-lg p-4 flex items-end gap-3">
            
            
//           </div> */}
//         </div>
//       </div>

//       <h2 className="text-lg font-semibold mb-4 mt-6 border-b pb-2">
//         Final Amount
//       </h2>

//       <div className="grid grid-cols-3 gap-6">
//         <div className="col-span-1 border rounded-lg p-4 space-y-4">
//           <TextInput
//             label="Sub Total"
//             type="number"
//             value={form.subTotal}
//             readOnly
//           />
//           <TextInput
//             label="Commercial Tax 5%"
//             type="number"
//             value={form.commercialTax5Percent}
//             readOnly
//           />
//           <TextInput
//             label="Grand Total"
//             type="number"
//             value={form.grandTotal}
//             readOnly
//           />
//         </div>
//         {/* <div className="col-span-1 "> </div> */}
//         <div className="col-span-2 self-end justify-self-end">
//           {/* Buttons */}
//           <div className="flex justify-end mt-6 gap-3">
//             <div className="border rounded-xl p-4 relative">
//               <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold"></span>
//               <div className="flex gap-3">
//                 <Button color="green" onClick={handleSubmit}>
//                   Update Weight and Gate Info
//                 </Button>
//               </div>
//             </div>

//             <div className="border rounded-xl p-4 relative">
//               <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold">
//                 Print Preview
//               </span>

//               <div className="flex gap-3">
//                 <Button>Receipt / Invoice</Button>
//                 <Button>Weight Slip</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailInfo;
