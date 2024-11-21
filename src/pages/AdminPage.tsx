import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UsersList from "../components/UsersList";

const AdminPage = () => {
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
      <UsersList />
    </div>
  );
};

export default AdminPage;
