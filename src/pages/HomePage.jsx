import { useEffect, useState } from "react";
import MovieSlider from "../components/Movies.jsx";
import SearchBar from "../components/SearchBar.jsx";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [heroBanner, setHeroBanner] = useState(null);

  // Fetch hero movie
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API}`
    )
      .then((res) => res.json())
      .then((data) => {
        const random =
          data.results[Math.floor(Math.random() * data.results.length)];
        setHeroBanner(random);
      });
  }, []);

  // Play trailer
  const playTrailer = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API}`
    );
    const data = await res.json();

    const trailer = data.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    trailer ? setTrailerKey(trailer.key) : alert("Trailer not available");
  };

  const truncate = (str, n) =>
    str?.length > n ? str.slice(0, n - 1) + "..." : str;

  return (
    <div className="bg-[#141414] min-h-screen text-white">
      {/* SEARCH RESULTS */}
      {searchResults.length > 0 ? (
        <div className="px-4 sm:px-8 md:px-12 pt-24 pb-10">
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {searchResults.map(
              (movie) =>
                movie.poster_path && (
                  <img
                    key={movie.id}
                    src={IMAGE_BASE + movie.poster_path}
                    alt={movie.title}
                    onClick={() => playTrailer(movie.id)}
                    className="rounded-sm hover:scale-105 transition-transform cursor-pointer"
                  />
                )
            )}
          </div>
        </div>
      ) : (
        <>
          {/* HERO SECTION */}
          <div className="relative w-full">
            <img
              src={heroBanner ? IMAGE_BASE + heroBanner.backdrop_path : ""}
              alt={heroBanner?.title}
              className="
                w-full 
                object-cover 
                h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh]
                brightness-75
              "
            />

            {/* Overlay content */}
            <div className="absolute top-0 left-0 w-full h-full px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-3 leading-tight">
                {heroBanner?.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 leading-relaxed line-clamp-4">
                {truncate(heroBanner?.overview, 180)}
              </p>

              <div className="w-full sm:w-[90%] md:w-full">
                <SearchBar setSearchResults={setSearchResults} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  onClick={() => playTrailer(heroBanner?.id)}
                  className="
                    flex items-center justify-center gap-2
                    px-6 py-3
                    bg-white text-black font-bold text-base md:text-lg
                    rounded hover:bg-white/80 transition
                  "
                >
                  <span className="text-xl">▶</span> Play
                </button>

                <button
                  className="
                    px-6 py-3
                    bg-gray-500/70 text-white font-bold text-base md:text-lg
                    rounded hover:bg-gray-500/50 transition
                  "
                >
                  More Info
                </button>
              </div>
            </div>
          </div>

          {/* MOVIE SLIDERS */}
          <MovieSlider
            title="Trending Now"
            endpoint="https://api.themoviedb.org/3/trending/movie/week"
            onPlayTrailer={playTrailer}
          />

          <MovieSlider
            title="Top Rated"
            endpoint="https://api.themoviedb.org/3/movie/top_rated"
            onPlayTrailer={playTrailer}
          />

          <MovieSlider
            title="Popular"
            endpoint="https://api.themoviedb.org/3/movie/popular"
            onPlayTrailer={playTrailer}
          />
        </>
      )}

      {/* TRAILER MODAL */}
      {trailerKey && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 sm:p-8">
          <div className="relative w-full max-w-5xl aspect-video">
            <button
              onClick={() => setTrailerKey(null)}
              className="
                absolute -top-12 right-0
                w-10 h-10 bg-black
                rounded-full text-white text-2xl
                hover:bg-[#E50914] transition
              "
            >
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              className="w-full h-full rounded"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
