const ROUTES = {
  Dashboard: "/",

  // Login
  Login: "/Login",

  //VGM_Menu
  VGM_Menu: "/VGM_Menu",

  //weighingCompanyProfile
  WeighingCompanyProfile_List: "/WeighingCompanyProfile",
  WeighingCompanyProfile_Form: (id: string | "new" = "new") =>
    `/WeighingCompanyProfile/${id}`,

  //TariffSetup_List
  TariffSetup_Menu: "/TariffSetup",

  // Category
  Category_List: "/Category",
  Category_Form: (id: string | "new" = "new") => `/Category/${id}`,

  // Service
  Service_List: "/Service",
  Service_Form: (id: string | "new" = "new") => `/Service/${id}`,


  // Service Category Mapping
  ServiceCategoryMapping_List: "/ServiceCategoryMapping",
  ServiceCategoryMapping_Form: (id: string | "new" = "new") => `/ServiceCategoryMapping/${id}`,

  // TruckType
  TruckType_List: "/TruckType",
  TruckType_Form: (id: string | "new" = "new") => `/TruckType/${id}`,

  //Tariff
  Tariff_List: "/Tariff",
  Tariff_Form: (id: string | "new" = "new") => `/Tariff/${id}`,

  //Tariff Detail
  TariffDetail_List: "/TariffDetail",
  TariffDetail_Form: (id: string | "new" = "new") => `/TariffDetail/${id}`,

  // Customer
  Customer_List: "/Customer",
  Customer_Form: (id: string | "new" = "new") => `/Customer/${id}`,

  // WeighGateInOut
  WeighGateInOut_List: "/WeighGateInOut",
  WeighGateInOut_Form: (id: string | "new" = "new") => `/WeighGateInOut/${id}`,

  // Permission
  Permission_List: "/Permission",
  Permission_Form: (id: string | "new" = "new") => `/Permission/${id}`,

  //Setting
  Setting_Menu: "/Setting",

  // Setup
  Setup_List: "/Setup",
  Setup_Form: (id: string | "new" = "new") => `/Setup/${id}`,

  // User
  User_List: "/User",
  User_Form: (id: string | "new" = "new") => `/User/${id}`,
};

export default ROUTES;
