const express = require("express");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const port = 3000;

// ejs
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
  res.render("index");
});


// port config
app.listen(port, () => {
  console.log(`MongoDb connector app listening at http://localhost:${port}`);
});
