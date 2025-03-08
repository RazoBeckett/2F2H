import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [scrollY, setScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Handle Theme Change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollY && window.scrollY > 50) {
        setHidden(true); // Hide header when scrolling down
      } else {
        setHidden(false); // Show header when scrolling up
      }
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <header
      className={`fixed top-5 left-10 md:left-72 right-5 max-w-[calc(100%-2.5rem)] md:max-w-[calc(100%-18rem)] z-50 flex justify-between items-center px-8 py-4 bg-white/90 backdrop-blur-md dark:bg-gray-900/90 rounded-xl shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Left - Title and Navigation */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
          Quiz<span className="text-blue-600 dark:text-blue-500">Morphs</span>
        </h1>
      </div>

      {/* Right - Actions and Profile */}
      <div className="flex items-center gap-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-4">
          {/* User Info - Optional: Show on larger screens */}
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Administrator
            </p>
          </div>

          {/* Profile Image */}
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/10.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-lg object-cover border-2 border-white dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
