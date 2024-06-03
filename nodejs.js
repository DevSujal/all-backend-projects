const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use((req, res, next) => {
  console.log("Middleware Hits...");
  next();
});
app.get("/", (req, res) => {
  // res.render("index");
  throw Error("nahi chal raha")
});
app.get("/profile", (req, res) => {
  res.send("Hi These Is The Profile Page");
});
app.get("/error", (req, res, next ) => {
  throw Error("something went wrong");
})
app.get("/profile/:username", (req, res) => {
  res.send("Hello From " + req.params.username);
});
// error handling
app.use(errorHandler = (err, req, res, next) => {
  if(res.headersSent){
    return next(err)
  }
  res.status(500)
  res.render('error', {error : err})
})
app.listen(6974);
