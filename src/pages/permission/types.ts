export interface Permission {
  permission_id_f: number;
  user_id_f: number;
  user_name_f: string;
  form_name_f: string;
  view_f: boolean;
  save_f: boolean;
  update_f: boolean;
  delete_f: boolean;
  modified_by_f: string;
  modified_on_f: string;
}

export interface User { 
  user_id_f: number;
  user_name_f: string;
}

