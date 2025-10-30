export interface WeighGateInOut {
  transaction_id_f: number;
  transaction_no_f: string;

  tariff_detail_id_f: number;
  tariff_id_f: number;
  customer_id_f: number;
  truck_no_f: string;
  product_f: string;
  date_f: string | null;
  vessel_f: string;
  voy_f: string;
  container_size_type_f: string;

  service_id_f: number;
  service_f: string;

  category_id_f: number;
  category_f: string;

  truck_type_id_f: number;
  truck_type_f: string;

  payment_type_f: string;
  location_f: string;
  gate_charge_uom_f: string;
  gate_charge_amount_f: number;
  is_gate_foc_f: boolean;

  weight_charge_uom_f: string;
  container_no_f: string;
  no_of_container_f: number;
  weight_charge_unitprice_f: number;
  weight_charge_amount_f: number;
  is_weight_foc_f: boolean;

  sub_total_amount_f: number;
  commerical_tax_amount_f: number;
  grand_total_amount_f: number;
  job_department_f: string;
  truck_arrange_by_f: string;
  bl_no_f: string;
  date_time_in_f: string | null;
  date_time_out_f: string | null;
  truck_cargo_weight_f: number;
  truck_weight_f: number;
  net_weight_f: number;
  gate_in_info_f: string;
  gate_in_weight_f: number;
  gate_out_info_f: string;
  gate_out_weight_f: number;
  remark_f: string;
  received_by_f: string;
  accepted_by_f: string;
  approved_by_f: string;
  inactive_f: boolean;
  log_by_f: string;
  log_date_time_f: string | null;
  self_own_f: boolean;
  lock_f: boolean;
  gate_charge_unitprice_f: number;

  //for entry, UI field only //
  gateInOutStatus: string;
  gateInOutTruckInfo: string;
  gateInOutTruckDateTime: string;
  gateInOutTruckWeighValue: number;
}

export const initialForm: WeighGateInOut = {
  transaction_id_f: 0,
  transaction_no_f: "Auto",

  tariff_detail_id_f: 0,
  tariff_id_f: 0,
  customer_id_f: 0,
  truck_no_f: "",
  product_f: "",
  date_f: null,
  vessel_f: "",
  voy_f: "",
  container_size_type_f: "",

  service_id_f: 0,
  service_f: "",

  category_id_f: 0,
  category_f: "",

  truck_type_id_f: 0,
  truck_type_f: "",

  payment_type_f: "",
  location_f: "",
  gate_charge_uom_f: "",
  gate_charge_amount_f: 0,
  is_gate_foc_f: false,

  weight_charge_uom_f: "",
  container_no_f: "",
  no_of_container_f: 0,
  weight_charge_unitprice_f: 0,
  weight_charge_amount_f: 0,
  is_weight_foc_f: false,

  sub_total_amount_f: 0,
  commerical_tax_amount_f: 0,
  grand_total_amount_f: 0,
  job_department_f: "",
  truck_arrange_by_f: "",
  bl_no_f: "",
  date_time_in_f: null,
  date_time_out_f: null,
  truck_cargo_weight_f: 0,
  truck_weight_f: 0,
  net_weight_f: 0,
  gate_in_info_f: "",
  gate_in_weight_f: 0,
  gate_out_info_f: "",
  gate_out_weight_f: 0,
  remark_f: "",
  received_by_f: "",
  accepted_by_f: "",
  approved_by_f: "",
  inactive_f: false,
  log_by_f: "",
  log_date_time_f: null,
  self_own_f: false,
  lock_f: false,
  gate_charge_unitprice_f: 0,

  gateInOutStatus: "",
  gateInOutTruckInfo: "",
  gateInOutTruckDateTime: "",
  gateInOutTruckWeighValue: 0,
};

export interface ActiveTariff {
  tariff_t: Tariff;
  tariff_detail_t: TariffDetail[];
}

export interface Tariff {
  tariff_id_f: number;
  tariff_no_f: string;
  effective_date_f: string;
}

export interface TariffDetail {
  tariff_detail_id_f: number;
  tariff_id_f: number;
  tariff_no_f: string;
  service_id_f: number;
  service_f: string;
  category_id_f: number;
  category_f: string;
  truck_type_id_f: number;
  truck_type_f: string;
  unit_price_f: number;
}

export interface GateInOutInfo {
  label: string;
  value: string;
}

