import { DbService } from './dbService.js';
export class UserService {
    static async getAllUsers() {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "SELECT firstname,lastname,Email,Username,sexe FROM USERS;";
             
             let db = DbService.getConnexion();
             console.log(query);
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

    static async getUsersById(id) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "SELECT firstname,lastname,Email,Username,sexe FROM USERS where id=?;";
             let db = DbService.getConnexion();
             db.query(query,[id],(err,results) =>{
                if (err) reject(new Error(err.message));
                resolve(results);
             });
         });  
         return response;
        } catch (error) {
         console.log(error.message);
        }
    }

    static async login({username,password}){
        try{
            const response = await new Promise((resolve,reject) => {
                const query = "SELECT * FROM USERS WHERE Username = ? and Password = ?";
                let db = DbService.getConnexion();
                db.query(query,[username,password], (err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch(error) {
            console.log(error.message);
        }
    }

    static async createUsers({username, email, password, picture, bio, isAdmin, createdAt, updatedAt, firstname, lastname,sexe}) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "INSERT INTO USERS(Username, Email, Password, Picture, Bio, IsAdmin, createdAt, updateddAt,firstname,lastname,sexe) VALUES(?, ?, ?, ?, ?, ?, ?, ?,?,?,?);";
             let db = DbService.getConnexion();
             db.query(query,[username, email, password, picture, bio, isAdmin, createdAt, updatedAt,firstname, lastname, sexe], (err,result) =>{
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
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
    static async updateUsers({Id,Email, Password, Picture, Bio, IsAdmin,updatedAt,firstname,lastname}) {
        try {
            console.log(Id);
         const response = await new Promise((resolve, reject) => {
             const query= "UPDATE users SET email = ?, password = ?, picture = ?, bio = ?, isAdmin = ?, updateddAt = ?, firstname = ?, lastname = ? WHERE id = ?";
             let db = DbService.getConnexion();
             db.query(query,[Email, Password, Picture, Bio, IsAdmin, updatedAt,firstname,lastname,Id], (err,result) =>{
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