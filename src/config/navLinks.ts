import ROUTES from "../routes";
import { type HeaderLink } from "../types/navigation"; // ✅ use shared type

export const NAV_LINKS: HeaderLink[] = [
  { label: "Dashboard", path: ROUTES.Dashboard, permission: "View_Dashboard" },
  {
    label: "Customers",
    path: ROUTES.Customer_List,
    permission: "View_Customer",
  },

  { label: "Master Setup", path: ROUTES.Setup_List, permission: "View_Setup" },
  {
    label: "Tariff Setup",
    path: ROUTES.TariffSetup_Menu,
    permission: "Menu_TariffSetup",
    children: [
      {
        label: "Categorys",
        path: ROUTES.Category_List,
        permission: "View_Category",
      },
      {
        label: "Services",
        path: ROUTES.Service_List,
        permission: "View_Service",
      },
      { label: "Tariffs", path: ROUTES.Tariff_List, permission: "View_Tariff" },
    ],
  },

  {
    label: "Setting",
    path: ROUTES.Setting_Menu,
    permission: "Menu_Setting",
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
