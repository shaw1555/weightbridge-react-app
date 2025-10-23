// import React from "react";
// import { type WeighGateInOut } from "./types";
// import {
//   fetchWeighGateInOutById,
//   createWeighGateInOut,
//   updateWeighGateInOut,
//   deleteWeighGateInOut,
// } from "./service";
// import ROUTES from "../../routes";
// import EntityForm, { type Field } from "../../components/EntityForm";

// const WeighGateInOutFormPage: React.FC = () => {
//   const fields: Field<WeighGateInOut>[] = [
//     {
//       name: "weighGateInOut_code_f",
//       label: "WeighGateInOut Code",
//       type: "text",
//     },
//     {
//       name: "weighGateInOut_name_f",
//       label: "WeighGateInOut Name",
//       type: "text",
//       required: true,
//     },
//     {
//       name: "address_f",
//       label: "Address",
//       type: "text",
//     },
//     {
//       name: "phone_no_f",
//       label: "Phone.No",
//       type: "text",
//     },
//     {
//       name: "registration_number_f",
//       label: "Registration.No",
//       type: "text",
//     },
//   ];
//   return (
//     <EntityForm<WeighGateInOut, "weighGateInOut_id_f">
//       title="WeighGateInOut"
//       idField="weighGateInOut_id_f"
//       fields={fields}
//       fetchById={fetchWeighGateInOutById}
//       create={createWeighGateInOut}
//       update={updateWeighGateInOut}
//       deleteFn={deleteWeighGateInOut}
//       listRoute={ROUTES.WeighGateInOut_List}
//       createPermission="Create_WeighGateInOut"
//       updatePermission="Update_WeighGateInOut"
//       deletePermission="Delete_WeighGateInOut"
//     />
//   );
// };

// export default WeighGateInOutFormPage;
