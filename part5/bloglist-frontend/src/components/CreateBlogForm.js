import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({ setBlogs, blogs, setSucessMessage, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };
    const response = await blogService.create(blog);
    blogFormRef.current.toggleVisibility();
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
          title:{" "}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
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

export default CreateBlogForm;
