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
    const amount =
      window.innerWidth < 768 ? 300 : window.innerWidth < 1024 ? 600 : 900;

    sliderRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative px-4 md:px-10 lg:px-14 py-6">
      <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
        {title}
      </h2>

      <div className="relative group">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10" />

        {/* left arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 rounded-full bg-black/70 hover:bg-black
                     items-center justify-center text-white text-2xl"
        >
          ‹
        </button>

        {/* slider */}
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onPlayTrailer(movie.id)}
              className="relative min-w-[140px] md:min-w-[180px] lg:min-w-[220px]
                         h-[210px] md:h-[260px] lg:h-[320px]
                         cursor-pointer"
            >
              {/* poster */}
              <img
                src={
                  movie.poster_path
                    ? IMAGE_BASE + movie.poster_path
                    : "/no-poster.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover rounded-md"
              />

              {/* hover overlay ONLY */}
              <div
                className="absolute inset-0 rounded-md
                           bg-gradient-to-t from-black/90 via-black/40 to-transparent
                           opacity-0 hover:opacity-100 transition-opacity duration-300
                           flex flex-col justify-end p-3"
              >
                <p className="text-sm font-semibold text-white line-clamp-2">
                  {movie.title}
                </p>
                <span className="text-xs text-green-400 font-bold mt-1">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* right arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 rounded-full bg-black/70 hover:bg-black
                     items-center justify-center text-white text-2xl"
        >
          ›
        </button>
      </div>
    </section>
  );
}
