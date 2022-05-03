import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [word, setWord] = useState("");

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  console.log("render", persons.length, "notes");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        // do
        const person = persons.find((p) => p.name === newName);
        const changeID = person.id;
        const changedPerson = { ...person, number: newNum };

        personServices
          .update(changeID, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== changeID ? p : returnedPerson))
            );
          });
      }
    } else {
      const personObj = {
        name: newName,
        number: newNum,
      };

      personServices.create(personObj).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNum("");
      });
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

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const newPersons = persons.filter((person) => person.id !== id);
    if (window.confirm(`delete ${personToDelete.name}?`)) {
      personServices.deleteNow(id).then(() => {
        setPersons(newPersons);
      });
    }
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

      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
