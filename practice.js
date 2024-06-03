const express = require('express')
const app = express()

app.set("view engine", "ejs")
app.use(express.static("./public"))

app.get("/:username", (req, res) => {
   res.render("practice", {content : "Hello " + req.params.username})
})
app.get("/", (req, res) => {
   res.render("practice", {content : "Hello"})
})
app.listen(3000)