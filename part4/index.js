require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "TypeError") {
    return response.status(400).json({
      error: error.message,
    });
  }
  next(error);
};

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

// GET ALL BLOGS
app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs.map((blog) => blog.toJSON()));
  });
});

// GET ONE BLOG
app.get("/api/blogs/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      response.json(blog.toJSON());
    })
    // .catch((error) => next(error));
});

// DELETE ONE BLOG
app.delete("/api/blogs/:id", (request, response) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// POST ONE BLOG
app.post("/api/blogs", (request, response, next) => {
  if (
    !request.body.title ||
    !request.body.author ||
    !request.body.url ||
    !request.body.likes
  ) {
    return response.status(400).json({
      error: "content is missing",
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
app.put("/api/blogs/:id", (request, response, next) => {
  const { body } = request;
  newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  })
    .then((blog) => {
      response.json(blog.toJSON());
    })
    .catch((error) => next(error));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
