import {DataSource} from "typeorm";
import path from "path";

export class DatabaseConfig{
    static async Init () {
        const AppDataSource = new DataSource({
            type        : "mysql",
            host        : process.env.DB_HOST || "",
            username    : process.env.DB_USER || "",
            password    : process.env.DB_PASS || "",
            database    : process.env.DB_NAME || "",
            port        : Number(process.env.DB_PORT) || 3306,
            charset     : "utf8mb4",
            entities    : [ path.join(__dirname, '../') + "/entities/*.{ts,js}"],
            synchronize : true
        })
        await AppDataSource.initialize()
    }
}