import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminPage from "../pages/AdminHome";
import AdminUsers from "../pages/AdminUsers";
import AdminBlog from "../pages/AdminBlog";
import AdminWorkout from "../pages/AdminWorkout";
import LoginPage from "../pages/LoginPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUsers />} /> 
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/workout" element={<AdminWorkout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
