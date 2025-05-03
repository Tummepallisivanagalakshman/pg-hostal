import React, { useState } from 'react';
import { User, LogOut, Menu, X, Home } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';

interface HeaderProps {
  onLoginSuccess: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginSuccess }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };
  
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    onLoginSuccess();
  };
  
  const handleLogout = () => {
    logout();
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-primary-900 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Home className="h-8 w-8 text-accent-300" />
              <span className="ml-2 text-xl font-bold text-white">StudentRent</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full border-2 border-accent-300" 
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-white">{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  leftIcon={<LogOut size={16} />}
                  className="border-accent-300 text-accent-300 hover:bg-primary-800"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                onClick={handleLoginClick}
                leftIcon={<User size={16} />}
                className="bg-accent-300 text-primary-900 hover:bg-accent-400"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent-300 hover:bg-primary-800 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-800">
          <div className="pt-2 pb-4 space-y-1 px-4 sm:px-6 lg:px-8">
            {isAuthenticated ? (
              <div className="py-3 space-y-3">
                <div className="flex items-center space-x-3">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full border-2 border-accent-300" 
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-white">{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth
                  onClick={handleLogout}
                  leftIcon={<LogOut size={16} />}
                  className="border-accent-300 text-accent-300 hover:bg-primary-700"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                fullWidth 
                onClick={handleLoginClick}
                leftIcon={<User size={16} />}
                className="bg-accent-300 text-primary-900 hover:bg-accent-400"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;