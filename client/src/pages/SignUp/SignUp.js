import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UseContext";
import axios from "axios";
// import "../../App.css";
const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", form);
      const loginRes = await axios.post(
        "http://localhost:5000/api/users/login",
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
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Join the network</h1>
        <Link to="/login" className="signup-link">
          Already have an account?
        </Link>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-form-group">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div className="signup-form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className="signup-input"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="signup-input ms-4"
            />
          </div>
          <div className="signup-form-group">
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div className="signup-form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <button className="signup-button" type="submit">
            Agree and Join
          </button>
        </form>
      </div>
      <div className="signup-about-container">
        <p className="signup-about-title">About</p>
        <p className="signup-about-heading">Evangadi Networks</p>
        <p className="signup-about-text">
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p className="signup-about-text">
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
      </div>
    </div>
  );
};
export default Signup;
