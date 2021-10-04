export abstract class DB {
    dbConfig: DBConfig;

    constructor(dbConfig: DBConfig){
        this.dbConfig = dbConfig;
        this.createPool();
    }

    abstract createPool(): void;

    abstract fetch(query: string): any

    abstract testConnection(): Promise<any>;
}

export interface DBConfig{
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
}