import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, BookOpen, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { div } from "framer-motion/client";
import { handlelogOutState } from "../../state/slices/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navItems = [
    { path: "/home", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/favorites", label: "Favorites" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LearnHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-1">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}

            {/* Auth Buttons */}

            {!token ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition duration-200"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button onClick={() => dispatch(handlelogOutState())}>
                Log Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200 space-y-1">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button onClick={() => dispatch(handlelogOutState())}>
                  Log Out
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
