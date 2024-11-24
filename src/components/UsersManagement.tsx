import React, { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser, editUser } from "../apis/usersApi"; // Thêm editUser vào API
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
  const [showEditUserForm, setShowEditUserForm] = useState<boolean>(false); // Mới thêm
  const [newUser, setNewUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [userToEdit, setUserToEdit] = useState<User | null>(null); // Lưu trữ người dùng cần sửa
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const usersData = await getUsers(token);
        setUsers(usersData.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Hàm thêm người dùng
  const handleAddUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to add users.");
      return;
    }

    try {
      const response = await addUser(newUser, token);

      if (response.message === "User added successfully") {
        setUsers([...users, newUser]); // Cập nhật danh sách người dùng
        toast.success("User added successfully.");
        setShowAddUserForm(false); // Đóng form
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("An error occurred while adding the user.");
    }
  };

  // Hàm xóa người dùng
  const handleDelete = async (email: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to delete users.");
      return;
    }

    try {
      const response = await deleteUser(email, token);

      if (response.message === "User deleted successfully") {
        setUsers(users.filter((user) => user.email !== email)); // Cập nhật danh sách người dùng
        toast.success("User deleted successfully.");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

  // Hàm thay đổi thông tin người dùng mới
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm thay đổi role
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUser((prev) => ({ ...prev, role: e.target.value }));
  };

  // Hàm thay đổi thông tin người dùng đang sửa
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userToEdit) {
      const { name, value } = e.target;
      setUserToEdit((prev) => ({ ...prev!, [name]: value }));
    }
  };

  const handleEditRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (userToEdit) {
      setUserToEdit((prev) => ({ ...prev!, role: e.target.value }));
    }
  };

  const handleEditUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to edit users.");
      return;
    }

    if (userToEdit) {
      try {
        const response = await editUser(token, userToEdit.email, userToEdit);

        if (response.message === "User updated successfully") {
          setUsers(
            filteredUsers.map((user) =>
              user.email === userToEdit.email ? userToEdit : user
            )
          ); // Cập nhật danh sách người dùng
          toast.success("User updated successfully.");
          setShowEditUserForm(false); // Đóng form
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error editing user:", error);
        toast.error("An error occurred while editing the user.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Management</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <div>
            <label>Search Users:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or role"
            />
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Password</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>**********</td>
                  <td style={tdStyle}>{user.role}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => {
                        setUserToEdit(user);
                        setShowEditUserForm(true);
                      }}
                      style={buttonStyle}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.email)}
                      style={buttonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Thêm nút để mở form thêm người dùng */}
      <button onClick={() => setShowAddUserForm(true)} style={addButtonStyle}>
        Add User
      </button>

      {/* Modal - Add User Form */}
      {showAddUserForm && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>Add New User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
            >
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Role:</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleRoleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" style={buttonStyle}>
                Add User
              </button>
            </form>
            <button
              onClick={() => setShowAddUserForm(false)}
              style={buttonStyle}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal - Edit User Form */}
      {showEditUserForm && userToEdit && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>Edit User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditUser();
              }}
            >
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={userToEdit.name}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userToEdit.email}
                  onChange={handleEditInputChange}
                  required
                  disabled
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={userToEdit.password}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div>
                <label>Role:</label>
                <select
                  name="role"
                  value={userToEdit.role}
                  onChange={handleEditRoleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" style={buttonStyle}>
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setShowEditUserForm(false)}
              style={buttonStyle}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

// Style for table, buttons, etc.
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
};

const thStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f4f4f4",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
};

const buttonStyle: React.CSSProperties = {
  marginRight: "10px",
  padding: "5px 10px",
  backgroundColor: "#f44336", // Red color for delete button
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const addButtonStyle: React.CSSProperties = {
  padding: "10px 15px",
  backgroundColor: "#008CBA",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

// Modal Styles
const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

export default UsersManagement;
