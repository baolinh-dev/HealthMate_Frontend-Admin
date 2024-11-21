import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UsersList from "../components/UsersList";
import AdminLayout from "../components/Layout/AdminLayout";

const AdminWorkout = () => {
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
        <p>Đây là trang workout</p>
      </AdminLayout>
    </div>
  );
};

export default AdminWorkout;
