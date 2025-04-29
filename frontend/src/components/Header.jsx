import React from 'react';
import { Sun, Moon, Search } from 'lucide-react'; // Assuming lucide-react is installed

const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="py-3 px-4 sm:px-6 md:px-10 flex justify-between items-center sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
      {/* Logo/Brand Name */}
      <div className="flex items-center space-x-2">
         <Search size={24} className="text-brand-blue dark:text-brand-blue-light" />
         <h1 className="text-xl sm:text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
           Search
         </h1>
      </div>


      {/* Theme Toggle Button */}
      <button
        onClick={onThemeToggle}
        className="p-2 rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 dark:focus:ring-offset-background-dark"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
};

export default Header;
