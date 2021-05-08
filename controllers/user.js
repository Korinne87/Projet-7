const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
var asyncModule = require('async');
const fs = require('fs');


const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,10})/;

// User signup with email and password hash
exports.signup = (req, res, next) => {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;
    let picture;

    if (email == null || username == null || password == null) {
        console.log('Problème de saisie');
        console.log(email);
        console.log(username);
        console.log(password);
        console.log(req.body);
        return res.status(400).json({
            'error': 'missing parameters'
        });
    }
    if (username.length >= 13 || username.length <= 3) {
        console.log('Problème avec username');
        return res.status(400).json({
            'error': 'wrong username (must be length 4 - 12)'
        });

    }
    if (!regexEmail.test(email)) {
        console.log('Problème avec email');
        return res.status(400).json({
            'error': 'email is not valid'
        });
    }
    if (!regexPassword.test(password)) {
        console.log('Problème avec password');
        return res.status(400).json({
            'error': 'password invalid '
        });
    }
    asyncModule.waterfall([
        function (done) {
            models.User.findOne({
                    attributes: ['email'],
                    where: {
                        email: email
                    }
                })
                .then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({
                        'error': 'unable to verify user'
                    });
                });
        },
        function (userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function (err, hash) {
                    done(null, userFound, hash);
                });
            } else {
                return res.status(409).json({
                    'error': 'user already exist'
                });
            }
        },
        function (userFound, hash, done) {
            var newUser = models.User.create({
                email: email,
                    username: username,
                    password: hash,
                    bio: bio,
                    picture:`${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`,
                    isAdmin: 0
                })
                .then(function (newUser) {
                    done(newUser);
                })
                .catch(function (err) {
                    return res.status(500).json({
                        'error': 'cannot add user'
                    });
                });
        }
    ], function (newUser) {
        if (newUser) {
            return res.status(201).json({
                'userId': newUser.id
            });
        } else {
            return res.status(500).json({
                'error': 'cannot add user'
            });
        }
    });
}


// user login with token set up
exports.login = (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    if (email == null || password == null) {
        return res.status(400).json({
            'error': 'missing parameters'
        });
    }
    asyncModule.waterfall([
        function (done) {
            models.User.findOne({
                    where: {
                        email: email
                    }
                })
                .then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({
                        'error': 'unable to verify user'
                    });
                });
        },
        function (userFound, done) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function (errBcrypt, resBcrypt) {
                    done(null, userFound, resBcrypt);
                });
            } else {
                return res.status(404).json({
                    'error': 'user does not exists in database'
                });
            }
        },
        function (userFound, resBcrypt, done) {
            if (resBcrypt) {
                done(userFound);
            } else {
                return res.status(403).json({
                    'error': 'invalid password'
                });
            }
        }
    ], function (userFound) {
        if (userFound) {
            return res.status(201).json({
                userId: userFound.id,
                token: jwt.sign({
                        userId: userFound.id,
                        isAdmin: userFound.isAdmin
                    },
                    'SrYyE!&J5BzF~oh^Z$i=', {
                        expiresIn: '24h'
                    }
                )
            });
        } else {
            return res.status(500).json({
                'error': 'cannot log on user'
            });
        }
    });
};

exports.getUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SrYyE!&J5BzF~oh^Z$i=');
    const userId = decodedToken.userId;
    models.User.findOne({
            attributes: ['id', 'email', 'username', 'bio', 'picture'],
            where: {
                id: userId
            }
        })
        .then(user => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({
                    'error': 'user not found'
                })
            }
        })
        .catch(err => res.status(500).json({
            'error': 'cannot fetch user'
        }));
};
exports.getOneUser = (req, res, next) => {
    const userId = req.params.id
    models.User.findOne({
            attributes: ['id', 'email', 'username', 'bio', 'picture'],
            where: {
                id: userId
            }
        })
        .then(user => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({
                    'error': 'user not found'
                })
            }
        })
        .catch(err => res.status(500).json({
            'error': 'cannot fetch user'
        }));
};
exports.modifyUser = (req, res, next) => {
    var bio = req.body.bio;
    var picture = req.body.picture;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SrYyE!&J5BzF~oh^Z$i=');
    const userId = decodedToken.userId;

    asyncModule.waterfall([
        function (done) {
            models.User.findOne({
                    attributes: ['id', 'bio', 'picture'],
                    where: {
                        id: userId
                    }
                })
                .then(userFound => {
                    done(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({
                        'error': 'unable to verify user'
                    });
                });
        },
        (userFound, done) => {
            if (userFound) {
                userFound.update({
                    bio: (bio ? bio : userFound.bio),
                    picture: (picture ? `${req.protocol}://${req.get('host')}/images/${picture}` : userFound.picture)
                }).then(function () {
                    done(userFound);
                }).catch(function (err) {
                    res.status(500).json({
                        'error': 'cannot update user'
                    });
                });
            } else {
                res.status(404).json({
                    'error': 'user not found'
                });
            }
        }
    ], (userFound) => {
        if (userFound) {
            return res.status(201).json(userFound);
        } else {
            return res.status(500).json({
                'error': 'cannot update user profile'
            });
        }
    });
};

exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SrYyE!&J5BzF~oh^Z$i=');
    const userId = decodedToken.userId;
    console.log(userId);
    models.User.findOne({
        where: {id: userId}
    })
    .then(user=>{
        const filename=user.picture.split('/images/users/')[1];
        fs.unlink(`images/users/${filename}`, () => {
            models.User.destroy({
                   where:{id: user.id}
                })
                .then(() => res.status(200).json({
                    message: 'User deleted'
                }))
                .catch(error => res.status(404).json({'error':'user not found'
                }));
        });
    })
    .catch(error => res.status(500).json({'error':'cannot delete user'
    }));
}