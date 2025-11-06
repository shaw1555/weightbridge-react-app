import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PopupProvider } from "./context/PopupContext";
import { usePopup } from "./context/PopupContext";
import { setGlobalPopup } from "./services/apiClient";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/LoginPage";
import CategoryListPage from "./pages/category/CategoryListPage";
import CategoryFormPage from "./pages/category/CategoryFormPage";
import ServiceListPage from "./pages/service/ServiceListPage";
import ServiceFormPage from "./pages/service/ServiceFormPage";
import ServiceCategoryMappingListPage from "./pages/serviceCategoryMapping/ServiceCategoryMappingListPage";
import ServiceCategoryMappingFormPage from "./pages/serviceCategoryMapping/ServiceCategoryMappingFormPage";
import TruckTypeListPage from "./pages/truckType/TruckTypeListPage";
import TruckTypeFormPage from "./pages/truckType/TruckTypeFormPage";
import TariffListPage from "./pages/tariff/TariffListPage";
import TariffFormPage from "./pages/tariff/TariffFormPage";
import TariffDetailListPage from "./pages/tariffDetail/TariffDetailListPage";
import TariffDetailFormPage from "./pages/tariffDetail/TariffDetailFormPage";
import CustomerListPage from "./pages/customer/CustomerListPage";
import CustomerFormPage from "./pages/customer/CustomerFormPage";
import PermissionListPage from "./pages/permission/PermissionListPage";
import PermissionFormPage from "./pages/permission/PermissionFormPage";
import SetupListPage from "./pages/setup/SetupListPage";
import SetupFormPage from "./pages/setup/SetupFormPage";
import UserListPage from "./pages/user/UserListPage";
import UserFormPage from "./pages/user/UserFormPage";
import WeighingCompanyProfileListPage from "./pages/weighingCompanyProfile/WeighingCompanyProfileListPage";
import WeighingCompanyProfileFormPage from "./pages/weighingCompanyProfile/WeighingCompanyProfileFormPage";
import WeighGateInOutListPage from "./pages/weighGateInOut/WeighGateInOutListPage";
import WeighGateInOutFormPage from "./pages/weighGateInOut/WeighGateInOutFormPage";
import ROUTES from "./config/routes";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { NAV_LINKS } from "./config/navLinks";
import { ENTITIES } from "./constants";

const AppContent: React.FC = () => {
  const { showPopup } = usePopup();

  useEffect(() => {
    setGlobalPopup(showPopup);
  }, [showPopup]);

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
          path={ROUTES.WeighGateInOut_List}
          element={
            <PrivateRoute>
              <WeighGateInOutListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.WeighGateInOut_Form(":id")}
          element={
            <PrivateRoute>
              <WeighGateInOutFormPage />
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
          path={ROUTES.Category_Form(":id")}
          element={
            <PrivateRoute>
              <CategoryFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.ServiceCategoryMapping_List}
          element={
            <PrivateRoute>
              <ServiceCategoryMappingListPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.ServiceCategoryMapping_Form(":id")}
          element={
            <PrivateRoute>
              <ServiceCategoryMappingFormPage />
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
          path={ROUTES.Service_Form(":id")}
          element={
            <PrivateRoute>
              <ServiceFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.TruckType_List}
          element={
            <PrivateRoute>
              <TruckTypeListPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.TruckType_Form(":id")}
          element={
            <PrivateRoute>
              <TruckTypeFormPage />
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
          path={ROUTES.Tariff_Form(":id")}
          element={
            <PrivateRoute>
              <TariffFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.TariffDetail_List}
          element={
            <PrivateRoute>
              <TariffDetailListPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.TariffDetail_Form(":id")}
          element={
            <PrivateRoute>
              <TariffDetailFormPage />
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
          path={ROUTES.Customer_Form(":id")}
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
          path={ROUTES.Permission_Form(":id")}
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
          path={ROUTES.Setup_Form(":id")}
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
          path={ROUTES.User_Form(":id")}
          element={
            <PrivateRoute>
              <UserFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.WeighingCompanyProfile_List}
          element={
            <PrivateRoute>
              <WeighingCompanyProfileListPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.WeighingCompanyProfile_Form(":id")}
          element={
            <PrivateRoute>
              <WeighingCompanyProfileFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <PopupProvider>
      <AppContent />
    </PopupProvider>
  </Router>
);

export default App;
