const express = require("express");
const fs = require("fs-extra");
const path = require("path");
// import { db_constants } from "./constants/dbConstants";
const db_constants = require("./constants/dbConstants");
// import { config } from "./config";
const configServer = require("./config-server");
const config = require("./config");
// const configServer = require("./config-server");

var MongoClient = require("mongodb").MongoClient;
// const { db } = require("./config");
const stringify = require("json-stringify-safe");

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
    collection: req.body.collection,
    user: req.body.user,
    password: req.body.password,
  };
  config.query.statement = req.body.query;
  fs.writeJSON("savedConfig.json", config);
  //   dbService = new DBService();
  res.redirect("/");
});

app.post("/test_configuration-local", async (req, res) => {
  console.log(req.body);
  const newConfig = {
    db_engine: req.body.engine,
    db: {
      host: req.body.host,
      port: req.body.port,
      database: req.body.database,
      collection: req.body.collection,
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
    // let mongoUrlLocal = "mongodb://root:shani@localhost:27017/db";
    let mongoUrl =
      "mongodb://" +
      `${newConfig.db.user}` +
      ":" +
      `${newConfig.db.password}` +
      "@" +
      `${newConfig.db.host}` +
      ":" +
      `${newConfig.db.port}`;
    "/" + `${newConfig.db.database}`;
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

app.get("/data-local", async (req, res) => {
  try {
    // let mongoUrlLocal = "mongodb://root:shani@localhost:27017";
    let mongoUrl =
      "mongodb://" +
      `${config.db.user}` +
      ":" +
      `${config.db.password}` +
      "@" +
      `${config.db.host}` +
      ":" +
      `${config.db.port}` +
      "/" +
      `${config.db.database}`;

    const client = new MongoClient(mongoUrl);
    MongoClient.connect(
      mongoUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      async (err, clients) => {
        if (err) {
          console.log(err);
        } else {
          await client.connect();
          console.log("starting to execute queries");
          let dbname = config.db.database;
          console.log(dbname);
          const db = clients.db(dbname);
          console.log(db);
          console.log(config.query.statement);
          //   const result = await db
          //     .find()
          //     .then((res) => {
          //       res.send(result);
          //     })
          //     .catch((err) => {
          //       console.log(err);
          //     });
          console.log(config.db.collection);
          db.collection(config.db.collection)
            .find({})
            .toArray(function (err, response) {
              if (err) {
                console.log(err);
                res.json(err);
                // return err;
              } else {
                //   await res.json(stringify(response));
                // res.send(`<p>collection created!</p>`);
                // console.log("Collection created!");
                res.json(response);
                console.log(response);
                //   res.json(response.s);
              }
            });
          //   console.log(result);
          //   res.json({ result });

          //   res.send(`<p>some html</p>`);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});

// after saving configuration
app.post("/configure-server", (req, res) => {
  configServer.db = {
    url: req.body.url,
    database: req.body.database,
    collection: req.body.collection,
  };
  fs.writeJSON("savedServerConfig.json", configServer);
  res.redirect("/");
});

app.post("/test_configuration-server", async (req, res) => {
  console.log(req.body);
  const newConfig = {
    db: {
      url: req.body.url,
      database: req.body.database,
      collection: req.body.collection,
    },
    // last_sync_time: config.last_sync_time,
    // query: {
    //   statement: req.body.query,
    // },
  };
  let success;
  try {
    // let mongoUrlLocal = "mongodb://root:shani@localhost:27017/db";
    // let mongoUrl = `${newConfig.db.urlString}`;
    console.log(newConfig.db.url);

    MongoClient.connect(
      newConfig.db.url,
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
