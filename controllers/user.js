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
    .then(data => res.json({success:true,message:`utilisateur crÃ©Ã©`,data:data}))
    .catch(err => console.log(err));
    //users.push({ ...user ,  }); // la fct push permet d ajouter un Ã©lÃ©ment dans une liste 
    
}

export const deleteUser = (req,res) => {
    //console.log(req.params); 
    let { id } = req.params;
    //users = users.filter((user) => user.id != id);
    let result = UserService.deleteUser(id);
    result
    .then(data => res.json({success:true,message:`utilisateur supprimÃ©`}))
    .catch(err => console.log(err));
    res.send(`bonjour utilisateur supprimÃ©`);
}


export const updateUser = (req,res) => {

    // recuperer l'identifiant du user a modifié
    let { id } = req.params;
    // recuperer toutes les infos qui sont envoyer pour modification
    let { email, password, bio, picture, isAdmin } = req.body

    // on utilise notre fonction getUserById pour allez recuperer l'utilisateur a modifié
    const result = UserService.getUsersById(id);
    result.then(function(data) {
        // on recupère l'utilisateur avec l'identifiant id paser en paramètre
        let user = data[0];

        // on va ajouter les autres propriétés qui seront modifié
        // seulement si les valeurs ont étét envoyées
        if(email) user = {...user,email:email};
        if(password) user = {...user,password:password};
        if(bio) user = {...user,bio:bio};
        if(picture) user = {...user,picture:picture};
        if(isAdmin) user = {...user,isAdmin:isAdmin};

        // on met la date de modification a la date du moment
        user = {...user, updatedAt:new Date()};

        // on enegistre les modifications
        const updated  = UserService.updateUsers(user)
        updated
        .then(data => res.json({message:"utilisateur modifié"}))
        .catch((error) => {console.log(err.message)});
    })
    .catch((error) => console.log(error.message));
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