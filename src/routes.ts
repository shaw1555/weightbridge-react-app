const ROUTES = {
  Dashboard: "/",

  // Login
  Login: "/Login",

  // Category
  Category_List: "/Category",
  Category_Form: (id: string | "new" = "new") => `/Category/${id}`,

  // Service
  Service_List: "/Service",
  Service_Form: (id: string | "new" = "new") => `/Service/${id}`,

//Tariff
  Tariff_List: "/Tariff",
  Tariff_Form: (id: string | "new" = "new") => `/Tariff/${id}`,

  // Customer
  Customer_List: "/Customer",
  Customer_Form: (id: string | "new" = "new") => `/Customer/${id}`,

  // Permission
  Permission_List: "/Permission",
  Permission_Form: (id: string | "new" = "new") => `/Permission/${id}`,

  // Setup
  Setup_List: "/Setup",
  Setup_Form: (id: string | "new" = "new") => `/Setup/${id}`,

  // User
  User_List: "/User",
  User_Form: (id: string | "new" = "new") => `/User/${id}`,
};

export default ROUTES;
