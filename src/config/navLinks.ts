import ROUTES from "./routes";
import { type HeaderLink } from "./types";
import { PERMISSIONS } from "../constants";

export const NAV_LINKS: HeaderLink[] = [
  {
    label: "Dashboard",
    path: ROUTES.Dashboard,
    permission: PERMISSIONS.VIEW_DASHBOARD,
  },

  {
    label: "Master Setup",
    path: ROUTES.Setup_List,
    permission: PERMISSIONS.VIEW_MASTER_SETUP,
  },

  {
    label: "Customers",
    path: ROUTES.Customer_List,
    permission: PERMISSIONS.VIEW_CUSTOMER,
  },

  {
    label: "Weigh Gate In & Out",
    path: ROUTES.WeighGateInOut_List,
    permission: PERMISSIONS.VIEW_WEIGH_GATE_IN_OUT,
  },

  {
    label: "VGM",
    path: ROUTES.VGM_Menu,
    permission: PERMISSIONS.VIEW_MENU_VGM,
    children: [
      {
        label: "Weigh VGM",
        path: ROUTES.WeighVGM_List,
        permission: PERMISSIONS.VIEW_WEIGH_VGM,
      },  
      {
        label: "Weighing Company Profile",
        path: ROUTES.WeighingCompanyProfile_List,
        permission: PERMISSIONS.VIEW_WEIGHING_COMPANY_PROFILE,
      },
    ],
  },

  {
    label: "Tariff Setup",
    path: ROUTES.TariffSetup_Menu,
    permission: PERMISSIONS.VIEW_MENU_TARIFF_SETUP,
    children: [
      {
        label: "Services",
        path: ROUTES.Service_List,
        permission: PERMISSIONS.VIEW_SERVICE,
      },
      {
        label: "Categorys",
        path: ROUTES.Category_List,
        permission: PERMISSIONS.VIEW_CATEGORY,
      },
      {
        label: "Service Category Mapping",
        path: ROUTES.ServiceCategoryMapping_List,
        permission: PERMISSIONS.VIEW_SERVICE_CATEGORY_MAPPING,
      },
      {
        label: "Truck Types",
        path: ROUTES.TruckType_List,
        permission: PERMISSIONS.VIEW_TRUCK_TYPE,
      },
      {
        label: "Tariffs",
        path: ROUTES.Tariff_List,
        permission: PERMISSIONS.VIEW_TARIFF_SETUP,
      },
      {
        label: "Tariff Details",
        path: ROUTES.TariffDetail_List,
        permission: PERMISSIONS.VIEW_TARIFF_DETAIL,
      },
    ],
  },

  {
    label: "Setting",
    path: ROUTES.Setting_Menu,
    permission: PERMISSIONS.VIEW_MENU_SETTING,
    children: [
      {
        label: "Users",
        path: ROUTES.User_List,
        permission: PERMISSIONS.VIEW_USER,
      },
      {
        label: "Permissions",
        path: ROUTES.Permission_List,
        permission: PERMISSIONS.VIEW_PERMISSION,
      },
    ],
  },

  {
    label: "Reports",
    path: ROUTES.Report_Menu,
    permission: PERMISSIONS.VIEW_MENU_REPORT,
    children: [       
      {
        label: "VGM Declaration Form",
        path: ROUTES.VGMDeclarationForm_List,
        permission: PERMISSIONS.VIEW_VGM_DECLARATION_FORM,
      },
      {
        label: "ODOO Export",
        path: ROUTES.ODOOExport_List,
        permission: PERMISSIONS.VIEW_ODOO_EXPORT,
      },
    ],
  },

];
