var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/infinix");
const userschema = mongoose.Schema({
  username: String,
  modelnumber: Number,
  email: String,
});


mongoose.exports = mongoose.model("user", userschema);
