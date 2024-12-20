import React, { useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  deleteUser,
  editUser,
  getUserById,
} from "../../apis/usersApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./UsersManagementStyles"; // Import the styles

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  totalCaloriesBurned?: number;
} 

interface UserApiResponse {
  user: {
    name: string;
    email: string;
    role: string;
  };
  totalCaloriesBurned: number;
}


const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
  const [showEditUserForm, setShowEditUserForm] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "user",
    totalCaloriesBurned: 0,
  });
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showUserDetailModal, setShowUserDetailModal] =
    useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const usersData = await getUsers(token, currentPage, 10, searchQuery); // Đã truyền page và limit
        setUsers(usersData.users);
        setTotalPages(usersData.totalPages); // Cập nhật số trang tổng cộng
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, searchQuery]); // Chạy lại khi currentPage thay đổi

  const handleShowUserDetail = async (userId: string) => { 
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("You must be logged in to view user details.");
      return;
    }
  
    try {
      // Sử dụng `any` cho `userFromApi`
      const userFromApi: any = await getUserById(userId, token); 
  
      // Tạo đối tượng `user` từ dữ liệu API
      const user: User = {
        _id: userId, // Gán giá trị id từ userId
        name: userFromApi.user.name,
        email: userFromApi.user.email,
        role: userFromApi.user.role,
        totalCaloriesBurned: userFromApi.totalCaloriesBurned,
        password: "", // Hoặc một giá trị mặc định nếu cần thiết 
      };
  
      setUserDetail(user);
      setShowUserDetailModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("An error occurred while fetching user details.");
    }
  };
  
  
    

  const handleAddUser = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("You must be logged in to add users.");
      return;
    }
  
    try {
      const response = await addUser(newUser, token);
  
      if (response.message === "User added successfully") {
        // Kiểm tra và bổ sung giá trị totalCalories nếu cần
        const newUserWithTotalCalories = { ...newUser, totalCalories: 0 };
        setUsers((prevUsers) => [...prevUsers, newUserWithTotalCalories]);
        toast.success("User added successfully.");
        setShowAddUserForm(false);
        setNewUser({ _id: "", name: "", email: "", password: "", role: "user" }); // After adding a user
        setUserToEdit(null); // After editing a user
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("An error occurred while adding the user.");
    }
  };
  

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
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== email)
        );
        toast.success("User deleted successfully.");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUser((prev) => ({ ...prev, role: e.target.value }));
  };

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
            users.map((user) =>
              user.email === userToEdit.email ? userToEdit : user
            )
          );
          toast.success("User updated successfully.");
          setNewUser({ _id: "", name: "", email: "", password: "", role: "user" }); // After adding a user
          setUserToEdit(null); // After editing a user
          setShowEditUserForm(false);
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
      <h2>Healthmate - User Management</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <div style={styles.searchContainer}>
            <input
              type="text"
              style={styles.inputSearch} // Use imported styles
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or role"
            />
            <button
              onClick={() => setShowAddUserForm(true)}
              style={styles.addButton}
            >
              Add
            </button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: "30%" }}>Name</th>
                <th style={{ ...styles.th, width: "25%" }}>Email</th>
                <th style={{ ...styles.th, width: "15%" }}>Password</th>
                <th style={{ ...styles.th, width: "10%" }}>Role</th>
                <th style={{ ...styles.th, width: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>**********</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => {
                        setUserToEdit(user);
                        setShowEditUserForm(true);
                      }}
                      style={styles.editButton} // Use imported styles
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.email)}
                      style={styles.deleteButton} // Use imported styles
                    >
                      Delete
                    </button>
                    <button
                        onClick={() => handleShowUserDetail(user._id)}
                        style={styles.viewButton}
                      >
                        Show
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div style={styles.paginationContainer}>
        <div style={styles.pagination}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={styles.paginationButton}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            style={styles.paginationButton}
          >
            Next
          </button>
        </div>
      </div>

      {showUserDetailModal && userDetail && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>User Details</h3>
            <p>
              <strong>Name:</strong> {userDetail.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetail.email}
            </p>
            <p>
              <strong>Total Calories Consumed:</strong>{" "}
              {userDetail.totalCaloriesBurned} kcal
            </p>
            <button
              onClick={() => setShowUserDetailModal(false)}
              style={styles.deleteButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showAddUserForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Add New User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
            >
              <div style={styles.formField}>
                <label style={styles.formFieldLabel}>Name:</label>
                <input
                  style={styles.formFieldInput}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.formField}>
                <label style={styles.formFieldLabel}>Email:</label>
                <input
                  style={styles.formFieldInput}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.formField}>
                <label style={styles.formFieldLabel}>Password:</label>
                <input
                  style={styles.formFieldInput}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.formField}>
                <label style={styles.formFieldLabel}>Role:</label>
                <select
                  style={styles.formFieldSelect}
                  name="role"
                  value={newUser.role}
                  onChange={handleRoleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ ...styles.addButton, marginRight: "12px" }}
              >
                Add User
              </button>
              <button
                onClick={() => setShowAddUserForm(false)}
                style={styles.deleteButton}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditUserForm && userToEdit && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditUser();
              }}
            >
              <div style={styles.formField}>
                <label style={styles.formFieldLabel}>Name:</label>
                <input
                  type="text"
                  name="name"
                  style={styles.formFieldInput}
                  value={userToEdit.name}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div style={styles.formField}>
                <label style={styles.formFieldLabel}>Email:</label>
                <input
                  style={styles.formFieldInput}
                  type="email"
                  name="email"
                  value={userToEdit.email}
                  onChange={handleEditInputChange}
                  required
                  disabled
                />
              </div>
              <div style={styles.formField}>
                <label style={styles.formFieldLabel}>Password:</label>
                <input
                  style={styles.formFieldInput}
                  type="password"
                  name="password"
                  value={userToEdit.password}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div style={styles.formField}>
                <label style={styles.formFieldLabel}>Role:</label>
                <select
                  style={styles.formFieldSelect}
                  name="role"
                  value={userToEdit.role}
                  onChange={handleEditRoleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div style={styles.buttonFormContainer}>
                <button
                  type="submit"
                  style={{ ...styles.addButton, marginRight: "12px" }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditUserForm(false)}
                  style={styles.deleteButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UsersManagement;
