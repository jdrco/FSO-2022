import { useState, useEffect } from "react";
import axios from "axios";

const Content = ({ countries, setCountries }) => {
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat={60}&lon={-95}&appid=${api_key}`
      )
      .then((response) => {
        console.log("promise fulfilled");
        console.log(response.data);
      });
  });

  if (countries.length === 0 || countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    console.log(countries[0]);
    return (
      <div>
        <h1>{countries[0].name}</h1>
        <div>
          <div>capital {countries[0].capital}</div>
          <div>area {countries[0].area}</div>
        </div>
        <b>languages:</b>
        <ul>
          {countries[0].languages.map((language, i) => (
            <li key={i}>{language.name}</li>
          ))}
        </ul>
        <img src={countries[0].flag} alt=""></img>
      </div>
    );
  } else {
    return (
      <div>
        {countries.map((country, i) => (
          <div key={i}>
            {country.name}
            <button
              onClick={() => {
                setCountries([country]);
              }}
            >
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default Content;
