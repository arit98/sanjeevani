const mysql = require('mysql');
require("dotenv").config();

const conn = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = conn;