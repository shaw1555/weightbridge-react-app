import { GATE_TRUCK_INFO } from "../../constants";

export interface WeighVGM {
  transaction_id_f: number;
  transaction_no_f: string;
  customer_id_f: number;
  customer_name_f?: string;
  registration_number_f?: string;
  vgm_reference_f?: string;
  truck_no_f: string;
  booking_no_f?: string;
  convoy_note_f?: string;
  port_of_loading_f?: string;
  vessel_voy_f?: string;
  seal_number_f?: string;
  container_size_type_f: string;
  container_no_f: string;
  date_f: string | null;
  date_time_in_f: string | null;
  date_time_out_f: string | null;
  truck_cargo_weight_f: number;
  truck_weight_f: number;
  net_weight_f: number;
  remark_f: string;
  location_f: string;
  weight_by_f: string;
  accepted_by_f: string;
  vgm_verified_by_f: string;
  log_by_f: string;
  log_date_time_f: string | null;

  //for entry, UI field only //
  gate_in_out_truck_info_f: string;
  gate_in_out_truck_dateTime_f: string;
  gate_in_out_truck_weighValue_f: number;
}

export const initialForm: WeighVGM = {
  transaction_id_f: 0,
  transaction_no_f: "Auto",

  customer_id_f: 0,
  truck_no_f: "", 
  date_f: null,
  vessel_voy_f: "", 
  container_size_type_f: "",
 
 
  location_f: "", 
 
  container_no_f: "", 
   
  booking_no_f: "",
  date_time_in_f: null,
  date_time_out_f: null,
  truck_cargo_weight_f: 0,
  truck_weight_f: 0,
  net_weight_f: 0,    
  remark_f: "",
  weight_by_f: "",
  accepted_by_f: "",  
  vgm_verified_by_f: "",
  log_by_f: "",
  log_date_time_f: null, 

  gate_in_out_truck_info_f: GATE_TRUCK_INFO.TRUCK_ONLY,
  gate_in_out_truck_dateTime_f: "",
  gate_in_out_truck_weighValue_f: 0,
};

export interface VGMGateInOutInfo {
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
