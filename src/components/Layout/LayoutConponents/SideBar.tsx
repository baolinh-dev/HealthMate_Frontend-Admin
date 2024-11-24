import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillAppstore, AiFillFileText } from "react-icons/ai"; // Import icons 
import { GiWeightLiftingUp } from "react-icons/gi";
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
              <AiFillHome style={iconStyle} /> Home
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/admin/users">
              <AiFillAppstore style={iconStyle} /> Users
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/admin/blog">
              <AiFillFileText style={iconStyle} /> Blog
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/admin/workout">
              <GiWeightLiftingUp style={iconStyle} /> Workout
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link style={navListTextStyle} to="/">
              <AiFillHome style={iconStyle} /> Logout
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
  alignItems: "center",
  borderRadius: "20px",
  color: "#333",
  textDecoration: "none",
};

const iconStyle: React.CSSProperties = {
  marginRight: "10px",  // Add space between icon and text
};

export default Sidebar;
