import { ENTITIES } from "../constants";

const ROUTES = {
  Dashboard: "/",

  // Login
  Login: `/${ENTITIES.LOGIN}`,

  // VGM
  VGM_Menu: `/${ENTITIES.VGM_MENU}`,
  //Weigh VGM //
  WeighVGM_List: `/${ENTITIES.WEIGH_VGM}`,
  WeighVGM_Form: (id: string | "new" = "new") => `/${ENTITIES.WEIGH_VGM}/${id}`,

  // Weighing Company Profile
  WeighingCompanyProfile_List: `/${ENTITIES.WEIGHING_COMPANY_PROFILE}`,
  WeighingCompanyProfile_Form: (id: string | "new" = "new") =>
    `/${ENTITIES.WEIGHING_COMPANY_PROFILE}/${id}`,

  // Tariff Setup
  TariffSetup_Menu: `/${ENTITIES.TARIFF_SETUP_MENU}`,

  // Category
  Category_List: `/${ENTITIES.CATEGORY}`,
  Category_Form: (id: string | "new" = "new") => `/${ENTITIES.CATEGORY}/${id}`,

  // Service
  Service_List: `/${ENTITIES.SERVICE}`,
  Service_Form: (id: string | "new" = "new") => `/${ENTITIES.SERVICE}/${id}`,

  // Service Category Mapping
  ServiceCategoryMapping_List: `/${ENTITIES.SERVICE_CATEGORY_MAPPING}`,
  ServiceCategoryMapping_Form: (id: string | "new" = "new") =>
    `/${ENTITIES.SERVICE_CATEGORY_MAPPING}/${id}`,

  // Truck Type
  TruckType_List: `/${ENTITIES.TRUCK_TYPE}`,
  TruckType_Form: (id: string | "new" = "new") =>
    `/${ENTITIES.TRUCK_TYPE}/${id}`,

  // Tariff
  Tariff_List: `/${ENTITIES.TARIFF}`,
  Tariff_Form: (id: string | "new" = "new") => `/${ENTITIES.TARIFF}/${id}`,

  // Tariff Detail
  TariffDetail_List: `/${ENTITIES.TARIFF_DETAIL}`,
  TariffDetail_Form: (id: string | "new" = "new") =>
    `/${ENTITIES.TARIFF_DETAIL}/${id}`,

  // Customer
  Customer_List: `/${ENTITIES.CUSTOMER}`,
  Customer_Form: (id: string | "new" = "new") => `/${ENTITIES.CUSTOMER}/${id}`,

  // Weigh Gate In & Out
  WeighGateInOut_List: `/${ENTITIES.WEIGH_GATE_IN_OUT}`,
  WeighGateInOut_Form: (id: string | "new" = "new") =>
    `/${ENTITIES.WEIGH_GATE_IN_OUT}/${id}`,

  // Permission
  Permission_List: `/${ENTITIES.PERMISSION}`,
  Permission_Form: (id: string | "new" = "new") =>
    `/${ENTITIES.PERMISSION}/${id}`,

  // Setting
  Setting_Menu: `/${ENTITIES.SETTING_MENU}`,

  // Setup
  Setup_List: `/${ENTITIES.SETUP}`,
  Setup_Form: (id: string | "new" = "new") => `/${ENTITIES.SETUP}/${id}`,

  // User
  User_List: `/${ENTITIES.USER}`,
  User_Form: (id: string | "new" = "new") => `/${ENTITIES.USER}/${id}`,

  //Report // 
  Report_Menu: `/${ENTITIES.REPORT_MENU}`,
  VGMDeclarationForm_List: `/${ENTITIES.VGM_DECLARATION_FORM}`,
  ODOOExport_List: `/${ENTITIES.ODOO_EXPORT}`,
};

export default ROUTES;
