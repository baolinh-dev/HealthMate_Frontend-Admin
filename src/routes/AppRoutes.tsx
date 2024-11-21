import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import LoginPage from "../pages/LoginPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
