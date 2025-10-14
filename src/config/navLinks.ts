import ROUTES from "../routes";

export interface NavLink {
  label: string;
  path: string;
  permission: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Dashboard", path: ROUTES.Dashboard, permission: "View_Dashboard" },
  {
    label: "Categorys",
    path: ROUTES.Category_List,
    permission: "View_Category",
  },
    { label: "Services", path: ROUTES.Service_List, permission: "View_Service" },
     { label: "Tariffs", path: ROUTES.Tariff_List, permission: "View_Tariff" },
  {
    label: "Customers",
    path: ROUTES.Customer_List,
    permission: "View_Customer",
  },
  { label: "Setups", path: ROUTES.Setup_List, permission: "View_Setup" },

  { label: "Users", path: ROUTES.User_List, permission: "View_User" },
  {
    label: "Permissions",
    path: ROUTES.Permission_List,
    permission: "View_Permission",
  },
];
