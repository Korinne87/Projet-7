import { DbService } from './dbService.js';
export class UserService {
    static async getAllUsers() {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "SELECT * FROM USERS;";
             let db = DbService.getConnexion();
             db.query(query,(err,results) =>{
                if (err) reject(new Error(err.message));
                resolve(results);
             });
         });  
         return response;
        } catch (error) {
         console.log(error.message);
        }
    }
    static async createUsers({username, email, password, picture, bio, isAdmin, createAt, updateAt}) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "INSERT INTO USERS(username, email, password, picture, bio, isAdmin, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
             let db = DbService.getConnexion();
             db.query(query,[username, email, password, picture, bio, isAdmin, createAt, updateAt], (err,result) =>{
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
             });
         });  
         return response;
        } catch (error) {
         console.log(error.message);
        }
    }
    static async deleteUser(id) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "DELETE FROM USERS where id=?";
             let db = DbService.getConnexion();
             db.query(query,[id], (err,result) =>{
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
             });
         });  
         return response;
        } catch (error) {
         console.log(error.message);
        }
    }
}
export default UserService;