export interface GateInOutStatus {
  label: string;
  value: string;
}

export interface Customer {
  customer_id_f: number;
  // customer_code_f: string;
  customer_name_f: string;
}

export interface Setup {
  setup_id_f: number;
  description_f: string;
  category_f: string;
  option1_f?: string;
  is_default_f?: boolean;
}

export interface Service {
  service_id_f: number;
  service_f: string;
}

export interface Category {
  category_id_f: number;
  category_f: string;
}

export interface TruckType {
  truck_type_id_f: number;
  truck_type_f: string;
}

// // types.ts (optional)
// export interface DetailForm {
//   weight_charge_uom_f: string | null;
//   no_of_container_f: number;
//   weight_charge_unitprice_f: number;
//   weight_charge_amount_f: number;
//   is_weight_foc_f: boolean;
//   date_time_in_f: string;
//   date_time_out_f: string;
//   truck_cargo_weight_f: number;
//   truck_weight_f: number;
//   net_weight_f: number;
//   gate_charge_uom_f: string | null;
//   payment_type_f: string | null;
//   gate_charge_amount_f: number;
//   is_gate_foc_f: boolean;
//   status: string;
//   info: string;
//   dateTime: string;
//   weightValue: number;
//   sub_total_amount_f: number;
//   commerical_tax_amount_f: number;
//   grand_total_amount_f: number;
// }

// export const initialDetailForm: DetailForm = {
//   weight_charge_uom_f: null,
//   no_of_container_f: 0,
//   weight_charge_unitprice_f: 0,
//   weight_charge_amount_f: 0,
//   is_weight_foc_f: false,
//   date_time_in_f: "",
//   date_time_out_f: "",
//   truck_cargo_weight_f: 0,
//   truck_weight_f: 0,
//   net_weight_f: 0,
//   gate_charge_uom_f: null,
//   payment_type_f: null,
//   gate_charge_amount_f: 0,
//   is_gate_foc_f: false,
//   status: "",
//   info: "",
//   dateTime: "",
//   weightValue: 0,
//   sub_total_amount_f: 0,
//   commerical_tax_amount_f: 0,
//   grand_total_amount_f: 0,
// };

// export interface HeaderForm {
//   transaction_id_f: number;

//   transaction_no_f: string;
//   tariff_detail_id_f: number;
//   tariff_id_f: number;
//   customer_id_f: number | null;
//   truck_no_f: string;
//  product_f: string | null;
//   date_f: string;
//   vessel_f: string;
//   voy_f: string;
//   container_size_type_f: string | null;
//   service_id_f: number | null;
//   service_f:string;
//   category_id_f: number | null;
//   category_f: string;
//   truck_type_id_f: number | null;
// truck_type_f: string;

//   location_f: string | null;
//   job_department_f: string | null;
//   remark_f: string;
//   truck_arrange_by_f: string | null;

//   container_no_f: string;
//   bl_no_f: string;

//   accepted_by_f: string | null;
//   approved_by_f: string | null;
//   received_by_f: string;
// }

// export const initialHeaderForm: HeaderForm = {
//   transaction_id_f: 0,
//   date_f: "",
//   transaction_no_f: "Auto",
//   tariff_detail_id_f: 0,
//   tariff_id_f:0,
//   customer_id_f: null as number | null,
//   location_f: null as string | null,
//   job_department_f: null as string | null,
//   remark_f: "",
//   truck_arrange_by_f: null as string | null,
//   service_id_f: null as number | null,
//   service_f:"",
//   category_id_f: null as number | null,
//   category_f:"",
//   product_f: null as string | null,
//   truck_type_id_f: null as number | null,
//   truck_type_f:"",
//   truck_no_f: "", // FreeTextDropdown can store string
//   container_size_type_f: null as string | null,
//   container_no_f: "",
//   bl_no_f: "",
//   vessel_f: "",
//   voy_f: "",
//   accepted_by_f: null as string | null,
//   approved_by_f: null as string | null,
//   received_by_f: "",
// };

// ✅ Helper to display gender as text in UI
export function getGenderText(gender?: boolean): string {
  if (gender === undefined || gender === null) return "-";
  return gender ? "Male" : "Female";
}

// ✅ Helper to convert text back to boolean (useful in forms)
export function genderTextToBoolean(genderText: string): boolean {
  return genderText.toLowerCase() === "male";
}
