/* eslint-disable linebreak-style */
import React, { useState } from 'react';

const Blog = ({ blog, blogService, likeHandler }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [alive, setAlive] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const clickHandler = () => {
    setVisible(!visible);
  };

  const deleteHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      setAlive(false);
    }
  };
  if (!alive) {
    return null;
  }

  if (visible) {
    return (
      <div style={blogStyle} className="blog">
        <p>
          {blog.title}{' '}
          <button onClick={clickHandler} className="hide-blog">
            hide
          </button>
        </p>
        <p>{blog.url}</p>
        <p className="likes">
          likes {likes}{' '}
          <button
            onClick={() => likeHandler(blog, setLikes, likes)}
            className="like-button"
          >
            like
          </button>
        </p>
        <p>{blog.author}</p>
        <button onClick={deleteHandler} className="delete-blog-button">
          remove
        </button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle} className="blog">
        {blog.title} {blog.author}{' '}
        <button onClick={clickHandler} className="view-blog">
          view
        </button>
      </div>
    );
  }
};
export default Blog;
