import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = () => {
    return (
      <div>
        <h2>Log in to Application</h2>
        <ErrorMessage errorMessage={errorMessage} />
        <Login
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          setUser={setUser}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  };

  const createBlog = () => {
    return (
      <CreateBlog
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        setBlogs={setBlogs}
        blogs={blogs}
        setSucessMessage={setSucessMessage}
      />
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  const logout = () => {
    return (
      <>
        <button onClick={handleLogout}>logout</button>
      </>
    );
  };

  return (
    <div>
      {user === null ? (
        <div>{login()}</div>
      ) : (
        <div>
          <p>
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}{" "}
            logged in {logout()}
          </p>{" "}
          {createBlog()}
        </div>
      )}

      <h2>blogs</h2>
      <SuccessMessage successMessage={successMessage} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const SuccessMessage = ({ successMessage }) => {
  if (successMessage.length === 0) {
    return null;
  }
  const successStyle = {
    border: "3px solid green",
    backgroundColor: "gainsboro",
    color: "green",
    fontSize: 20,
    padding: 10,
  };

  return (
    <div className="error" style={successStyle}>
      {successMessage}
    </div>
  );
};

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage.length === 0) {
    return null;
  }
  const errorStyle = {
    border: "3px solid red",
    backgroundColor: "gainsboro",
    color: "red",
    fontSize: 20,
    padding: 10,
  };

  return (
    <div className="error" style={errorStyle}>
      {errorMessage}
    </div>
  );
};

const CreateBlog = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  setBlogs,
  blogs,
  setSucessMessage,
}) => {
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };
    const response = await blogService.create(blog);
    setBlogs(blogs.concat(response));
    setSucessMessage(`a new blog ${blog.title} by ${blog.author} added`);
    setTimeout(() => {
      setSucessMessage("");
    }, 5000);
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="create">Submit</button>
      </form>
    </div>
  );
};

const Login = ({
  setErrorMessage,
  setUser,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
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

export default App;
