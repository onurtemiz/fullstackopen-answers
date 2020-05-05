import React from "react";
import { createAnecdote } from "./reducers/anecdoteReducer.js";
import { useSelector, useDispatch } from "react-redux";

const AnecdotesForm = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const ane = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(ane));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdotesForm;
