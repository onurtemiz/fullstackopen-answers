const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//TODO: when signed up user tries to login
//TODO: when random user tries to login
//TODO: when authorized user tries to add blog
//TODO: when unauthorized user tries to add blog
//TODO: 3 or less username tries to signup
//TODO: 3 or less password tries to signup
//TODO: same username tries to signup
//TODO: no password tries to signup
//TODO: no username tries to signup
//TODO: create a blog > try to remove it with who created it
//TODO: create a blog > try to remove it with random person

describe("when one user in database", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("hehe", 10);
    const user = new User({
      username: "kkkk",
      passwordHash,
    });
    await user.save();
  });

  test("create with a new username", async () => {
    const usersAtStart = await helper.usersInDb();
    const user = {
      username: "heyoo",
      name: "kokok",
      password: "hohoho",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(user.username);
  });

  test("get all users", async () => {
    const usersReal = await helper.usersInDb();
    const usersGot = await api.get("/api/users").expect(200);
    expect(usersGot.body).toHaveLength(usersReal.length);
  });
});

afterAll(async (done) => {
  mongoose.connection.close();
  done();
});
