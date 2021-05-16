import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();
let instance = null;
const connexion = mysql.createConnection({
   host: process.env.HOST, 
   user: process.env.USER,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
   port: process.env.SQL_PORT
});

connexion.connect((err) => {
    if (err) console.log(err.message);
    console.log('db ' + connexion.state);
});

export class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();  //on veut avoir une seule instance de connexion à la base de données
    }

    static getConnexion() {
        return connexion;
    }
}

export default DbService;
