const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// not required to export
const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
