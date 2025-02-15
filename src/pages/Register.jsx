import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft } from "react-feather";
import styled from "styled-components";
import google from '../assets/google.svg'
import x from '../assets/x.svg'



const Register = ({ setIsLoggedIn }) => {

  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    countryCode: "+1", // Default country code
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <StyledWrapper className={darkMode ? "dark" : ""}>
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="form-container">
        <div className="form-wrapper">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label className="text-gray-700 dark:text-gray-300">
                Username
              </label>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter your Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="text-gray-700 dark:text-gray-300">Email</label>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <div className="input-field flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="inputcode"
                >
                  <option className="option" value="+1">+1 (USA)</option>
                  <option className="option" value="+91">+91 (India)</option>
                  <option className="option" value="+44">+44 (UK)</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="tel"
                  placeholder="Enter your Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input w-2/3"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Confirm your Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Register
            </button>

            <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Login
              </Link>
            </p>

            <div class="divider">
              <span class="divider-text">or continue with</span>
            </div>

            <div class="social-buttons">
              <button type="button" class="social-button">
                <img
                  src={google}
                  alt="Google"
                  class="w-5 h-5"
                />
              </button>
              <button type="button" class="social-button">
                <img
                  src={x}
                  alt="Apple"
                  class="w-5 h-5"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  background: ${(props) =>
    props.className?.includes("dark")
      ? "linear-gradient(to right, #1f2937, #111827)"
      : "linear-gradient(to right, #f3f4f6, #e5e7eb)"};
  transition: background 0.3s ease;

  .form-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .form-wrapper {
    width: 100%;
    max-width: 440px;
    animation: slideUp 0.5s ease-out;
  }

  .form {
    background: ${(props) =>
      (props.className || "").includes("dark") ? "#1f2937" : "white"};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  .input-field {
    margin-top: 0.5rem;
    border: 1px solid
      ${(props) =>
        (props.className || "").includes("dark") ? "#374151" : "#e5e7eb"};
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .input {
    width: 100%;
    padding: 0.75rem;
    background: transparent;
    color: ${(props) =>
      (props.className || "").includes("dark") ? "#f9fafb" : "#111827"};
    border: none;
    outline: none;

    &::placeholder {
      color: ${(props) =>
        (props.className || "").includes("dark") ? "#9ca3af" : "#6b7280"};
    }
  }



  .inputcode {
   width: 45%;
    padding: 0.75rem;
    background: transparent;
    color: ${(props) =>
      (props.className || "").includes("dark") ? "#f9fafb" : "#111827"};
    border: none;
    outline: none;

    &::placeholder {
      color: ${(props) =>
        (props.className || "").includes("dark") ? "#9ca3af" : "#6b7280"};
    }
  }

  .option {
  width: 45%;
    background: transparent;
    color: ${(props) =>
      (props.className || "").includes("dark") ? "#f9fafb" : "#111827"};
    border: none;
    outline: none;

    &::placeholder {
      color: ${(props) =>
        (props.className || "").includes("dark") ? "#9ca3af" : "#6b7280"};
    }
  }

  .submit-button {
    width: 100%;
    padding: 0.75rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: background 0.3s ease;

    &:hover {
      background: #2563eb;
    }
  }

  .divider {
    position: relative;
    text-align: center;
    margin: 1.5rem 0;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
      background: ${(props) =>
        (props.className || "").includes("dark") ? "#374151" : "#e5e7eb"};
    }

    .divider-text {
      position: relative;
      padding: 0 0.75rem;
      background: ${(props) =>
        (props.className || "").includes("dark") ? "#1f2937" : "white"};
      color: ${(props) =>
        (props.className || "").includes("dark") ? "#9ca3af" : "#6b7280"};
    }
  }

  .social-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: ${(props) =>
      props.className?.includes("dark") ? "#374151" : "white"};
    border: 1px solid
      ${(props) => (props.className?.includes("dark") ? "#4b5563" : "#e5e7eb")};
    border-radius: 0.5rem;
    color: ${(props) =>
      props.className?.includes("dark") ? "#f9fafb" : "#111827"};
    transition: all 0.3s ease;

    &:hover {
      border-color: #3b82f6;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dark .form-container {
    background: linear-gradient(to right, #1f2937, #111827);
  }

  .dark .form-wrapper {
    animation: slideUp 0.5s ease-out;
  }

  .dark .form {
    background: #1f2937;
    color: #f9fafb;
  }

  .dark .input-field {
    border: 1px solid #374151;
  }

  .dark .input {
    color: #f9fafb;
    &::placeholder {
      color: #9ca3af;
    }
  }

  .dark .submit-button {
    background: #3b82f6;
    &:hover {
      background: #2563eb;
    }
  }

  .dark .divider::before {
    background: #374151;
  }

  .dark .divider-text {
    background: #1f2937;
    color: #9ca3af;
  }

  .dark .social-button {
    background: #374151;
    border: 1px solid #4b5563;
    color: #f9fafb;
    &:hover {
      border-color: #3b82f6;
    }
  }
`;

export default Register;
