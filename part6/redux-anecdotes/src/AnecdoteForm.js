import React from "react";
import { createAnecdote } from "./reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";
import { showNotify, hideNotify } from "./reducers/notificationReducer";
import anecdoteService from "./services/anecdotes";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const ane = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const response = await anecdoteService.createNew(ane);
    dispatch(createAnecdote(response));
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
