import { CommentService } from '../service/comment.js';

export const createComment = (req,res) => {
    //console.log(req.body);
    //const comment = req.body;
    let comment = req.body;
    let createDate = new Date();
    comment = { ...comment, createdAt:createDate, updatedAt:createDate };
    //comments.push({ ...comment , id:uuidv4() });
    let result = CommentService.createComments(comment);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
    //res.send(`commentaire ajouté`);
}     
          
           

export const deleteComment = (req,res) => {
    //console.log(req.params);
    let { id } = req.params;
    //comments = comments.filter((user) => user.id != id);
    let result = CommentService.deleteComment(id);
    result 
    .then(data => res.json({success:true,message:`commentaire supprimé`,data:data}))
    .catch(err => console.log(err));
    //res.send(`commentaire supprimé`);
}


export const getComments = (req,res) => {
    //res.send(comments);
    
    const results = CommentService.getAllComments();
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));
}

export const getCommentById = (req,res) => {
    //console.log(req.params);
    let { id } = req.params;
    //let comment = comments.find((comment) => comment.id ==id);
    const results = CommentService.getCommentsById(id);
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));

    //res.send(comment);
}

export const updateComment = (req,res) => {
        let { id } = req.params;
        // récupérer toutes les infos qui sont envoyées pour modification
        let { content } = req.body
    
        // on utilise notre fonction getCommentById pour aller récupérer l'utilisateur à modifier
        const result = CommentService.getCommentsById(id);
        result.then(function(data) {
            // on recupère le commentaire avec l'identifiant id passé en paramètre
            let comment = data[0];
    
            // on va ajouter les autres propriétés qui seront modifiées
            // seulement si les valeurs ont été envoyées
            if(content) comment.content=content;
            
    
            comment.updatedAt= new Date();
    
            // on enegistre les modifications
            const updated  = CommentService.updateComments(comment)
            updated
            .then(data => res.json({message:"commentaire modifié"}))
            .catch((error) => {console.log(err.message)});
        })
        .catch((error) => console.log(error.message));
    }
