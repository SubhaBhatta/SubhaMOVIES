import { useEffect, useRef, useState } from "react";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieSlider({ title, endpoint, onPlayTrailer }) {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch(`${endpoint}?api_key=${import.meta.env.VITE_TMDB_API}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, [endpoint]);

  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === "left" ? -450 : 450,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-6 py-6 relative">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
        {title}
      </h2>

      <div className="relative group">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 z-20
                     w-12 h-12 rounded-full bg-black/70 hover:bg-black
                     items-center justify-center text-white text-2xl backdrop-blur">
          ‹
        </button>

        {/* Movies */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onPlayTrailer(movie.id)}
              className="relative min-w-[160px] md:min-w-[200px] lg:min-w-[220px]
                         cursor-pointer transition-all duration-300
                         hover:scale-110 hover:z-20"
            >
              <img
                src={
                  movie.poster_path
                    ? IMAGE_BASE + movie.poster_path
                    : "/no-poster.png"
                }
                alt={movie.title}
                className="rounded-xl shadow-lg"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-xl
                              bg-gradient-to-t from-black/90 via-black/20 to-transparent
                              opacity-0 hover:opacity-100 transition-opacity">
                <p className="absolute bottom-3 left-3 right-3
                              text-sm font-semibold text-white line-clamp-2">
                  {movie.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 z-20
                     w-12 h-12 rounded-full bg-black/70 hover:bg-black
                     items-center justify-center text-white text-2xl backdrop-blur">
          ›
        </button>
      </div>
    </div>
  );
}
