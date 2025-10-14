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
import ServiceListPage from "./pages/service/ServiceListPage";
import ServiceFormPage from "./pages/service/ServiceFormPage";
import TariffListPage from "./pages/tariff/TariffListPage";
import TariffFormPage from "./pages/tariff/TariffFormPage";
import CustomerListPage from "./pages/customer/CustomerListPage";
import CustomerFormPage from "./pages/customer/CustomerFormPage";
import PermissionListPage from "./pages/permission/PermissionListPage";
import PermissionFormPage from "./pages/permission/PermissionFormPage";
import SetupListPage from "./pages/setup/SetupListPage";
import SetupFormPage from "./pages/setup/SetupFormPage";
import UserListPage from "./pages/user/UserListPage";
import UserFormPage from "./pages/user/UserFormPage";

import ROUTES from "./routes";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { NAV_LINKS } from "./config/navLinks";

const AppContent: React.FC = () => {
  const location = useLocation();

  const links = NAV_LINKS;

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
          path={ROUTES.Service_List}
          element={
            <PrivateRoute>
              <ServiceListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/service/:id"
          element={
            <PrivateRoute>
              <ServiceFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.Tariff_List}
          element={
            <PrivateRoute>
              <TariffListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tariff/:id"
          element={
            <PrivateRoute>
              <TariffFormPage />
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

        <Route
          path={ROUTES.Setup_List}
          element={
            <PrivateRoute>
              <SetupListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/setup/:id"
          element={
            <PrivateRoute>
              <SetupFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.User_List}
          element={
            <PrivateRoute>
              <UserListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <UserFormPage />
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
