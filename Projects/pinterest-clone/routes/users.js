const mongoose = require("mongoose");
const plm = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/mydb");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required : true,
    unique: true,
  },
  password: {
    type: String,
  },
  dp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  post: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Posts"
  }],
  fullname: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm)

module.exports = mongoose.model("Users", userSchema);
