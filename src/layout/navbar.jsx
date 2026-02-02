import { useEffect, useState } from "react";

const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const Navbar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(
        `${SEARCH_URL}?api_key=${import.meta.env.VITE_TMDB_API}&query=${query}`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results || []));
    }, 500);

    return () => clearTimeout(timer);
  }, [query, setSearchResults]);

  return (
    <nav className="fixed top-0 left-0 w-full h-14
      bg-white dark:bg-gray-900 border-b
      border-gray-200 dark:border-gray-800
      flex items-center justify-between px-6 z-50">

      <h1 className="text-xl font-bold text-indigo-600">
        SubhaMOVIES
      </h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-[280px] md:w-[360px]
          px-4 py-2 rounded-full
          bg-gray-100 dark:bg-gray-800
          text-sm text-gray-900 dark:text-white
          outline-none focus:ring-2
          focus:ring-indigo-500"
      />

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Hi, Enjoy
        </span>
        <div className="w-9 h-9 rounded-full bg-indigo-500
          text-white flex items-center justify-center font-bold">
          S
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
