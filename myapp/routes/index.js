var express = require("express");
var router = express.Router();
const usermodel = require("./users");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/me", (req, res) => {
  res.render("myself", { name: "sujal", age: 12 });
});
// creating a user
router.get("/create/:username", async (req, res) => {
  const createduser = await usermodel.create({
    username: req.params.username,
    modelnumber: 1,
    email: req.params.username + "@gmail.com",
  });
  res.send(createduser);
});

// find all users or to get info of database

router.get("/allusers", async (req, res) => {
  let allusers = await usermodel.find();
  res.send(allusers);
});

module.exports = router;
