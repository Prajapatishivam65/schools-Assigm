const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12746524',
    password: 'J9D92Gylni',
    database: 'sql12746524',
    port: 3306,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Database connected successfully!");
    connection.release(); // Release the connection back to the pool
});

module.exports = db;
