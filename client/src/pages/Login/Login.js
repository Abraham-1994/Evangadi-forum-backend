import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UseContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import "../../App.css";
const Login = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post( "http://localhost:5000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.log("Problem:", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Login to your account</h1>
        <p className="login-subtitle">
          Don't have an account?{" "}
          <Link to="/signup" className="login-link">
            Create a new account
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            className="login-input"
          />
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      
      <div className="login-about-container">
        <p className="login-about-title">About</p>
        <h1 className="login-about-heading">Evangadi Networks</h1>
        <p className="login-about-text">
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p className="login-about-text">
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
          <h2 className="login-footer">
            <Link to="/signup" className="login-link">
              Create a new account
            </Link>
          </h2>
        </p>
      </div>
    </div>
  );
};
export default Login;
