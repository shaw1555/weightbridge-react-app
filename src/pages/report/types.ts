export interface VGMDeclarationForm {
  transaction_id_f: string;
  customer_id_f: number;
  customer_name_f: string;
  booking_no_f: string;
  port_of_loading_f: string; 
}

export interface Setup {
  setup_id_f: number;
  description_f: string;
  category_f: string;
  option1_f?: string;
  is_default_f?: boolean;
}