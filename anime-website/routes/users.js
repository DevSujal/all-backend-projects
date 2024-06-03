const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/anime");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model("Users", userSchema);
