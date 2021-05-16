import { response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import DbService from '../service/dbService.js';
import { UserService } from '../service/user.js';

let users = []

export const createUser = (req,res) => {
    //console.log(req.body);
    let user = req.body;
    let createDate = new Date();
    user = {...user, createAt:createDate, updateAt:createDate};
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
    //console.log(req.params); //patch modifie certains attributs alors que put modifie tous les attributs
    let { id } = req.params;
    let user = users.find((user) => user.id ==id);
    let { email, password, bio, picture, isAdmin } = req.body;
    if (email) user.email=email;
    if (password) user.password=password;
    if (bio) user.bio=bio;
    if (picture) user.picture=picture;
    if (isAdmin) user.isAdmin=isAdmin;
    
    
    res.send(`bonjour utilisateur modifié`);
}

export const getUsers = (req,res) => {
    const results = UserService.getAllUsers();
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));
}

export const getUserById = (req,res) => {
    console.log(req.params); //req.params donne la liste des parametres passés dans l url
    let { id } = req.params;
    let user = users.find((user) => user.id ==id);
    res.send(user);
}