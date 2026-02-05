import { useEffect, useState } from "react";

const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(
        `${SEARCH_URL}?api_key=${import.meta.env.VITE_TMDB_API}&query=${encodeURIComponent(
          query
        )}`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results || []))
        .catch(() => setSearchResults([]));
    }, 500);

    return () => clearTimeout(timer);
  }, [query, setSearchResults]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      className="w-full max-w-md
        px-5 py-3 mt-6
        bg-black/70 border border-gray-700
        text-white text-base
        placeholder-gray-400
        rounded-md
        outline-none focus:border-[#E50914]
        transition"
    />
  );
};

export default SearchBar;
