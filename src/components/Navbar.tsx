import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, LayoutDashboard, Users, LogOut, HardDrive } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-soft border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl group-hover:shadow-glow transition-all duration-300">
              <HardDrive className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">PixNDrive</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-600 shadow-soft' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive('/dashboard') 
                    ? 'bg-blue-50 text-blue-600 shadow-soft' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </Link>
            )}

            <Link
              to="/about"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/about') 
                  ? 'bg-blue-50 text-blue-600 shadow-soft' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="font-medium">About Us</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:block text-sm text-gray-600">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-glow transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;