import React from "react";

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.num}
    </div>
  );
};

export default Person;
