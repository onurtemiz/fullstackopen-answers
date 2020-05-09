import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Togglable from './Togglable';
import Notification from './Notification';
import LoginForm from './LoginForm';
import { setLoginUser } from '../reducers/userReducer';

const Login = ({ loginFormRef }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    dispatch(setLoginUser(null));
  };

  const login = () => {
    return (
      <>
        <Togglable buttonLabel="Login" ref={loginFormRef}>
          <h2>Log in to Application</h2>
          <Notification />
          <LoginForm loginFormRef={loginFormRef} />
        </Togglable>
      </>
    );
  };

  const logout = () => {
    return (
      <>
        {user.username.charAt(0).toUpperCase() + user.username.slice(1)} logged
        in
        <button onClick={handleLogout} id="logout">
          logout
        </button>
      </>
    );
  };

  return (
    <>
      {user === null ? (
        <>{login()}</>
      ) : (
        <>
          <>{logout()}</>
        </>
      )}
    </>
  );
};

export default Login;
