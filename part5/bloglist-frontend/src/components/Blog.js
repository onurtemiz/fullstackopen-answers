/* eslint-disable linebreak-style */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog } from '../reducers/blogReducer';
import { createComment } from '../reducers/commentsReducer';
import { likeBlog } from '../reducers/blogReducer';
import { useRouteMatch } from 'react-router-dom';
import Comments from './Comments';
const Blog = () => {
  const dispatch = useDispatch();
  const blogMatch = useRouteMatch('/blogs/:id');
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  if (!blog) {
    return null;
  }

  const deleteHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    const comment = {
      comment: e.target.comment.value,
      blogId: blog.id,
    };
    dispatch(createComment(comment));
    document.getElementById('new-comment-form').reset();
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
      <div>
        <b>Comments</b>
        {user ? (
          <form onSubmit={handleComment} id="new-comment-form">
            <div>
              <input type="text" name="comment" />
              <button type="submit">add comment</button>
            </div>
          </form>
        ) : null}

        <Comments blog={blog} />
      </div>
    </div>
  );
};
export default Blog;
