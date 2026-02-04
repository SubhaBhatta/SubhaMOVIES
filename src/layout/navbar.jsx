import { useEffect, useState } from "react";

const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const Navbar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 w-full h-16 z-50
      flex items-center justify-between px-8
      transition-all duration-500
      ${scrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"}`}
    >
      <h1 className="text-3xl font-black text-[#E50914] tracking-tight">
        SUBHAMOVIES
      </h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search titles..."
        className="w-[280px] md:w-[360px]
          px-4 py-2
          bg-black/70 border border-gray-700
          text-sm text-white placeholder-gray-400
          outline-none focus:border-white
          transition-colors"
      />

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded
          bg-[#E50914] text-white
          flex items-center justify-center font-bold text-sm">
          S
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
