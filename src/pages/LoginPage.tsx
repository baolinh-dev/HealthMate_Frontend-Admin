import React, { useState } from "react";
import { loginAdmin } from "../apis/usersApi";
import logo from "../assets/logo.png";

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
      setError(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.headerForm}>
          <img src={logo} alt="Logo" style={styles.logo} /> 
          <div style={styles.titleContainer}>

          <h2 style={styles.title}>Admin Login</h2>
          </div>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          style={styles.button}
        >
          Login
        </button> 
        <p style={styles.signUpText}>
          If you don't have an account,{" "}
          <a href="/signup" style={styles.link}>
            Sign up here
          </a>.
        </p>
      </form>
    </div>
  );
};

// Định nghĩa CSS dưới dạng React.CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Arial', sans-serif",
  }, 
  headerForm: {
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center"
  },
  logo: {
    width: "120px",
    height: "120px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  }, 
  titleContainer: {
    marginBottom: "1rem"
  },
  title: {
    textAlign: "center",
    margin: "0", 
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.6rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#B22222",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "#ff0000",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  }, 
  signUpText: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#333",
  },
  link: {
    color: "#1E90FF",
    textDecoration: "none",
  },
};

export default LoginPage;
