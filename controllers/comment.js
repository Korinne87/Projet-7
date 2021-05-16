import { v4 as uuidv4 } from 'uuid';

let comments = [
    {
        'id':uuidv4(),
        'postId':'aaaa',
        'userId':'bbbb',
        'content': 'il était une fois...',
        'createdAt': '13/05/2021',
        'updateAt': '14/05/2021'
    }
]

export const createComment = (req,res) => {
    console.log(req.body);
    const comment = req.body;
    comments.push({ ...comment , id:uuidv4() });
    res.send(`commentaire ajouté`);
}     
          
           

export const deleteComment = (req,res) => {
    console.log(req.params);
    let { id } = req.params;
    comments = comments.filter((user) => user.id != id);
    res.send(`commentaire supprimé`);
}


export const getComments = (req,res) => {
    res.send(comments);
}

export const getCommentById = (req,res) => {
    console.log(req.params);
    let { id } = req.params;
    let comment = comments.find((comment) => comment.id ==id);
    res.send(comment);
}

export const updateComment = (req,res) => {
    
}