const ROUTES = {
  Dashboard: "/",

  // Login
  Login: "/Login",

  // Category
  Category_List: "/Category",
  Category_Form: (id: string | "new" = "new") => `/Category/${id}`,

  // Customer
  Customer_List: "/Customer",
  Customer_Form: (id: string | "new" = "new") => `/Customer/${id}`,

  // Permission
  Permission_List: "/Permission",
  Permission_Form: (id: string | "new" = "new") => `/Permission/${id}`,

   // Setup
  Setup_List: "/Setup",
  Setup_Form: (id: string | "new" = "new") => `/Setup/${id}`,
};

export default ROUTES;
