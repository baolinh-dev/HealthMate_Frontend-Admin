const API_BASE_URL = "http://localhost:5003"; // Thay đổi nếu cần

interface LoginResponse {
  token?: string;
  user?: {
    role: string;
  };
  message?: string;
}

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