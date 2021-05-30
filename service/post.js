import { DbService } from './dbService.js';
export class PostService {
    static async getAllPosts() {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "SELECT * FROM posts;";
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

    static async getPostsById(id) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "SELECT * FROM posts where id=?;";
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

    static async createPosts({userId, title, content, createdAt, updatedAt}) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "INSERT INTO posts (userId, title, content, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?);";
             let db = DbService.getConnexion();
             db.query(query,[userId, title, content, createdAt, updatedAt], (err,result) =>{
                if (err) reject(new Error(err.message));
               // resolve(result.insertId);
             });
         });  
         return response;
        } catch (error) {
         console.log(error.message);
        }
    }
    static async deleteComment(id) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "DELETE FROM posts where id=?";
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
    static async updatePosts({id, userId, title, content, updatedAt}) {
        try {
         const response = await new Promise((resolve, reject) => {
             const query= "UPDATE posts SET userId = ?, title = ?, content = ?, updatedAt = ? WHERE id = ?";
             let db = DbService.getConnexion();
             db.query(query,[id, userId, title, content, updatedAt], (err,result) =>{
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
export default PostService;