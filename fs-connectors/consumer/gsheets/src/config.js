const fs = require("fs-extra");

if(fs.existsSync("savedConfig.json")){
    config = fs.readJsonSync("savedConfig.json"); // could be changed to other more secure storage options
} else {
    config = fs.readJsonSync("defaultConfig.json");
}

module.exports = {
    config
}