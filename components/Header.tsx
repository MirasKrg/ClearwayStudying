import React from 'react';
import { Logo } from './icons/Logo';
import { SunIcon, MoonIcon } from './icons/Icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  navigate: (path: string) => void;
  currentUser: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, navigate, currentUser, onLogout }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center space-x-2">
              <Logo className="h-8 w-auto text-brand-primary" />
              <span className="font-bold text-xl text-brand-text-light dark:text-brand-text-dark hidden sm:inline">Clearway Studying</span>
            </a>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <a href="/cells" onClick={(e) => handleNavClick(e, '/cells')} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors">Клетки</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors">Clearway AI</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors">Дневник</a>
          </nav>
          <div className="flex items-center space-x-4">
            <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="theme-toggle" className="sr-only" checked={isDarkMode} onChange={toggleTheme} />
              <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center transition-colors px-1">
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : ''}`}>
                  {isDarkMode 
                    ? <MoonIcon className="h-6 w-6 text-yellow-400 p-1" /> 
                    : <SunIcon className="h-6 w-6 text-yellow-500 p-1" />
                  }
                </div>
              </div>
            </label>
            <div className="hidden sm:flex items-center space-x-4">
              {currentUser ? (
                <div className="relative">
                  <button onClick={() => navigate('/profile')} className="flex items-center space-x-2">
                    <img 
                      className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary"
                      src={`https://i.pravatar.cc/150?u=${currentUser}`}
                      alt="User avatar"
                    />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium text-brand-primary border border-brand-primary rounded-md hover:bg-brand-primary/10 transition-colors">Войти</button>
                  <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primary-dark transition-colors">Регистрация</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
