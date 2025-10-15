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
  log_by_f: string;
  log_date_time_f: string;
}

export interface Tariff {
  tariff_id_f: number;
  tariff_no_f: string; 
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
