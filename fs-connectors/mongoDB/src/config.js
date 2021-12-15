let config= Config;

export const Config= {
  db_engine: string,
  db= {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
  },
  last_sync_time: "1970-01-01 00:00:00.000",
  query: {
    statement: string,
  }
}

export default config;