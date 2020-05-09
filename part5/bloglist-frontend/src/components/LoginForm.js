import React from 'react';
import { loginUser } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const LoginForm = ({ loginFormRef }) => {
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      loginUser(event.target.username.value, event.target.password.value)
    );
    loginFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input type="text" name="username" id="username" />
        </div>
        <div>
          password:
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit" id="submit-login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
