import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import "./Register.css"; 

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate(); // <-- Initialize useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const resource = await axios.post("http://127.0.0.1:8000/api/register", form);
      localStorage.setItem("token", resource.data.token);
      alert("Registration Successful! Please log in.");
      
      // FIX: Redirect to the login page after successful registration
      navigate("/login"); 

    } catch (error) {
      alert("Registration Failed");
    }
  };

  const goToLogin = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/login");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 border-0 register-card"
        // Style can be moved to Register.css for consistency
      >
        <img src="register.png" alt="Register" className="register-img" />

        <h3 className="text-center mb-4 fw-bold">Create Your Account</h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            name="name"
            type="text"
            className="form-control register-input"
            placeholder="Enter your full name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            name="email"
            type="email"
            className="form-control register-input"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Password</label>
          <input
            name="password"
            type="password"
            className="form-control register-input"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-primary w-100 register-btn"
          onClick={register}
        >
          Register
        </button>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          {/* FIX: Use an onClick handler with navigate for smooth routing */}
          <a href="#" onClick={goToLogin} className="text-primary register-link">
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register;