import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Navbar from "./layout/navbar.jsx";
import Footer from "./layout/footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/firstpage.jsx"

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#141414]">
        <Navbar setSearchResults={setSearchResults} />

        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="homepage"
              element={<HomePage searchResults={searchResults} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
