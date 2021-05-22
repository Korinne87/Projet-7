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
    // recuperer l'identifiant du user a modifi�
    let { id } = req.params;
    // recuperer toutes les infos qui sont envoyer pour modification
    let { email, password, bio, picture, isAdmin } = req.body

    // creer un objet user avec juste son identifiant au depart
    let user = {id:id};

    // on va ajouter les autres propri�t�s qui seront modifi�
    // seulement si les valeurs ont �t�t envoy�es

    if(email) user = {...user,email:email};
    if(password) user = {...user,password:password};
    if(bio) user = {...user,bio:bio};
    if(picture) user = {...user,picture:picture};
    if(isAdmin) user = {...user,isAdmin:isAdmin};

    user = {...user, updatedAt:new Date()};

    console.log(user);

    /// pon passe  la fonction updateUser l'identifiant et les infos a modifi�
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
    // recuperer l'identifiant de l'utilisateur
    let { id } = req.params
    const results = UserService.getUsersById(id);
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));
    
}