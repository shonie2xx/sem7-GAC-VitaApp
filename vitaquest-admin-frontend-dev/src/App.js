import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@vaadin/icon";
import "@vaadin/vaadin-lumo-styles/vaadin-iconset";
import reportWebVitals from "./reportWebVitals";
import "./components/flex.css";
import "./components/card.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import PageAdmin from "./components/pages/admin-page/page-admin";
import PageLogin from "./components/pages/login-page/page-login";
import Drawer from "./components/drawer/drawer";
import Header from "./components/header/header";
import { useIsAuthenticated } from "@azure/msal-react";
import PageBadges from "./components/pages/badges-page/page-badges";
import { PageBadgeDetails } from "./components/pages/badge-details-page/page-badge-details";
import PageActivities from "./components/pages/activities-page/page-activities";
import PageCategories from "./components/pages/categories-page/page-categories";
import PageChallenges from "./components/pages/challenges-page/page-challenges";

function App() {
  const ProtectedRoute = ({ children }) => {
    if (!useIsAuthenticated()) {
      return <PageLogin />;
    }

    return children;
  };

  const WithNav = () => {
    return (
      <div className="flex flex-row" id="wrapper">
        <Drawer />
        <div className="flex flex-column flex-1">
          <Header />
          <Outlet />
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route path="*" element={<Navigate to="/gebruikers" />} />
        <Route element={<WithNav />}>
          <Route
            path="/gebruikers"
            element={
              <ProtectedRoute>
                <PageAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Categorieen"
            element={
              <ProtectedRoute>
                <PageCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Badges"
            element={
              <ProtectedRoute>
                <PageBadges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/badges/:id"
            element={
              <ProtectedRoute>
                <PageBadgeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activiteiten"
            element={
              <ProtectedRoute>
                <PageActivities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <PageChallenges />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
