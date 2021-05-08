const fs = require('fs');
const models = require('../models');
const jwt = require('jsonwebtoken');
var asyncModule = require('async');


exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SrYyE!&J5BzF~oh^Z$i=');
    const userId = decodedToken.userId;
    var title = req.body.title;
    var content = req.body.content;
    let attachment;
    if (title == null || content == null) {
        return res.status(400).json({
            'error': 'missing parameters'
        });
    }
    asyncModule.waterfall([
        function (done) {
            models.User.findOne({
                    attributes: ['id'],
                    where: {
                        id: userId
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
                if(req.file!=undefined){
                    (req,res)=>{
                        try{
                            let attachment=`${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`;
                            res.send(req.file);
                        }catch(err){
                            res.status(400).json({error});
                        }
                    }
                }
                else{
                    attachment='null';
                }
                let date= new Date();
                models.Post.create({
                        title: title,
                        content: content,
                        attachment: attachment,
                        likes: 0,
                        UserId: userFound.id
                    })
                    .then(newPost => {
                        done(newPost);
                    });
            } else {
                res.status(404).json({
                    'error': 'user not found'
                });
            }
        }
    ], function (newPost) {
        if (newPost) {
            return res.status(201).json(newPost);
        } else {
            return res.status(500).json({
                'error': 'cannot post your post'
            });
        }
    });
};

exports.getAllPosts = (req, res, next) => {
    var order = req.query.order;
    var fields = req.query.fields;
    models.Post.findAll({
            order: [(order != null) ? order.split(':') : ['updatedAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            include: [{
                model: models.User,
                attributes: ['username','picture']
            }]
        })
        .then(posts => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({
                    'error': 'no post found'
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({
                "error": "invalid fields"
            });
        });
};

exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SrYyE!&J5BzF~oh^Z$i=');
    const userId = decodedToken.userId;
    let postId=req.params.id;
    console.log(postId);
    models.User.findOne({
        where: {
            id: userId
        }
    })
    .then(user=>{
        if(user.isAdmin == true){
            const filename = post.attachment.split('/images/posts/')[1];
            fs.unlink(`images/posts/${filename}`, () => {
                models.Post.destroy({
                        where:{id: postId}
                    })
                    .then(() => res.status(200).json({
                        message: 'Post deleted'
                    }))
                    .catch(error => res.status(404).json({
                        'error': 'post not found'
                    }));
            });
        }else{
            models.Post.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(post=>{
                console.log(post.id);
                if(post.UserId==userId){
                    const filename = post.attachment.split('/images/posts/')[1];
        fs.unlink(`images/posts/${filename}`, () => {
            models.Post.destroy({
                    where:{id: post.id}
                })
                .then(() => res.status(200).json({
                    message: 'Post deleted'
                }))
                .catch(error => res.status(404).json({
                    'error': 'post not found'
                }));
        });
                }else{
                    res.status(400).json({
                        'error': 'You are not allowed to delete this post'
                    })
                }
            })
        }
    })
    .catch(error => res.status(500).json({'error':'cannot delete post'
    }));
};