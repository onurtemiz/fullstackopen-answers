import React from "react";
import AnecdoteList from "./AnecdoteList";
import AnecdoteForm from "./AnecdoteForm";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
