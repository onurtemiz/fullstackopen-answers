import React from "react";
import { createAnecdote } from "./reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";
import { setNotify } from "./reducers/notificationReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const ane = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(ane));
    dispatch(setNotify(`you voted '${ane}'`, 10));
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
