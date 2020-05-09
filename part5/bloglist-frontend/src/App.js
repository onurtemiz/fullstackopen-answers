import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, updateBlog } from './reducers/blogReducer';
const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSucessMessage] = useState('');
  const [user, setUser] = useState(null);
  const loginFormRef = React.createRef();
  const blogFormRef = React.createRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = () => {
    return (
      <div>
        <Togglable buttonLabel="Login" ref={loginFormRef}>
          <h2>Log in to Application</h2>
          <ErrorMessage errorMessage={errorMessage} />
          <LoginForm
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setUser={setUser}
            loginFormRef={loginFormRef}
          />
        </Togglable>
      </div>
    );
  };
  const createBlog = () => {
    return (
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <CreateBlogForm
          setSucessMessage={setSucessMessage}
          blogFormRef={blogFormRef}
        />
      </Togglable>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
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
    <div>
      {user === null ? (
        <div>{login()}</div>
      ) : (
        <div>
          <p>{logout()}</p> {createBlog()}
        </div>
      )}

      <h2>blogs</h2>
      <SuccessMessage successMessage={successMessage} />
      <Blogs />
    </div>
  );
};

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const likeHandler = async (blog) => {
    const newObj = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    };
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateBlog(newObj));
  };
  return (
    <div>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} likeHandler={likeHandler} />
        ))}
    </div>
  );
};

//OPTIMIZE: Success Message
const SuccessMessage = ({ successMessage }) => {
  if (successMessage.length === 0) {
    return null;
  }
  const successStyle = {
    border: '3px solid green',
    backgroundColor: 'gainsboro',
    color: 'green',
    fontSize: 20,
    padding: 10,
  };

  return (
    <div className="error" style={successStyle}>
      {successMessage}
    </div>
  );
};

//OPTIMIZE: Error Message
const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage.length === 0) {
    return null;
  }
  const errorStyle = {
    border: '3px solid red',
    backgroundColor: 'gainsboro',
    color: 'red',
    fontSize: 20,
    padding: 10,
  };

  return (
    <div className="error" style={errorStyle}>
      {errorMessage}
    </div>
  );
};

export default App;
