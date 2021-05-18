import { response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import DbService from '../service/dbService.js';
import { UserService } from '../service/user.js';

let users = []

export const createUser = (req,res) => {
    //console.log(req.body);
    let user = req.body;
    let createDate = new Date();
    user = {...user, createdAt:createDate, updatedAt:createDate};
    //console.log(user);
    let result = UserService.createUsers(user);
    result
    .then(data => res.json({success:true,message:`utilisateur créé`,data:data}))
    .catch(err => console.log(err));
    //users.push({ ...user ,  }); // la fct push permet d ajouter un élément dans une liste 
    
}

export const deleteUser = (req,res) => {
    //console.log(req.params); 
    let { id } = req.params;
    //users = users.filter((user) => user.id != id);
    let result = UserService.deleteUser(id);
    result
    .then(data => res.json({success:true,message:`utilisateur supprimé`}))
    .catch(err => console.log(err));
    res.send(`bonjour utilisateur supprimé`);
}


export const updateUser = (req,res) => {
    //console.log(req.body);
    let user = req.body;
    let createDate = new Date();
    user = {...user, createdAt:createDate, updatedAt:createDate};
    //console.log(user);
    let result = UserService.updateUsers(user);
    result
    .then(data => res.json({success:true,message:`utilisateur modifié`,data:data}))
    .catch(err => console.log(err));
}
//patch modifie certains attributs alors que put modifie tous les attributs

export const getUsers = (req,res) => {
    const results = UserService.getAllUsers();
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));
}

export const getUserById = (req,res) => {
    const results = UserService.getUsersById();
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));
    
}