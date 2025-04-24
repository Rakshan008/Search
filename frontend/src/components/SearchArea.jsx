import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const SearchArea = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-xl lg:max-w-2xl flex flex-col items-center mt-12 mb-8 sm:mt-16 sm:mb-10 md:mt-20 md:mb-12">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        {/* Search Input with Icon */}
        <div className="relative w-full mb-5 search-input-shadow transition-shadow duration-200 rounded-full border border-transparent bg-surface-light dark:bg-surface-dark">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything..."
            className="w-full pl-12 pr-5 py-3 sm:py-4 text-base sm:text-lg bg-transparent rounded-full focus:outline-none text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark"
            disabled={isLoading} // Disable input while loading
            aria-label="Search query input"
          />
          <SearchIcon
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark pointer-events-none"
            size={20}
            aria-hidden="true"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading || !query.trim()} // Disable if loading or query is empty
          className={`px-7 py-2.5 sm:px-8 sm:py-3 flex items-center justify-center min-w-[120px] bg-brand-blue hover:bg-opacity-90 dark:bg-brand-blue-dark dark:hover:bg-opacity-90 text-white font-semibold rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md active:translate-y-0 active:shadow-md`}
        >
          {isLoading ? <LoadingSpinner size={20} /> : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchArea;
