import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API}`,
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 🎬 Background Movie Grid */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 scale-110 rotate-[-6deg]">
        {movies
          .concat(movies)
          .map(
            (movie, i) =>
              movie.backdrop_path && (
                <img
                  key={i}
                  src={IMAGE_BASE + movie.backdrop_path}
                  alt=""
                  className="w-full h-full object-cover opacity-80"
                />
              ),
          )}
      </div>

      {/* 🌑 Overlays */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* 🧠 Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight">
          Unlimited movies, TV shows, and more
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Starts at USD 2.99. Cancel anytime.
        </p>

        <p className="mt-6 text-base text-gray-300">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {/* ✉️ Email Input */}
        <div className="mt-6 flex w-full max-w-xl flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-4 text-white bg-black/60 border border-gray-600
              rounded outline-none focus:border-white"
          />

          <Link to="/homepage">
            <button
              className="
                px-8 py-4 w-full sm:w-auto
                bg-[#E50914]
                text-white font-bold text-lg
                rounded
                hover:bg-[#f6121d]
                active:scale-95
                transition-all
                flex items-center justify-center gap-2
              ">
              Get Started
              <span className="text-2xl">›</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
