import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification.message.length === 0) {
    return null;
  }
  const notificationStyle = {
    border: `3px solid ${notification.type === 'error' ? 'red' : 'green'}`,
    backgroundColor: 'gainsboro',
    color: `${notification.type === 'error' ? 'red' : 'green'}`,
    fontSize: 20,
    padding: 10,
  };
  return (
    <div className="error" style={notificationStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;
