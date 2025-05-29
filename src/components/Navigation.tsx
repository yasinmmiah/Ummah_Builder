import React from 'react';
import { Home, Map, Award, User, BookOpen, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/village', label: 'Village', icon: <Map className="w-5 h-5" /> },
    { path: '/learn', label: 'Learn', icon: <BookOpen className="w-5 h-5" /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Award className="w-5 h-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                location.pathname === item.path
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-primary-500'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed left-0 top-0 h-full bg-white shadow-lg z-50">
        <div className="flex flex-col items-center p-4 h-full">
          <div className="py-4">
            <span className="font-serif font-bold text-xl text-primary-700">VQ</span>
          </div>
          <div className="flex flex-col space-y-6 flex-grow justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-primary-500 hover:bg-primary-50'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;