import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "user",
  password: process.env.MYSQL_PASSWORD || "userpassword",
  database: process.env.MYSQL_DATABASE || "authdb",
});
