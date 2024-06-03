var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", (req, res) => {
  const { username, fullname, email } = req.body;
  const userData = new userModel({
    username,
    fullname,
    email,
  });
  userModel.register(userData, req.body.password).then((registeruser) => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/loginpage",
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) return next(err);

    res.redirect("/loginpage");
  });
});

isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/loginpage");
};

router.get("/profile", (req, res) => {
  res.render("profile");
});
router.get("/loginpage", (req, res) => {
  res.render("loginpage");
});
router.get("/registerpage", (req, res) => {
  res.render("registerpage");
});

router.route("/feed").get(isLoggedIn, (req, res) => {
  res.render("feed");
});

// router.get('/createUser', async (req, res) => {
//   const createduser = await userModel.create({
//     username : "sujal",
//     email : "sujalnimje@gmail.com" ,
//     fullname : "sujal sunil nimje",
//     password : "sujal123",
//     post : []
//   })
//   res.send(createduser)
// })

// router.get('/createPost', async (req, res) => {
//   const createdpost = await postModel.create({
//     postText : "Hello EveryOne" ,
//     user : "65596e5f5ee7ccc99e35ab34",
//   })
//   let user = await userModel.findOne({_id : "65596e5f5ee7ccc99e35ab34",})
//   user.post.push(createdpost._id)
//   await user.save()
//   res.send(createdpost)
// })

// router.get("/userpost", async (req, res) => {
// let user = await userModel
// .findOne({_id : "65596e5f5ee7ccc99e35ab34"})
// .populate('post')
//  res.send(user)
// })

// router.all('*', (req, res,next) => {
//   throw Error("something went wrong")
// })
module.exports = router;
