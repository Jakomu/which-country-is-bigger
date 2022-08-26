import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Country } from "./interfaces";

import CountryCard from "./components/CountryCard";

function App() {
  const [allCountryInfo, setAllCountryInfo] = useState<Country[]>([]);
  const [country1, setCountry1] = useState<Country | null>(null);
  const [country2, setCountry2] = useState<Country | null>(null);
  const [biggerCountry, setBiggerCountry] = useState<Country | null>(null);
  const [limitedCountryInfo, setLimitedCountryInfo] = useState<Country[]>([]);
  const [win, setWin] = useState<number>(0);

  const URL: string = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(URL).then((response) => {
      setAllCountryInfo(response.data);
    });
  }, []);

  useEffect(() => {
    let tempCountries: Country[] = [];
    allCountryInfo.map((country: any) => {
      const newCountry: Country = {
        name: country.name.common,
        population: country.population,
        flag: country.flags.png,
        area: country.area,
      };
      tempCountries.push(newCountry);
    });
    setLimitedCountryInfo(tempCountries);
  }, [allCountryInfo]);

  useEffect(() => {
    let i: number = 0;
    let j: number = 0;
    while (i === j) {
      i = Math.floor(Math.random() * 250 - 1);
      j = Math.floor(Math.random() * 250 - 1);
      setCountry1(limitedCountryInfo[i]);
      setCountry2(limitedCountryInfo[j]);
      if (limitedCountryInfo[i]) {
        limitedCountryInfo[i].population > limitedCountryInfo[j].population
          ? setBiggerCountry(limitedCountryInfo[i])
          : setBiggerCountry(limitedCountryInfo[j]);
      }
    }
  }, [limitedCountryInfo, win]);

  function chooseCountry(name: string | null): void {
    name === biggerCountry?.name ? setWin(1) : setWin(-1);
  }

  if (win === 0) {
    return (
      <div>
        <h1>Which country is bigger?</h1>
        <div>
          <CountryCard info={country1} />
          <button
            onClick={() => {
              if (country1) {
                chooseCountry(country1.name);
              }
            }}
          >
            Choose
          </button>
          <CountryCard info={country2} />
          <button
            onClick={() => {
              if (country2) {
                chooseCountry(country2.name);
              }
            }}
          >
            Choose
          </button>
        </div>
      </div>
    );
  } else if (win === 1) {
    return (
      <div>
        <h1>Which country is bigger?</h1>
        <div>
          <h1>You Win!</h1>
          <button
            onClick={() => {
              setWin(0);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Which country is bigger?</h1>
        <div>
          <h1>You Lose!</h1>
          <button
            onClick={() => {
              setWin(0);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}

export default App;
