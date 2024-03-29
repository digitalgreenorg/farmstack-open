import * as fs from "fs-extra";

let config: Config;
if(fs.existsSync("savedConfig.json")){
    config = fs.readJsonSync("savedConfig.json"); // could be changed to other more secure storage options
} else {
    config = fs.readJsonSync("defaultConfig.json");
}

export interface Config{
    db_engine: string;
    db: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    },
    last_sync_time: "1970-01-01 00:00:00.000";
    query: {
        statement: string;
    }
}

export {
    config
}