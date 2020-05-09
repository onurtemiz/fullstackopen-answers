/* eslint-disable linebreak-style */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, changeBlogVis } from '../reducers/blogReducer';
import { likeBlog } from '../reducers/blogReducer';
import { useRouteMatch } from 'react-router-dom';
const Blog = () => {
  const dispatch = useDispatch();
  const blogMatch = useRouteMatch('/blogs/:id');

  console.log('blogMatch');

  const blogs = useSelector((state) => state.blogs);
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  if (!blog) {
    return null;
  }

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

  return (
    <div className="blog">
      <h2>{blog.title} </h2>
      <a href={blog.url}>{blog.url}</a>
      <p className="likes">
        {blog.likes} likes
        <button
          onClick={() => dispatch(likeBlog(blog))}
          className="like-button"
        >
          like
        </button>
      </p>
      <p>added by {blog.author}</p>
      <button onClick={deleteHandler} className="delete-blog-button">
        remove
      </button>
    </div>
  );
};
export default Blog;
