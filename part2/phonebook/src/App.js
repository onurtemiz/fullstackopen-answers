import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const title = "Phonebook";

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personOBJ = {
      name: newName,
    };
    setNewName("");
    setPersons(persons.concat(personOBJ));
  };

  return (
    <div>
      <Title title={title} />
      <Form
        addPerson={addPerson}
        handlePersonChange={handlePersonChange}
        newName={newName}
      />
      <Numbers persons={persons} />
    </div>
  );
};

const Form = ({ addPerson, newName, handlePersonChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

const Title = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default App;
