const fs = require("fs-extra");

let configServer = ConfigServer;

if (fs.existsSync("savedServerConfig.json")) {
  configServer = fs.readJsonSync("savedServerConfig.json"); // could be changed to other more secure storage options
} else {
  configServer = fs.readJsonSync("defaultServerConfig.json");
}

var ConfigServer = {
  db: {
    database: { type: String },
    collection: { type: String },
    url: { type: String },
  },
};

// export default config;
module.exports = configServer;
