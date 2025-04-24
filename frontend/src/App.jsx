import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchArea from './components/SearchArea';
import AnswerCard from './components/AnswerCard';
import LoadingSpinner from './components/LoadingSpinner'; // Re-import for main loading state

function App() {
  // State for theme (light/dark)
  const [theme, setTheme] = useState(() => {
    // Check localStorage only on the client-side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      // Check if system preference is dark
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme || (prefersDark ? 'dark' : 'light'); // Use saved or system pref
    }
    return 'light'; // Default theme for SSR or initial load
  });

  // State for search results
  const [searchResult, setSearchResult] = useState(null);
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState(null);
  // State to track if a search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  // Effect to apply theme class to HTML element and save preference
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Function to toggle theme
  const handleThemeSwitch = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Function to handle search submission
  const handleSearch = useCallback(async (query) => {
    if (!query) return;

    console.log('Frontend: Initiating search for:', query);
    setIsLoading(true);
    setError(null);
    setSearchResult(null); // Clear previous results
    setHasSearched(true); // Mark that a search has been attempted

    // --- Determine Backend URL ---
    // Use environment variable for flexibility in deployment
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    const apiUrl = `${backendUrl}/api/search?q=${encodeURIComponent(query)}`;
    console.log('Frontend: Calling API:', apiUrl);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        // Try to get error message from backend response body
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          // If response is not JSON, use status text
          errorData = { error: response.statusText };
        }
        throw new Error(errorData?.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Frontend: Received data:', data);
      setSearchResult(data);

    } catch (err) {
      console.error('Frontend: API call failed:', err);
      setError(err.message || 'Failed to fetch search results. Please try again.');
      setSearchResult(null); // Ensure no stale results are shown on error
    } finally {
      setIsLoading(false); // Stop loading indicator regardless of success/failure
    }
  }, []); // Empty dependency array means this function is created once

  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} onThemeToggle={handleThemeSwitch} />

      <main className="flex-grow flex flex-col items-center justify-start px-4 w-full">
        <SearchArea onSearch={handleSearch} isLoading={isLoading} />

        {/* Display Area: Loading, Error, Result, or Initial State */}
        <div className="w-full flex justify-center px-4">
          {isLoading && (
             <div className="flex flex-col items-center text-center mt-8">
                <LoadingSpinner size={32} />
                <p className="mt-3 text-text-secondary-light dark:text-text-secondary-dark">Searching...</p>
             </div>
          )}

          {!isLoading && error && (
            <div className="w-full max-w-2xl p-5 text-center bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {!isLoading && !error && searchResult && (
            <AnswerCard result={searchResult} />
          )}

          {/* Optional: Show a message before the first search */}
          {!isLoading && !error && !searchResult && !hasSearched && (
             <div className="text-center mt-8 text-text-secondary-light dark:text-text-secondary-dark">
               <p>Enter a query above to get a direct answer.</p>
             </div>
          )}

           {/* Optional: Show a message if search returned no results (and no error) */}
           {!isLoading && !error && !searchResult && hasSearched && (
             <div className="text-center mt-8 text-text-secondary-light dark:text-text-secondary-dark">
               <p>No results found for your query.</p>
             </div>
          )}
        </div>
      </main>

      {/* Footer */}
       <footer className="text-center py-4 mt-10 sm:mt-16 border-t border-border-light dark:border-border-dark">
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
          &copy; {new Date().getFullYear()} Search Engine. AI-powered answers.
          {/* Add About/Contact links here if needed */}
        </p>
      </footer>
    </div>
  );
}

export default App;

