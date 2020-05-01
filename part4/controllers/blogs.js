const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// GET ALL BLOGS
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs.map((blog) => blog.toJSON()));
  });
});

// GET ONE BLOG
blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id).then((blog) => {
    response.json(blog.toJSON());
  });
  // .catch((error) => next(error));
});

// DELETE ONE BLOG
blogsRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// POST ONE BLOG
blogsRouter.post("/", (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: "title or url is missing",
    });
  }

  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result.toJSON());
    })
    .catch((error) => next(error));
});

// CHANGE ONE BLOG
blogsRouter.put("/:id", async (request, response, next) => {
  const { body } = request;
  newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.json(blog.toJSON());
});

module.exports = blogsRouter;
