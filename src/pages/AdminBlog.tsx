import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UsersList from "../components/UsersManagement";
import AdminLayout from "../components/Layout/AdminLayout";
import BlogsTable from "../components/blogs/BlogsTable";

const AdminBlog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Dùng để chuyển hướng

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/login"); // Chuyển hướng đến trang login nếu không có token
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Không hiển thị gì khi chưa đăng nhập
  }

  return (
    <div>
      <AdminLayout>
        <BlogsTable />
      </AdminLayout>
    </div>
  );
};

export default AdminBlog;
