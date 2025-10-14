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
  {
    label: "Customers",
    path: ROUTES.Customer_List,
    permission: "View_Customer",
  },
  {
    label: "Permissions",
    path: ROUTES.Permission_List,
    permission: "View_Permission",
  },
  { label: "Setups", path: ROUTES.Setup_List, permission: "View_Setup" },
];
