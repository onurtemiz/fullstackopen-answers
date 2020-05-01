const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");

console.log("test started");
beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("old entry deleted");
  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
  console.log("new entries are added");
});

afterAll(() => {
  mongoose.connection.close();
});

test("all blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.blogs.length);
});

test("id must be defined for every item", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("new item can added to", async () => {
  const newBlog = new Blog({
    title: "Neler oluyor neler",
    author: "Ahmet Mehmet",
    url: "cokgizlibirurlbidiribibd",
    likes: 102,
  });

  await api.post("/api/blogs").send(newBlog);
  const blogsNew = await helper.blogsInDb();
  expect(blogsNew).toHaveLength(helper.blogs.length + 1);
  const authors = blogsNew.map((blog) => blog.author);
  expect(authors).toContain("Ahmet Mehmet");
});

test("if no like specified, 0 likes created", async () => {
  const newBlog = new Blog({
    title: "nelerlerelre",
    author: "burasicokonemli",
    url: "huehuehuehueuhe",
  });

  const response = await api.post("/api/blogs").send(newBlog);
  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toEqual(0);
});

test("url must be present", async () => {
  const newBlog = new Blog({
    author: "burasicokonemli",
    title: "huehuehuehueuhe",
  });
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("title must be present", async () => {
  const newBlog = new Blog({
    author: "burasicokonemli",
    url: "huehuehuehueuhe",
  });

  await api.post("/api/blogs").send(newBlog).expect(400);
});
