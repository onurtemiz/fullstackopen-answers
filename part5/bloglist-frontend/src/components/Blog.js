/* eslint-disable linebreak-style */
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog, changeBlogVis } from '../reducers/blogReducer';

const Blog = ({ blog, likeHandler }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const clickHandler = () => {
    dispatch(changeBlogVis(blog));
  };

  const deleteHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };
  if (!blog) {
    return null;
  }

  if (blog.visible) {
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
          likes {blog.likes}{' '}
          <button onClick={() => likeHandler(blog)} className="like-button">
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
