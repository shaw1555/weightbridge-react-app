import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/login/LoginPage";
import CategoryListPage from "./pages/category/CategoryListPage";
import CategoryFormPage from "./pages/category/CategoryFormPage";
import CustomerListPage from "./pages/customer/CustomerListPage";
import CustomerFormPage from "./pages/customer/CustomerFormPage";
import PermissionListPage from "./pages/permission/PermissionListPage";
import PermissionFormPage from "./pages/permission/PermissionFormPage";

import ROUTES from "./routes";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

const AppContent: React.FC = () => {
  const location = useLocation();

  const links = [
    {
      label: "Dashboard",
      path: ROUTES.Dashboard,
      permission: "View_Dashboard",
    },
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
  ];

  const showHeader = location.pathname !== ROUTES.Login;

  return (
    <>
      {showHeader && <Header links={links} />}

      <Routes>
        <Route path={ROUTES.Login} element={<LoginPage />} />

        <Route
          path={ROUTES.Dashboard}
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.Category_List}
          element={
            <PrivateRoute>
              <CategoryListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/category/:id"
          element={
            <PrivateRoute>
              <CategoryFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.Customer_List}
          element={
            <PrivateRoute>
              <CustomerListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/customer/:id"
          element={
            <PrivateRoute>
              <CustomerFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.Permission_List}
          element={
            <PrivateRoute>
              <PermissionListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/permission/:id"
          element={
            <PrivateRoute>
              <PermissionFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
