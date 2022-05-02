import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Content from "./components/Content";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log("promise fulfilled");
      setAllCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    //console.log(search, countries);
    setSearch(event.target.value);
    if (search) {
      const filteredCountries = allCountries.filter(
        (country) =>
          country.name.toLowerCase().includes(search.toLowerCase()) === true
      );
      setCountries(filteredCountries);
    }
  };

  return (
    <div>
      <Filter value={search} handleFilter={handleFilter} />
      <Content countries={countries} />
    </div>
  );
};

export default App;
