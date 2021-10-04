import {Client, Pool} from "pg"
import {DB} from "./baseDB.model"

export class PostGreSQL extends DB{
    pool: Pool;
    createPool(){
        this.pool = new Pool(this.dbConfig);
    }
    
    async fetch(sqlQuery: string){
        // const connection = await this.pool.connect();
        const {rows} = await this.pool.query(sqlQuery);
        // connection.release();
        return rows;
    }

    async testConnection(): Promise<boolean>{
        const result = this.fetch("SELECT NOW()");
        return await result !== null
    }
}