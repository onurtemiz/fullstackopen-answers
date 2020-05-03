import React, { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";

const LoginForm = ({ setErrorMessage, setUser, loginFormRef }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
      loginFormRef.current.toggleVisibility();
    } catch (e) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
