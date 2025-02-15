import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, User } from "react-feather";
import { useTheme } from "../../context/ThemeContext";
import styled from "styled-components";

const Navbar = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Calendar },
    { path: "/other-bookings", label: "Book slot for other meet", icon: User }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg top-0 z-50 fixed w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                SlotSection
              </span>
            </Link>
            <div className="hidden md:flex items-center ml-10 space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-md
                      transition-all duration-200 ease-in-out
                      ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <StyledWrapper>
            <label htmlFor="theme" className="theme">
              <span className="theme__toggle-wrap">
                <input
                  id="theme"
                  className="theme__toggle"
                  type="checkbox"
                  role="switch"
                  name="theme"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <span className="theme__fill" />
                <span className="theme__icon">
                  <span className="theme__icon-part" />
                  <span className="theme__icon-part" />
                  <span className="theme__icon-part" />
                  <span className="theme__icon-part" />
                  <span className="theme__icon-part" />
                  <span className="theme__icon-part" />
                  <span className="theme__icon-part" />
                  <span className="theme__icon-part" />
                  <span className="theme__icon-part" />
                </span>
              </span>
            </label>
          </StyledWrapper>
        </div>
      </div>
    </nav>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  .theme {
    display: flex;
    align-items: center;
    -webkit-tap-highlight-color: transparent;
  }

  .theme__fill,
  .theme__icon {
    transition: 0.3s;
  }

  .theme__fill {
    background-color: var(--bg);
    display: block;
    mix-blend-mode: difference;
    position: fixed;
    inset: 0;
    height: 100%;
    transform: translateX(-100%);
  }

  .theme__icon,
  .theme__toggle {
    z-index: 1;
  }

  .theme__icon,
  .theme__icon-part {
    position: absolute;
  }

  .theme__icon {
    display: block;
    top: 0.5em;
    left: 0.5em;
    width: 1.5em;
    height: 1.5em;
  }

  .theme__icon-part {
    border-radius: 50%;
    box-shadow: 0.4em -0.4em 0 0.5em hsl(0, 0%, 100%) inset;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
    width: 1em;
    height: 1em;
    transition: box-shadow var(--transDur) ease-in-out,
      opacity var(--transDur) ease-in-out, transform var(--transDur) ease-in-out;
    transform: scale(0.5);
  }

  .theme__icon-part ~ .theme__icon-part {
    background-color: hsl(0, 0%, 100%);
    border-radius: 0.05em;
    top: 50%;
    left: calc(50% - 0.05em);
    transform: rotate(0deg) translateY(0.5em);
    transform-origin: 50% 0;
    width: 0.1em;
    height: 0.2em;
  }

  .theme__icon-part:nth-child(3) {
    transform: rotate(45deg) translateY(0.45em);
  }

  .theme__icon-part:nth-child(4) {
    transform: rotate(90deg) translateY(0.45em);
  }

  .theme__icon-part:nth-child(5) {
    transform: rotate(135deg) translateY(0.45em);
  }

  .theme__icon-part:nth-child(6) {
    transform: rotate(180deg) translateY(0.45em);
  }

  .theme__icon-part:nth-child(7) {
    transform: rotate(225deg) translateY(0.45em);
  }

  .theme__icon-part:nth-child(8) {
    transform: rotate(270deg) translateY(0.5em);
  }

  .theme__icon-part:nth-child(9) {
    transform: rotate(315deg) translateY(0.5em);
  }

  .theme__label,
  .theme__toggle,
  .theme__toggle-wrap {
    position: relative;
  }

  .theme__toggle,
  .theme__toggle:before {
    display: block;
  }

  .theme__toggle {
    background-color: hsl(48, 90%, 85%);
    border-radius: 25% / 50%;
    box-shadow: 0 0 0 0.125em var(--primaryT);
    padding: 0.25em;
    width: 6em;
    height: 3em;
    -webkit-appearance: none;
    appearance: none;
    transition: background-color var(--transDur) ease-in-out,
      box-shadow 0.15s ease-in-out, transform var(--transDur) ease-in-out;
  }

  .theme__toggle:before {
    background-color: hsl(48, 90%, 55%);
    border-radius: 50%;
    content: "";
    width: 2.5em;
    height: 2.5em;
    transition: 0.3s;
  }

  .theme__toggle:focus {
    box-shadow: 0 0 0 0.125em var(--primary);
    outline: transparent;
  }

  /* Checked */
  .theme__toggle:checked {
    background-color: hsl(198, 90%, 15%);
  }

  .theme__toggle:checked:before,
  .theme__toggle:checked ~ .theme__icon {
    transform: translateX(3em);
  }

  .theme__toggle:checked:before {
    background-color: hsl(198, 90%, 55%);
  }

  .theme__toggle:checked ~ .theme__fill {
    transform: translateX(0);
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(1) {
    box-shadow: 0.2em -0.2em 0 0.2em hsl(0, 0%, 100%) inset;
    transform: scale(1);
    top: 0.2em;
    left: -0.2em;
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part ~ .theme__icon-part {
    opacity: 0;
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(2) {
    transform: rotate(45deg) translateY(0.8em);
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(3) {
    transform: rotate(90deg) translateY(0.8em);
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(4) {
    transform: rotate(135deg) translateY(0.8em);
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(5) {
    transform: rotate(180deg) translateY(0.8em);
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(6) {
    transform: rotate(225deg) translateY(0.8em);
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(7) {
    transform: rotate(270deg) translateY(0.8em);
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(8) {
    transform: rotate(315deg) translateY(0.8em);
  }

  .theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(9) {
    transform: rotate(360deg) translateY(0.8em);
  }

  .theme__toggle-wrap {
    margin: 0 0.75em;
  }

  @supports selector(:focus-visible) {
    .theme__toggle:focus {
      box-shadow: 0 0 0 0.125em var(--primaryT);
    }

    .theme__toggle:focus-visible {
      box-shadow: 0 0 0 0.125em var(--primary);
    }
  }
`;

export default Navbar;
