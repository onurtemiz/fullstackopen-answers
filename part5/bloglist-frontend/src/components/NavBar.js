import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

const NavBar = ({ loginFormRef }) => {
  const padding = {
    padding: 5,
  };
  return (
    <div>
      <Link to="/blogs/" style={padding}>
        blogs
      </Link>
      <Link to="/users/" style={padding}>
        users
      </Link>
      <Login loginFormRef={loginFormRef} />
    </div>
  );
};

export default NavBar;
