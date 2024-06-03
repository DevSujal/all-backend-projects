var express = require("express");
var router = express.Router();
const userModel = require("./users");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));

// rgister route
router.post("/register", (req, res) => {
  let userData = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });
  userModel.register(userData, req.body.password).then((registeruser) => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});


// login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  (req, res) => {}
);

// logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.cookie("name" , "sujal")
  // req.session.ban = true;
  res.render("index");
});
router.get("/flash", (req, res) => {
  req.flash("name", "sujal");
  res.send("ban gay bro");
});
router.get("/getFlash", (req, res) => {
  res.send(req.flash("name"));
});
router.get("/create", async function (req, res) {
  const user = await userModel.create({
    userName: "asujalli",
    nikename: "asujallli" + "cute",
    descreption: "i dont know",
    categories: ["hard", "soft", "white", "pink", "open", "cute"],
  });
  res.send(user);
});

// case insensitive search in mongodb -> imp
router.get("/find/:username", async (req, res) => {
  let regx = new RegExp(`^${req.params.username}$`, "i");
  let user = await userModel.find({ userName: regx });
  res.send(user);
});

// finding categoris of array search
router.get("/findcategories", async (req, res) => {
  let users = await userModel.find({ categories: { $all: ["python"] } });
  res.send(users);
});

// finding on the basis of date
router.get("/findDate", async (req, res) => {
  let startdate = new Date("2023-11-11");
  let endDate = new Date("2023-11-13");

  let users = await userModel.find({
    createdDate: { $gte: startdate, $lte: endDate },
  });
  res.send(users);
});

// finding on the basis of if  a field exist or not
router.get("/findExistance", async (req, res) => {
  let users = await userModel.find({ categories: { $exists: true } });
  res.send(users);
});
// finding on the basis of length of specific field
router.get("/findlength", async (req, res) => {
  let users = await userModel.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: "$nikename" }, 0] },
        { $lte: [{ $strLenCP: "$nikename" }, 12] },
      ],
    },
  });
  res.send(users);
});
router.get("/display", async (req, res) => {
  let allusers = await userModel.find();
  // let user1 = await userModel.findOne({name : "Sujal Nimje"})
  res.send(allusers);
});

router.get("/delete", async (req, res) => {
  let deleteduser = await userModel.collection.deleteMany();
  res.send(deleteduser);
});

router.get("/checksession", (req, res) => {
  if (req.session.ban) {
    res.send("you are banned");
  } else {
    res.send("not banned");
  }
});
router.get("/removebanned", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send("banned removed");
  });
});

router.get("/readCookie", (req, res) => {
  console.log(req.cookies.name);
  res.send("check");
});

router.get("/deleteCookie", (req, res) => {
  res.clearCookie("name");
  res.send("sujal");
});

router.get("/createusers/:username/:age", async (req, res) => {
  const users = await userModel.create({
    name: req.params.username,
    age: req.params.age,
  });
  res.send(users);
});

router.get("/displayusers", async (req, res) => {
  let users = await userModel.find();
  users = Array.from(users);
  let newusers = users.filter((value) => {
    return value.age < 30 && value.age > 18;
  });
  res.send(newusers);
});

module.exports = router;