import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Country } from "./interfaces";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import About from "./components/About";

function App() {
  const [allCountryInfo, setAllCountryInfo] = useState<Country[]>([]);

  const URL: string = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(URL).then((response) => {
      setAllCountryInfo(response.data);
    });
  }, []);

  return (
    <Router>
      <div>
        <h1>Which country is bigger?</h1>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route
            path="/Game"
            element={<Game allCountryInfo={allCountryInfo} />}
          />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
