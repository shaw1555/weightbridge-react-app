export interface WeighGateInOut {
  transaction_id_f: number;
  transaction_no_f: string;

  tariff_detail_id_f: number;
  tariff_id_f: number;
  customer_id_f: number;
  truck_no_f: string;
  product_f: string;
  date_f: string;
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
  date_time_in_f: string;
  date_time_out_f: string;
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
  log_date_time_f: string;
  self_own_f: boolean;
  lock_f: boolean;
  gate_charge_unitprice_f: number;
}

export interface ActiveTariff {
  tariff_t: Tariff;
  tariffDetail_t: TariffDetail;
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

export interface Customer {
  customer_id_f: number;
  customer_code_f: string;
  customer_name_f: string;
}

export interface Setup {
  setup_id_f: number;
  category_f: string;
  description_f: string;
  is_default_f: boolean;
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

export interface gateUom {
  id: number;
  name: string;
}

export interface paymentType {
  id: number;
  name: string;
}

// ✅ Helper to display gender as text in UI
export function getGenderText(gender?: boolean): string {
  if (gender === undefined || gender === null) return "-";
  return gender ? "Male" : "Female";
}

// ✅ Helper to convert text back to boolean (useful in forms)
export function genderTextToBoolean(genderText: string): boolean {
  return genderText.toLowerCase() === "male";
}
