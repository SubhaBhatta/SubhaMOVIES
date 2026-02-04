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
      left: dir === "left" ? -900 : 900,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-12 py-8 relative">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-6 hover:text-gray-300 transition-colors">
        {title}
      </h2>

      <div className="relative group">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#141414] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#141414] to-transparent z-10" />

        <button
          onClick={() => scroll("left")}
          className="hidden group-hover:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20
                     w-14 h-full bg-black/80 hover:bg-black/90
                     items-center justify-center text-white text-4xl font-light">
          ‹
        </button>

        <div
          ref={sliderRef}
          className="flex gap-2 overflow-x-scroll scrollbar-hide scroll-smooth px-12"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onPlayTrailer(movie.id)}
              className="relative min-w-[150px] md:min-w-[200px] lg:min-w-[250px]
                         cursor-pointer transition-all duration-300 ease-in-out
                         hover:scale-125 hover:z-30 group/card"
            >
              <img
                src={
                  movie.poster_path
                    ? IMAGE_BASE + movie.poster_path
                    : "/no-poster.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover rounded-sm"
              />

              <div className="absolute inset-0 rounded-sm
                              bg-gradient-to-t from-black via-transparent to-transparent
                              opacity-0 group-hover/card:opacity-100 transition-opacity duration-300
                              flex flex-col justify-end p-4">
                <p className="text-sm font-bold text-white mb-1 line-clamp-2">
                  {movie.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="text-green-500 font-bold">
                    {Math.round(movie.vote_average * 10)}% Match
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden group-hover:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20
                     w-14 h-full bg-black/80 hover:bg-black/90
                     items-center justify-center text-white text-4xl font-light">
          ›
        </button>
      </div>
    </div>
  );
}
