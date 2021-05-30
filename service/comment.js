import { DbService } from './dbService.js';
export class CommentService {
    static async getAllComments() {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "SELECT * FROM comments;";
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

    static async getCommentsById(id) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "SELECT * FROM comments where id=?;";
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

    static async createComments({postId, userId, content, createdAt, updatedAt}) {
        try {
         const response = await new Promise((resolve, reject) =>{
             const query= "INSERT INTO comments (postId, userId, content, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?);";
             let db = DbService.getConnexion();
             db.query(query,[postId, userId, content, createdAt, updatedAt], (err,result) =>{
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
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
             const query= "DELETE FROM comments where id=?";
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
    static async updateComments({id,postId, userId, content, updatedAt}) {
        try {
         const response = await new Promise((resolve, reject) => {
             const query= "UPDATE comments SET postId = ?, userId = ?, content = ?, updatedAt = ? WHERE id = ?";
             let db = DbService.getConnexion();
             db.query(query,[id,postId, userId, content, updatedAt], (err,result) =>{
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
export default CommentService;