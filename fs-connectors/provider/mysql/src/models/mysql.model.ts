import * as mysql from "mysql2/promise";
import { Pool } from "mysql2/promise";
import {DB, DBConfig} from "./baseDB.model"

export class MySQL extends DB{
    pool: Pool;
    constructor(dbConfig: DBConfig){
        super(dbConfig);
    }
    createPool(){
        this.pool = mysql.createPool(this.dbConfig);
    }
    
    async fetch(sqlQuery: string){
        const connection = await this.pool.getConnection();
        const [result] = await connection.execute(sqlQuery);
        connection.release();
        return result;
    }

    async testConnection(): Promise<boolean>{
        const result = this.fetch("SELECT 1");
        return await result !== null
    }
}