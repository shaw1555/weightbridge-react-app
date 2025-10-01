const ROUTES = {
  Dashboard: "/",

  // Login
  Login: "/Login",

  // Category
  Category_List: "/Category",
  Category_Form: (id: string | "new" = "new") => `/Category/${id}`,

};

export default ROUTES;
