import React from "react";
import Person from "./Person";

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person, i) => (
        <Person key={i} person={person} />
      ))}
    </div>
  );
};

export default Persons;
