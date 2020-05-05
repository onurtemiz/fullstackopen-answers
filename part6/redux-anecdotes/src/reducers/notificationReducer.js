const asObject = (info) => {
  return {
    info: info,
  };
};

const notificationReducer = (state = asObject, action) => {
  switch (action.type) {
    case "SHOW_NOTIFY":
      const newNot = {
        info: `you voted '${action.anecdote}'`,
      };
      state = newNot;
      return state;
    case "HIDE_NOTIFY":
      const newOff = { info: null };
      state = newOff;
      return state;
    default:
      return state;
  }
};

export const showNotify = (anecdote) => {
  return {
    type: "SHOW_NOTIFY",
    anecdote: anecdote,
  };
};

export const hideNotify = () => {
  return {
    type: "HIDE_NOTIFY",
  };
};

export default notificationReducer;
