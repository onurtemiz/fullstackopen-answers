import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log("notification.info", notification.info);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: `${notification.info ? "" : "none"}`,
  };

  return <div style={style}>{notification.info}</div>;
};

export default Notification;
