import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // <-- Initialize useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const resource = await axios.post(
        "http://127.0.0.1:8000/api/login",
        form
      );
      localStorage.setItem("token", resource.data.token);
      alert("Login Successful!");
      navigate("/home"); 
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      {/* ---------- INTERNAL CSS ---------- */}
      <style>
        {`
          .login-card {
            width: 420px;
            border-radius: 12px;
          }

          .login-img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            margin: 0 auto 15px auto;
            display: block;
            opacity: 0.9;
          }

          .login-input {
            border-radius: 12px !important;
          }

          .login-btn {
            border-radius: 12px;
            font-weight: 600;
            padding: 10px;
          }

          .register-link {
            text-decoration: none;
            font-weight: bold;
          }
        `}
      </style>

      {/* ---------- UI ---------- */}
      <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4 border-0 login-card">

          <img src="loginn.png" alt="Login" className="login-img" />


          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              name="email"
              type="email"
              className="form-control login-input"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              name="password"
              type="password"
              className="form-control login-input"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-primary w-100 login-btn"
            onClick={login}
          >
            Login
          </button>

          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <a href="/" className="text-primary register-link">
              Register
            </a>
          </p>

        </div>
      </div>
    </>
  );
};

export default Login;