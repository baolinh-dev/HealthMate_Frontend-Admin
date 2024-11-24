import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Sidebar: React.FC = () => {
  return (
    <div style={sidebarStyle}>
      <div style={logoContainer}>
        <img src={logo} alt="Logo" style={logoStyle} />
      </div>
      <nav>
        <ul style={navListStyle}>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/admin">
              Home
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/admin/users">
              Users
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/admin/blog">
              Blog
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/admin/workout">
              Workout
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const sidebarStyle: React.CSSProperties = {
  width: "20%",
  backgroundColor: "#f4f4f4",
  padding: "20px",
  boxSizing: "border-box",
};

const logoContainer: React.CSSProperties = {
  display: "flex",
  border: "1px solid #ccc",
  justifyContent: "center",
  alignItems: "center",
};

const logoStyle: React.CSSProperties = {
  width: "120px",
  height: "120px",
};

const navListStyle: React.CSSProperties = {
  listStyleType: "none",
  padding: 0,
};

const navListItemStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const navListTextStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "15px 0 15px 15px",
  display: "flex", 
  borderRadius: "20px",
  color: "#333", // Thay đổi màu chữ theo ý bạn
  textDecoration: "none", // Bỏ gạch chân
};

export default Sidebar;
