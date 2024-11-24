import React, { useState } from "react";
import { loginAdmin } from "../apis/usersApi";

interface User {
  role: string;
}

interface LoginResponse {
  token?: string;
  user?: User;
  message?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data: LoginResponse = await loginAdmin(email, password);

      if (data.token && data.user) {
        if (data.user.role === "admin") {
          localStorage.setItem("token", data.token); // Lưu token
          window.location.href = "/admin"; // Chuyển hướng đến trang Admin
        } else {
          setError("You are not authorized to access this page.");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
