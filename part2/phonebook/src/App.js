import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [word, setWord] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "notes");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObj = {
        name: newName,
        num: newNum,
      };
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewNum("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilter = (event) => {
    setWord(event.target.value);
  };

  const personsToShow =
    persons && word !== ""
      ? persons.filter(
          (person) =>
            person.name.toLowerCase().includes(word.toLowerCase()) === true
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
