import pg, { Pool } from "pg";

class ConnectPg{
    sql: pg.Pool

    constructor(){
        this.sql = new Pool({
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            port: parseInt(process.env.PG_PORT!)
        })
    }

    isConnect = async() =>{
        await this.sql.connect()
        console.log(`pg db connect`);

        await this.sql.on('error', (err) => {
            console.error('Error connecting to PostgreSQL database', err);
        });
    }
}

export default ConnectPg;