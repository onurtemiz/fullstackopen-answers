import React, { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlogForm = ({ setBlogs, blogs, setSucessMessage, blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };
    const response = await blogService.create(blog);
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility();
    }
    setBlogs(blogs.concat(response));
    setTitle('');
    setAuthor('');
    setUrl('');
    setSucessMessage(`a new blog ${blog.title} by ${blog.author} added`);
    setTimeout(() => {
      setSucessMessage('');
    }, 5000);
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:{' '}
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            id="authorInput"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            id="urlInput"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="create" id="create-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
