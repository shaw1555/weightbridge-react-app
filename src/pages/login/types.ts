// types/auth.ts

export interface LoginRequest {
  loginAccount: string;
  password: string;
}

export interface LoginResponse {
  user_id_f: number;
  accessToken: string;
  refreshToken: string;
  user: {
    login_account_f: string;
    user_name_f?: string;
  };
}

export interface Setup {
  setup_id_f: number;
  description_f: string;
  category_f: string;
  option1_f?: string;
  is_default_f?: boolean;
}