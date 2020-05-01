const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("most blogs author", () => {
  test("with lots of blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    const subject = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    expect(result).toEqual(subject);
  });

  test("with one blog", () => {
    const result = listHelper.mostBlogs([blogs[0]]);
    const subject = {
      author: "Michael Chan",
      blogs: 1,
    };
    expect(result).toEqual(subject);
  });
});

describe("most likes author", () => {
  test("with lots of blogs", () => {
    const result = listHelper.mostLikes(blogs);
    const subject = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    expect(result).toEqual(subject);
  });

  test("with one blog", () => {
    const result = listHelper.mostLikes([blogs[0]]);
    const subject = {
      author: "Michael Chan",
      likes: 7,
    };
    expect(result).toEqual(subject);
  });
});

describe("founding most liked post", () => {
  test("lots of blog most liked post", () => {
    const b = blogs;
    const result = listHelper.favoriteBlog(b);
    expect(result).toEqual(blogs[2]);
  });

  test("one blog most liked post", () => {
    const b = [blogs[0]];
    const result = listHelper.favoriteBlog(b);
    expect(result).toEqual(blogs[0]);
  });
});

describe("counting total likes", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });

  test("when lots of blogs are there", () => {
    const b = blogs;
    const result = listHelper.totalLikes(b);
    expect(result).toBe(36);
  });

  test("when one blog has 0 likes", () => {
    const b = [blogs[4]];
    const result = listHelper.totalLikes(b);
    expect(result).toEqual(0);
  });
});
