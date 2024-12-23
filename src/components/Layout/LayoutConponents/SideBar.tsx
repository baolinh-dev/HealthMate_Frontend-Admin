import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillAppstore, AiFillFileText } from "react-icons/ai"; // Import icons  
import { CiLogout } from "react-icons/ci";
import { GiWeightLiftingUp } from "react-icons/gi"; 
import { CgGym } from "react-icons/cg";
import logo from "../../../assets/logo.png";

const Sidebar: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null); // State to track the hovered link

  // Handle mouse over and mouse out
  const handleMouseOver = (id: string) => setHovered(id);
  const handleMouseOut = () => setHovered(null);

  return (
    <div style={sidebarStyle}>
      <div style={logoContainer}>
        <img src={logo} alt="Logo" style={logoStyle} />
      </div>
      <nav>
        <ul style={navListStyle}>
          <li style={navListItemStyle}>
            <Link
              style={getLinkStyle(hovered === "users")}
              to="/admin/users"
              onMouseOver={() => handleMouseOver("users")}
              onMouseOut={handleMouseOut}
            >
              <AiFillAppstore style={iconStyle} /> Users
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link
              style={getLinkStyle(hovered === "exercises")}
              to="/admin/excercises"
              onMouseOver={() => handleMouseOver("exercises")}
              onMouseOut={handleMouseOut}
            >
              <CgGym style={iconStyle} /> Exercises
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link
              style={getLinkStyle(hovered === "blog")}
              to="/admin/blog"
              onMouseOver={() => handleMouseOver("blog")}
              onMouseOut={handleMouseOut}
            >
              <AiFillFileText style={iconStyle} /> Blog
            </Link>
          </li>
          <li style={navListItemStyle}>
            <Link
              style={getLinkStyle(hovered === "logout")}
              to="/"
              onMouseOver={() => handleMouseOver("logout")}
              onMouseOut={handleMouseOut}
            >
              <CiLogout style={iconStyle} /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  function getLinkStyle(isHovered: boolean): React.CSSProperties {
    return {
      ...navListTextStyle,
      backgroundColor: isHovered ? "#B22222" : "#f4f4f4",  
      color: isHovered ? "white" : "#333",   
      transition: "background-color 0.3s ease, color 0.3s ease",
    };  
  }  
};

const sidebarStyle: React.CSSProperties = {
  width: "20%",
  backgroundColor: "#f4f4f4",
  padding: "20px",
  boxSizing: "border-box",
};

const logoContainer: React.CSSProperties = {
  display: "flex",
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
