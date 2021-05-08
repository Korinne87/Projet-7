const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config({path: './.env'}); 

const SQL_USER = process.env.SQL_USER;
const SQL_PASSWORD = process.env.SQL_PASSWORD;
const HOST = process.env.HOST;

//Connexion à la base de donnée Mysql

const DB_connection = mysql.createConnection({
    host     : HOST,
    user     : SQL_USER,
    password : SQL_PASSWORD,
    database: 'groupomania'
});

DB_connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Database successfully connected');
});


module.exports = DB_connection;