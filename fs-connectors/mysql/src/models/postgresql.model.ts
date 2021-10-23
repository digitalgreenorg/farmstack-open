import {Client, Pool} from "pg"
import {DB} from "./baseDB.model"

export class PostGreSQL extends DB{
    pool: Pool;
    createPool(){
        this.pool = new Pool(this.dbConfig);
    }
    
    async fetch(sqlQuery: string){
        const {rows} = await this.pool.query(sqlQuery);
        return rows;
    }

    async testConnection(): Promise<boolean>{
        const result = this.fetch("SELECT NOW()");
        return await result !== null
    }
}