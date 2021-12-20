const fs = require("fs-extra");

let config_server = Config;

if (fs.existsSync("savedServerConfig.json")) {
  config_server = fs.readJsonSync("savedServerConfig.json"); // could be changed to other more secure storage options
} else {
  config_server = fs.readJsonSync("defaultConfig.json");
}

var Config = {
  db: {
    database: { type: String },
    collection: { type: String },
  },
};

// export default config;
module.exports = config_server;
