import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout, Clock, Users,
  LogOut, User, Home,
  Mail, Phone, Edit
} from 'react-feather';

const Sidebar = ({ username, isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const userDetails = {
    email: "user@example.com",
    phone: "+1 234 567 890",
    role: "Premium Member"
  };

  const navItems = useMemo(() => [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/other-bookings', label: 'Other Bookings', icon: Clock },
    { path: '/meetings', label: 'Meetings', icon: Users },

  ], []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <motion.div
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 shadow-lg flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 z-50`}
    >
      {/* App Logo and Name */}
      <div className="p-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <Layout className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
              >
                SlotSection
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Collapse Toggle */}
      {/* <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        )}
      </button> */}

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg mx-2
                  transition-all duration-200 ease-in-out group
                  ${active 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${active ? 'scale-110' : 'group-hover:scale-110 transition-transform'}`} />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`flex items-center ${isOpen ? 'space-x-3' : 'justify-center'} px-2 py-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
            onMouseEnter={() => setShowUserInfo(true)}
            onMouseLeave={() => setShowUserInfo(false)}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-hidden"
              >
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {username || 'User Name'}
                </h3>
              </motion.div>
            )}
          </motion.div>

          {/* User Info Popup */}
          <AnimatePresence>
            {showUserInfo && isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-600"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{userDetails.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{userDetails.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{userDetails.role}</span>
                  </div>
                  <button className="w-full mt-2 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                    <span>Update Profile</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={handleLogout}
          className={`mt-4 w-full flex items-center ${isOpen ? 'justify-start space-x-2' : 'justify-center'} px-2 py-2 
            text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 
            rounded-lg transition-all duration-200`}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;