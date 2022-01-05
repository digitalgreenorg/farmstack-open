const { ObjectId } = require("bson");
const { query } = require("express");
const fs = require("fs-extra");

let config = Config;

if (fs.existsSync("savedConfig.json")) {
  config = fs.readJsonSync("savedConfig.json"); // could be changed to other more secure storage options
} else {
  config = fs.readJsonSync("defaultConfig.json");
}

var Config = {
  db_engine: { type: String },
  db: {
    host: { type: String },
    port: { type: Number },
    user: { type: String },
    password: { type: String },
    database: { type: String },
    collection: { type: String },
    url: { type: String },
  },
  //   last_sync_time= "1970-01-01 00:00:00.000",
  query: {
    statement: { type: {} },
  },
};

// export default config;
module.exports = config;
