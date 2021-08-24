import { config, Config } from "../config";
import dbConstants from "../constants/dbConstants";
import {DB, MySQL} from '../models';
import { PostGreSQL } from "../models/postgresql.model";


export default class DBService{
    dbObj: DB;
    constructor(){
        if(config.db_engine)
            this.reinit();
    }

    reinit(){
        switch(config.db_engine){
            case dbConstants.engines.mysql: this.dbObj = new MySQL(config.db); break;
            case dbConstants.engines.postgres: this.dbObj = new PostGreSQL(config.db); break;
        }
    }

    fetch(sqlQuery: string): any{
        return this.dbObj.fetch(sqlQuery);
    }

    testConnection(){
        return this.dbObj.testConnection();
    }

    testNewConnection(config: Config): Promise<any>{
        let newObj: DB;
        switch(config.db_engine){
            case dbConstants.engines.mysql: newObj = new MySQL(config.db); break;
            case dbConstants.engines.postgres: newObj = new PostGreSQL(config.db); break;
        }
        return newObj.testConnection()
    }
}