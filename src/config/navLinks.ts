import ROUTES from "../routes";
import { type HeaderLink } from "../types/navigation"; // ✅ use shared type

export const NAV_LINKS: HeaderLink[] = [
  { label: "Dashboard", path: ROUTES.Dashboard, permission: "View_Dashboard" },

  { label: "Master Setup", path: ROUTES.Setup_List, permission: "View_MasterSetup" },
  {
    label: "Customers",
    path: ROUTES.Customer_List,
    permission: "View_Customer",
  },  
  {
    label: "Weigh Gate In & Out",
    path: ROUTES.WeighGateInOut_List,
    permission: "View_WeighGateInOut",
  },  
  {
    label: "VGM",
    path: ROUTES.VGM_Menu,
    permission: "View_MenuVGM",
    children: [
      {
        label: "Weigh VGM",
        path: "/",
        permission: "",
      },
      {
        label: "VGM Declaration Form",
        path: "/",
        permission: "",
      },
      {
        label: "Weighing Company Profile",
        path: ROUTES.WeighingCompanyProfile_List,
        permission: "View_WeighingCompanyProfile",
      },
    ],
  },
  {
    label: "Tariff Setup",
    path: ROUTES.TariffSetup_Menu,
    permission: "View_MenuTariffSetup",
    children: [
        {
        label: "Services",
        path: ROUTES.Service_List,
        permission: "View_Service",
      },
      {
        label: "Categorys",
        path: ROUTES.Category_List,
        permission: "View_Category",
      },
    
        {
        label: "Service Category Mapping",
        path: ROUTES.ServiceCategoryMapping_List,
        permission: "View_ServiceCategoryMapping",
      },
      {
        label: "Truck Types",
        path: ROUTES.TruckType_List,
        permission: "View_TruckType",
      },
      { label: "Tariffs", path: ROUTES.Tariff_List, permission: "View_TariffSetup" },
      {
        label: "Tariff Details",
        path: ROUTES.TariffDetail_List,
        permission: "View_TariffDetail",
      },
    ],
  },

  {
    label: "Setting",
    path: ROUTES.Setting_Menu,
    permission: "View_MenuSetting",
    children: [
      { label: "Users", path: ROUTES.User_List, permission: "View_User" },
      {
        label: "Permissions",
        path: ROUTES.Permission_List,
        permission: "View_Permission",
      },
    ],
  },
];
