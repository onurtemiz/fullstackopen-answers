const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


// POST ONE PERSON
usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const roundTime = 10;
  const passwordHash = await bcrypt.hash(body.password, roundTime);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  savedUser = await newUser.save();
  response.json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const user = await User.find({}).populate("notes");
  response.json(user.map((u) => u.toJSON()));
});

module.exports = usersRouter;
