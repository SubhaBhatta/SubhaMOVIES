import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      <div className="w-8 h-8 rounded bg-[#E50914] text-white
        flex items-center justify-center font-bold text-sm">
        S
      </div>
    </nav>
  );
};

export default Navbar;
