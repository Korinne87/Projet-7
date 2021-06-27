import { UserService } from '../service/user.js';

export const createUser = (req,res) => {
    //console.log(req.body);
    let user = req.body;
    let createDate = new Date();
    user = {...user, createdAt:createDate, updatedAt:createDate};
    console.log(user);
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
    let { email, password, bio, picture, isAdmin, lastname, firstname } = req.body

    // on utilise notre fonction getUserById pour allez recuperer l'utilisateur a modifi�
    const result = UserService.getUsersById(id);
    result.then(function(data) {
        // on recup�re l'utilisateur avec l'identifiant id paser en param�tre
        let user = data[0];

        // on va ajouter les autres propri�t�s qui seront modifi�
        // seulement si les valeurs ont �t�t envoy�es
        if(email) user = {...user,email:email};
        if(password) user = {...user,password:password};
        if(bio) user = {...user,bio:bio};
        if(picture) user = {...user,picture:picture};
        if(isAdmin) user = {...user,isAdmin:isAdmin};
        if(firstname) user = {...user,firstname:firstname};
        if(lastname) user = {...user,lastname:lastname};

        // on met la date de modification a la date du moment
        user = {...user, updatedAt:new Date()};

        console.log(user);
        // on enegistre les modifications
        const updated  = UserService.updateUsers(user)
        updated
        .then(data => res.json({message:"success"}))
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

export const login = (req,res) => {
    let credentials = req.body;
    console.log(credentials);
    const results = UserService.login(credentials);
    results.then(data => {
        if(data.length) {
            console.log(data);
            res.json({ exist: true, user: data });
        }
        else
            res.json({ exist: false });
    })
    .catch(err => console.log(err.message));
}