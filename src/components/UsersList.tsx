import React, { useEffect, useState } from "react";
import { getUsers } from "../api";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage 
      
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const usersData = await getUsers(token); // Truyền token vào hàm getUsers         
        setUsers(usersData.users); // Lưu dữ liệu người dùng vào state
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Đặt loading thành false khi đã lấy dữ liệu hoặc có lỗi
      }
    };

    fetchUsers();
  }, []); // Chỉ gọi 1 lần khi component mount

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang lấy dữ liệu
  }

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.email}>{user.name} - {user.role}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;