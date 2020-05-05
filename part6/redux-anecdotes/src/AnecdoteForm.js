import React from "react";
import { createAnecdote } from "./reducers/anecdoteReducer.js";
import { useSelector, useDispatch } from "react-redux";
import { showNotify, hideNotify } from "./reducers/notificationReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const ane = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(ane));
    dispatch(showNotify(ane));
    window.setTimeout(() => dispatch(hideNotify()), 5000);
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
