import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input onChange={props.handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
