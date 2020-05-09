import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { reset } from 'redux-form';
import React from 'react';
const CreateBlogForm = ({ setSucessMessage, blogFormRef }) => {
  const dispatch = useDispatch();
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    dispatch(createBlog(blog));
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility();
    }
    document.getElementById('new-blog-form').reset();
    setSucessMessage(`a new blog ${blog.title} by ${blog.author} added`);
    setTimeout(() => {
      setSucessMessage('');
    }, 5000);
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog} id="new-blog-form">
        <div>
          title: <input type="text" name="title" id="titleInput" />
        </div>
        <div>
          author: <input type="text" name="author" id="authorInput" />
        </div>
        <div>
          url: <input type="text" name="url" id="urlInput" />
        </div>
        <button type="create" id="create-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
