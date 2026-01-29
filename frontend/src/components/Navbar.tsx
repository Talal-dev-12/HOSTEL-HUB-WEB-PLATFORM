import { useState, useEffect, useRef } from "react"; // useRef aur useEffect menu ko bahar click karne par band karne ke liye
import {
  Home,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
  ChevronDown,
} from "lucide-react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

interface NavbarProps {
  currentUser: User | null | undefined;  
   onSignOut: () => void;
}

export function Navbar({ currentUser , onSignOut}: NavbarProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  

  

  // Menu ke bahar click karne par dropdown band karne ka logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <Toaster position="top-center" reverseOrder={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Hostel Hub</span>
          </button>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative" ref={menuRef}>
                {/* User Profile Button */}
                <button
                  onClick={() => isMenuOpen?setIsMenuOpen(false): setIsMenuOpen(true) }
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all "
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-none mb-1">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform  ${isMenuOpen ? "-rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentUser.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          if (currentUser.role === "student")
                            navigate("/all-hostels");
                          else if (currentUser.role === "hostler")
                            navigate("/hostler-dashboard");
                          else if (currentUser.role === "admin")
                            navigate("/admin-dashboard");
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                      >
                        <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Dashboard</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group">
                        <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>My Profile</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onSignOut()
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group rounded-b-2xl"
                    >
                      <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/sign-in")}
                  className="px-6 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-all font-semibold hover:shadow-md"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/sign-up")}
                  className="px-8 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg font-semibold"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
