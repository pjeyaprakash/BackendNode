import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config()

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Myjp@1234",
    database: process.env.DB_NAME || "mydatabase",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Database Connected Successfully..");
        connection.release(); // release back to pool
    } catch (err) {
        console.error("Failed to Connect Database:", err.message);
        process.exit(1); // stop server if DB fails
    }
})();

export default db;