import { useDispatch } from "react-redux";

const asObject = (info) => {
  return {
    info: info,
  };
};

const notificationReducer = (state = asObject, action) => {
  switch (action.type) {
    case "SHOW_NOTIFY":
      const newNot = {
        info: action.info,
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

export const setNotify = (notification, seconds) => {
  return (dispatch) => {
    dispatch(showNotify(notification));
    window.setTimeout(() => {
      dispatch(hideNotify());
    }, seconds * 1000);
  };
};

export const showNotify = (notification) => {
  return {
    type: "SHOW_NOTIFY",
    info: notification,
  };
};

export const hideNotify = () => {
  return {
    type: "HIDE_NOTIFY",
  };
};

export default notificationReducer;
