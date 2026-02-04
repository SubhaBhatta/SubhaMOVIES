import { useState, useEffect } from "react";
import MovieSlider from "../components/Movies.jsx";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const HomePage = ({ searchResults }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [heroBanner, setHeroBanner] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API}`
    )
      .then((res) => res.json())
      .then((data) => {
        const random = data.results[Math.floor(Math.random() * data.results.length)];
        setHeroBanner(random);
      });
  }, []);

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

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className="bg-[#141414] min-h-screen">
      {searchResults.length > 0 ? (
        <div className="px-12 pt-24 pb-8">
          <h2 className="text-white text-2xl font-bold mb-6">Search Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {searchResults.map((movie) => (
              <img
                key={movie.id}
                src={IMAGE_BASE + movie.poster_path}
                alt={movie.title}
                onClick={() => playTrailer(movie.id)}
                className="rounded-sm hover:scale-105 transition-transform cursor-pointer"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            className="relative h-[80vh] bg-cover bg-center"
            style={{
              backgroundImage: heroBanner
                ? `url(${IMAGE_BASE}${heroBanner.backdrop_path})`
                : "none",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

            <div className="relative h-full flex flex-col justify-center px-12 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
                {heroBanner?.title}
              </h1>

              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                {truncate(heroBanner?.overview, 180)}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => playTrailer(heroBanner?.id)}
                  className="px-8 py-3 bg-white text-black font-bold text-lg
                             rounded hover:bg-white/80 transition flex items-center gap-2"
                >
                  <span className="text-xl">▶</span> Play
                </button>

                <button
                  className="px-8 py-3 bg-gray-500/70 text-white font-bold text-lg
                             rounded hover:bg-gray-500/50 transition"
                >
                  More Info
                </button>
              </div>
            </div>
          </div>

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

      {trailerKey && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-8">
          <div className="relative w-full max-w-5xl aspect-video">
            <button
              onClick={() => setTrailerKey(null)}
              className="absolute -top-12 right-0 w-10 h-10
                         bg-black rounded-full text-white text-2xl
                         hover:bg-[#E50914] transition"
            >
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              className="w-full h-full"
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
