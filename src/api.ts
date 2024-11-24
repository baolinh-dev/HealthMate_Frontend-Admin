import { log } from "console";

const API_BASE_URL = "http://localhost:5004"; 

interface LoginResponse {
  token?: string;
  user?: {
    role: string;
  };
  message?: string;
}  
interface AddUserResponse {
  message: string;
}

export const addUser = async (userData: { name: string; email: string; password: string; role: string }, token: string): Promise<AddUserResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Error adding user");
    }

    return await response.json(); // Return response with message
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const loginAdmin = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed'); // Ném lỗi nếu phản hồi không thành công
  }

  return response.json();
};

export const getUsers = async (token: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users'); // Ném lỗi nếu phản hồi không thành công
  }

  return response.json();
};


// Sửa thông tin người dùng
export const editUser = async (token: string, email: string, updatedData: { name?: string, password?: string, role?: string }): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/users/${email}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Lấy dữ liệu lỗi nếu có
    throw new Error(errorData.message || 'Failed to update user');
  }

  return response.json(); // Trả về kết quả thành công
};


// Xóa người dùng
export const deleteUser = async (email: string, token: string): Promise<any> => {   
  const response = await fetch(`${API_BASE_URL}/users/${email}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete user');
  }

  return response.json();
};

