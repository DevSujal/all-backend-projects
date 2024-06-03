var express = require("express");
var router = express.Router();
const userModel = require('./users')
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// rgister route
router.post("/register", (req, res) => {
  let userData = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
  });

  userModel.register(userData, req.body.password).then((registeruser) => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

router.get('/registerpage', (req, res) => {
  res.render('registerpage')
})

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
    res.redirect("/loginpage");
  });
});

router.get("/loginpage", (req, res) => {
  res.render("loginpage");
});

router.all('*', (req, res) => {
  throw Error("something went wrong")
})

module.exports = router;
