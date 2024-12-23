import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AdminUsers from "../pages/AdminUsers";
import AdminBlog from "../pages/AdminBlog";
import LoginPage from "../pages/LoginPage";
import AdminExcercises from "../pages/AdminExcercises";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/excercises" element={<AdminExcercises />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
