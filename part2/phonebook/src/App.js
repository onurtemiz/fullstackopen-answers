import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const title = "Phonebook";

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toUpperCase().includes(searchKeyword.toUpperCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    const personOBJ = {
      name: newName,
      number: newPhone,
    };
    setNewName("");
    setNewPhone("");
    setPersons(persons.concat(personOBJ));
  };

  return (
    <div>
      <Title title={title} />
      <Search
        searchKeyword={searchKeyword}
        handleKeywordChange={handleKeywordChange}
      />
      <h2>Add a new</h2>
      <Form
        addPerson={addPerson}
        handlePersonChange={handlePersonChange}
        newName={newName}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Numbers persons={filteredPerson} keyword={searchKeyword} />
    </div>
  );
};

const Search = ({ searchKeyword, handleKeywordChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchKeyword} onChange={handleKeywordChange} />
    </div>
  );
};

const Form = ({
  addPerson,
  newName,
  handlePersonChange,
  newPhone,
  handlePhoneChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange} />
      </div>
      <div>
        phone: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = ({ persons, keyword }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
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
