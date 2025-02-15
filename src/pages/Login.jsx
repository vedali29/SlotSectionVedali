import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft } from 'react-feather';
import styled from 'styled-components';
import google from '../assets/google.svg'
import x from '../assets/x.svg'



const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <StyledWrapper className={darkMode ? 'dark' : ''}>
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="form-container">
        <div className="form-wrapper">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label className="text-gray-700 dark:text-gray-300">Email</label>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="text-gray-700 dark:text-gray-300">Password</label>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-gray-700 dark:text-gray-300">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>

            <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>

            <div className="divider">
              <span className="divider-text">or continue with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-button">
                <img src={google} alt="Google" className="w-5 h-5" />
    
              </button>
              <button type="button" className="social-button">
                <img src={x} alt="Apple" className="w-5 h-5" />
      
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
  background: ${props => props.className && props.className.includes('dark')
    ? 'linear-gradient(to right, #1f2937, #111827)'
    : 'linear-gradient(to right, #f3f4f6, #e5e7eb)'};
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
    background: ${props => props.className && props.className.includes('dark') ? '#1f2937' : 'white'};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  .input-field {
    margin-top: 0.5rem;
    border: 1px solid ${props => props.className && props.className.includes('dark') ? '#374151' : '#e5e7eb'};
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .input {
    width: 100%;
    padding: 0.75rem;
    background: transparent;
    color: ${props => props.className && props.className.includes('dark') ? '#f9fafb' : '#111827'};
    border: none;
    outline: none;

    &::placeholder {
      color: ${props => props.className && props.className.includes('dark') ? '#9ca3af' : '#6b7280'};
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
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
      background: ${props => props.className && props.className.includes('dark') ? '#374151' : '#e5e7eb'};
    }

    .divider-text {
      position: relative;
      padding: 0 0.75rem;
      background: ${props => props.className && props.className.includes('dark') ? '#1f2937' : 'white'};
      color: ${props => props.className && props.className.includes('dark') ? '#9ca3af' : '#6b7280'};
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
    background: ${props => props.className && props.className.includes('dark') ? '#374151' : 'white'};
    border: 1px solid ${props => props.className && props.className.includes('dark') ? '#4b5563' : '#e5e7eb'};
    border-radius: 0.5rem;
    color: ${props => props.className && props.className.includes('dark') ? '#f9fafb' : '#111827'};
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
`;


export default Login;
