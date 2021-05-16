const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config({path: './.env'}); 

const SQL_USER = process.env.SQL_USER;
const SQL_PASSWORD = process.env.SQL_PASSWORD;
const HOST = process.env.HOST;

