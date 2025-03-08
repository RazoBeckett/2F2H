import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Layout,
  Users,
  BookOpen,
  Award,
  MessageSquare,
  Settings,
  Menu,
  X,
  HelpCircle,
  PlusCircle,
  List,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const predefinedClassrooms = [
    { id: 1, name: "SY IT C", subject: "UCSD" },
    { id: 2, name: "SY IT C", subject: "DSA" },
  ];

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const savedClassrooms = JSON.parse(localStorage.getItem("classrooms")) || [];
    setClassrooms([...predefinedClassrooms, ...savedClassrooms]);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedClassrooms = JSON.parse(localStorage.getItem("classrooms")) || [];
      setClassrooms([...predefinedClassrooms, ...updatedClassrooms]);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg transition-all duration-300 hover:bg-gray-50 border border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <X size={24} className="text-gray-700 transition-transform duration-300 transform hover:rotate-90" />
        ) : (
          <Menu size={24} className="text-gray-700 transition-transform duration-300 transform hover:scale-110" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-72"} md:translate-x-0 flex flex-col`}
      >
        {/* Logo and Brand Section */}
        <div className="px-6 py-8 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="/logo-svg.svg" 
                alt="Logo" 
                className="w-12 h-12 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">QuizMorphs</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Teacher Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {/* Primary Actions */}
          <div className="mb-6 space-y-2">
            <NavLink
              to="/create-classroom"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
            >
              <PlusCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Create Classroom</span>
            </NavLink>

            <NavLink
              to="/manage-classrooms"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
            >
              <List className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Manage Classrooms</span>
            </NavLink>
          </div>

          {/* Main Navigation */}
          <div className="space-y-1">
            {[
              { path: "/", icon: Layout, label: "Dashboard" },
              { path: "/students", icon: Users, label: "Students" },
              { path: "/quizzes", icon: BookOpen, label: "Quizzes" },
              { path: "/leaderboard", icon: Award, label: "Leaderboard" },
              { path: "/doubt-forum", icon: MessageSquare, label: "Doubts" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-gray-50 text-gray-900 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700 space-y-1">
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gray-50 text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
            >
              <HelpCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Help Center</span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gray-50 text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
            >
              <Settings className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Settings</span>
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-label="Close Sidebar"
        />
      )}
    </>
  );
};

export default Sidebar;
