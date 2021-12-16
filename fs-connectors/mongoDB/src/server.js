const express = require("express");
const fs = require("fs-extra");
const path = require("path");
// import { db_constants } from "./constants/dbConstants";
const db_constants = require("./constants/dbConstants");
// import { config } from "./config";
const config = require("./config");
const Config = require("./config");

var MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// ejs
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
  res.render("index", {
    db_engine: db_constants.engine,
    config: config,
  });
});

// after saving configuration
app.post("/configure", (req, res) => {
  config.db_engine = req.body.engine;
  config.db = {
    host: req.body.host,
    port: req.body.port,
    database: req.body.database,
    user: req.body.user,
    password: req.body.password,
  };
  config.query.statement = req.body.query;
  fs.writeJSON("savedConfig.json", config);
  //   dbService = new DBService();
  res.redirect("/");
});

app.post("/test_configuration", async (req, res) => {
  console.log(req.body);
  const newConfig = {
    db_engine: req.body.engine,
    db: {
      host: req.body.host,
      port: req.body.port,
      database: req.body.database,
      user: req.body.user,
      password: req.body.password,
    },
    // last_sync_time: config.last_sync_time,
    query: {
      statement: req.body.query,
    },
  };
  let success;
  try {
    // let mongoUrlLocal = "mongodb://root:shani@localhost:27017";
    let mongoUrl =
      "mongodb://" +
      `${newConfig.db.user}` +
      ":" +
      `${newConfig.db.password}` +
      "@" +
      `${newConfig.db.host}` +
      ":" +
      `${newConfig.db.port}`;
    MongoClient.connect(
      mongoUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            error: err,
          });
        } else {
          console.log("connection successful!");
          res.json({
            success: true,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err,
    });
  }
});

// port config
app.listen(port, () => {
  console.log(`MongoDb connector app listening at http://localhost:${port}`);
});
