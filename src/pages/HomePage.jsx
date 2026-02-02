import { useState } from "react";
import MovieSlider from "../components/Movies.jsx";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const HomePage = ({ searchResults }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  const playTrailer = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API}`
    );
    const data = await res.json();

    const trailer = data.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    trailer
      ? setTrailerKey(trailer.key)
      : alert("Trailer not available 😢");
  };

  return (
    <div className="bg-black min-h-screen pt-14">
      {searchResults.length > 0 ? (
        <div className="px-6 py-6">
          <h2 className="text-white text-2xl font-bold mb-4">
            Search Results
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {searchResults.map((movie) => (
              <img
                key={movie.id}
                src={IMAGE_BASE + movie.poster_path}
                alt={movie.title}
                onClick={() => playTrailer(movie.id)}
                className="rounded-lg hover:scale-105 transition cursor-pointer"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
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

      {/* 🎬 GLOBAL TRAILER MODAL */}
      {trailerKey && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm
                        flex items-center justify-center z-50">
          <div className="relative w-[95%] md:w-[70%] lg:w-[60%] aspect-video">
            <button
              onClick={() => setTrailerKey(null)}
              className="absolute -top-12 right-0 text-white text-3xl">
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              className="w-full h-full rounded-xl shadow-2xl"
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
