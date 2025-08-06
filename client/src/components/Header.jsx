import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🛍️</div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">PaisaWapas</h1>
              <p className="text-blue-100 text-xs sm:text-sm">Product Management System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                // Sun icon for light mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <Link
              to="/"
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Products
            </Link>
            <Link
              to="/add"
              className="px-4 sm:px-6 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-semibold shadow-md text-sm sm:text-base"
            >
              + Add Product
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
