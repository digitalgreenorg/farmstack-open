import * as express from "express";
import { Config, config } from "./config";
import DBService from "./services/db.service";
import * as fs from "fs-extra";
import * as path from "path";
import { db_constants } from "./constants";

const app = express();
const port = 3001;

let dbService = new DBService();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    db_engines: db_constants.default.engines,
    config: config,
  });
});

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
  dbService = new DBService();
  res.redirect("/");
});

app.post("/test_configuration", async (req, res) => {
  console.log(req.body);
  const newConfig: Config = {
    db_engine: req.body.engine,
    db: {
      host: req.body.host,
      port: req.body.port,
      database: req.body.database,
      user: req.body.user,
      password: req.body.password,
    },
    last_sync_time: config.last_sync_time,
    query: {
      statement: req.body.query,
    },
  };
  try {
    let success = await dbService.testNewConnection(newConfig);
    res.json({
      success: success,
    });
    // console.log(res.json());
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err,
    });
  }
});

app.get("/data", async (req, res) => {
  try {
    const result = await dbService.fetch(config.query.statement);
    res.json(result);
    // console.log(res.json(result));
    const date = new Date().toISOString().replace("T", " ").replace("Z", "");
    fs.writeJSON("savedConfig.json", config);
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});

app.get("/status", async (req, res) => {
  var status = {
    mysqlStatus: false,
  };
  try {
    const result = await dbService.testConnection();
    status.mysqlStatus = result;
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
  res.json(status);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
