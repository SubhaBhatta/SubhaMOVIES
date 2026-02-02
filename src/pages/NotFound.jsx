import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f1a] text-white px-4">
      <h1 className="text-7xl font-bold text-blue-400">404</h1>
      <p className="mt-4 text-xl text-gray-300">
        Page not found
      </p>
      <p className="mt-2 text-sm text-gray-400 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 px-6 py-2 font-medium hover:bg-blue-500/30 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;