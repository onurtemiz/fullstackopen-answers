import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import services from "./util/services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const title = "Phonebook";

  const hook = () => {
    services.getAll().then((response) => {
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
      if (
        window.confirm(
          `${newName} is already on the list, replace the old one with a new one?`
        )
      ) {
        const p = persons.find((p) => p.name === newName);
        const newP = { ...p, number: newPhone };
        services.update(p.id, newP).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== p.id ? person : response.data
            )
          );
        });
      }
    } else {
      const personOBJ = {
        name: newName,
        number: newPhone,
      };

      services.create(personOBJ).then((response) => {
        personOBJ.id = response.data.id;
        setPersons(persons.concat(personOBJ));
      });
    }

    setNewName("");
    setNewPhone("");
  };

  const deleteButtonHandler = (personOBJ) => {
    if (window.confirm(`Delete ${personOBJ.name}`)) {
      services.deletePerson(personOBJ).then((response) => {
        setPersons(persons.filter((person) => person.id !== personOBJ.id));
      });
    }
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
      <Numbers
        persons={filteredPerson}
        keyword={searchKeyword}
        handler={deleteButtonHandler}
      />
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

const Numbers = ({ persons, keyword, handler }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <DelButton handler={handler} person={person} />
        </p>
      ))}
    </div>
  );
};

const DelButton = ({ handler, person }) => {
  return (
    <>
      <button onClick={() => handler(person)}>delete</button>
    </>
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
