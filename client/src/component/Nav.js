import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = ({ logout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/">
          <img
            className="nav-logo-img"
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {/* <span className="nav-link">How it Works</span> */}
        <button onClick={handleLogout} className="nav-button">
          {localStorage.getItem("auth-token") ? "Log Out" : "Sign In"}
        </button>
      </div>
    </nav>
  );
};
export default Nav;
