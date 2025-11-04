export interface ServiceCategoryMapping {
  service_category_mapping_id_f: number;
  service_id_f: number;
  service_f: string;
  category_id_f: number; 
  category_f: string;
}

export interface Service {
  service_id_f: number;
  service_f: string;
}

export interface Category {
  category_id_f: number;
  category_f: string;
}
