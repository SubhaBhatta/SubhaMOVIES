import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Navbar from "./layout/navbar.jsx";
import Footer from "./layout/footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-black transition-colors duration-300">
        <Navbar setSearchResults={setSearchResults} />

        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8">
          <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md">
            <Routes>
              <Route
                path="/"
                element={<HomePage searchResults={searchResults} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
