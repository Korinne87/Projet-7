import { v4 as uuidv4 } from 'uuid';
import { PostService } from '../service/post.js';

let posts = []

export const createPost = (req,res) => {
    let post = req.body;
    let createDate = new Date();
    post = { ...post, createdAt:createDate, updatedAt:createDate, id:uuidv4() };
    let result = PostService.createPosts(post);
    result
    .then(data => res.json({success:true,message:`post ajouté`,data:data}))
    .catch(err => console.log(err));
    
}     
          
           

export const deletePost = (req,res) => {
    let { id } = req.params;
    let result = PostService.deletePost(id);
    result 
    .then(data => res.json({success:true,message:`post supprimé`,data:data}))
    .catch(err => console.log(err));

}


export const getPosts = (req,res) => {
    const results = PostService.getAllPosts();
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));
}

export const getPostById = (req,res) => {
    let { id } = req.params;
    const results = PostService.getPostsById(id);
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));
}

export const updatePost = (req,res) => {
        let { id } = req.params;
        let { title, content } = req.body
        const result = PostService.getPostsById(id);
        result.then(function(data) {
            let post = data[0];
    
            if(title) post = {...post, title:title};
            if(content) post = {...post,content:content};
            
            post = {...post, updatedAt:new Date()};
    
            const updated  = PostService.updatePosts(post)
            updated
            .then(data => res.json({message:"post modifié"}))
            .catch((error) => {console.log(err.message)});
        })
        .catch((error) => console.log(error.message));
    }
