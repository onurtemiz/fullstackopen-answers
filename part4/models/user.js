const mongoose = require("mongoose");
const uniqueler = require("mongoose-unique-validator");
mongoose.set("useFindAndModify", false);

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set(uniqueler);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
