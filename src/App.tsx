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
