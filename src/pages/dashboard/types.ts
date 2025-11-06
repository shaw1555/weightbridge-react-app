export interface TodayGroupByCustomerCount {
  customer_name_f: string;
  count_f: number; 
}


export interface TodayGroupByCustomerAmount {
  customer_name_f: string;
  grand_total_amount_f: number; 
}


export interface SevenDayAgoGroupByDateCount {
  date_f: string;
  count_f: number; 
}


export interface SevenDayAgoGroupByDateAmount {
  date_f: string;
  grand_total_amount_f: number; 
}

export interface Setup {
  setup_id_f: number;
  description_f: string;
  category_f: string;
  option1_f?: string;
  is_default_f?: boolean;
}
