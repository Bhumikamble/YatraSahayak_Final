import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/userContext.jsx";
import {
  ChevronDown,
  User,
  LogOut,
  Settings,
  MapPin,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProgramsMenu, setShowProgramsMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const programs = [
    "Hotels",
    "Domestic Trips",
    "International Trips",
    "Special Events",
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
    setShowProgramsMenu(false);
  }, [location]);

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="shadow-lg sticky z-50 top-0 bg-gray-900">
      <nav className="px-4 lg:px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full lg:w-auto text-white">
            <Link
              to="/"
              className="flex items-center transition-transform duration-300 hover:scale-105 "
            >
              {/* <img
                src="/api/placeholder/48/48"
                className="mr-3 h-10"
                alt="Logo"
              /> */}
              YatraSahayak
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Navigation Links - Desktop & Mobile */}
          <div
            className={`
            lg:flex lg:items-center lg:w-auto w-full
            ${isMobileMenuOpen ? "block" : "hidden"}
            transition-all duration-300 ease-in-out
          `}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 lg:mt-0 mt-4">
              {/* Home Link */}
              <li className="relative group">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 transition-all duration-300 relative
                    ${isActive ? "text-purple-400" : "text-gray-300"}
                    hover:text-purple-400`
                  }
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>

              {/* Profile Page */}
              <li className="relative group">
                <NavLink
                  to="/allposts"
                  className={({ isActive }) =>
                    `block py-2 px-3 transition-all duration-300 relative
                    ${isActive ? "text-purple-400" : "text-gray-300"}
                    hover:text-purple-400`
                  }
                >
                  Locations
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
              <li className="relative group">
                <NavLink
                  to={`/profile`}
                  className={({ isActive }) =>
                    `block py-2 px-3 transition-all duration-300 relative
                    ${isActive ? "text-purple-400" : "text-gray-300"}
                    hover:text-purple-400`
                  }
                >
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>

              {/* About Link */}
              <li className="relative group">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-3 transition-all duration-300 relative
                    ${isActive ? "text-purple-400" : "text-gray-300"}
                    hover:text-purple-400`
                  }
                >
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
              <li className="relative group">
                <NavLink
                  to="/itineraryPage"
                  className={({ isActive }) =>
                    `block py-2 px-3 transition-all duration-300 relative
                    ${isActive ? "text-purple-400" : "text-gray-300"}
                    hover:text-purple-400`
                  }
                >
                  Itinerary
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>

              {/* Programs Dropdown */}

              {/* Location Reviews */}
            </ul>

            {/* User Section */}
            <div className="lg:ml-8 mt-4 lg:mt-0">
              {user ? (
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center text-purple-200">
                      {user.fullname[0].toUpperCase()}
                    </div>
                    <span className="text-gray-300">{user.fullname}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-300 transform transition-transform duration-300 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showDropdown && (
                    <div
                      className={`
                      lg:absolute lg:right-0 lg:mt-2 w-full lg:w-56 bg-gray-800 rounded-lg shadow-xl py-2
                      transform transition-all duration-300
                      ${isMobileMenuOpen ? "relative mt-2" : ""}
                    `}
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-medium text-gray-200">
                          {user.fullname}
                        </p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-purple-400 transition-colors duration-300"
                      >
                        <User className="w-4 h-4" />
                        Edit Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-purple-400 transition-colors duration-300"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors duration-300"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="block w-full lg:w-auto text-center text-white bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
