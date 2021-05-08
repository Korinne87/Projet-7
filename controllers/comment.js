const jwt = require('jsonwebtoken');
const models = require('../models');
var asyncModule = require('async');

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SrYyE!&J5BzF~oh^Z$i=');
    const userId = decodedToken.userId;
    var postId = parseInt(req.body.postId);
    var content = req.body.content;
    if (content == null) {
        return res.status(400).json({
            'error': 'missing parameters'
        });
    }
    asyncModule.waterfall([
        function (done) {
            models.Post.findOne({
                    where: {
                        id: postId
                    }
                })
                .then(function (postFound) {
                    done(null, postFound);
                })
                .catch(function (err) {
                    return res.status(500).json({
                        'error': 'unable to verify post'
                    });
                });
        },
        function (postFound, done) {
            if (postFound) {
                models.Comment.create({
                        content: content,
                        UserId: userId,
                        PostId: postFound.Id
                    })
                    .then(newComment => {
                        done(newComment);
                    });
            } else {
                res.status(404).json({
                    'error': 'post not found'
                });
            }
        }
    ], function (newComment) {
        if (newComment) {
            return res.status(201).json(newComment);
        } else {
            return res.status(500).json({
                'error': 'cannot post your comment'
            });
        }
    });
}

exports.deleteComment = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SrYyE!&J5BzF~oh^Z$i=');
        const userId = decodedToken.userId;
        const isAdmin = models.User.findOne({
            where: {
                id: userId
            }
        });
        const comment = models.Comment.findone({
            where: {
                id: req.params.id
            }
        });
        if (userId === comment.UserId || isAdmin.admin === true) {
            comment.destroy({
                    id: comment.id
                })
                .then(() => res.status(200).json({
                    message: 'comment deleted'
                }))
                .catch(error => res.status(404).json({
                    'error': 'comment not found'
                }));
        } else {
            res.status(400).json({
                'error': 'You are not allowed to delete this comment'
            })
        }
    } catch (error) {
        res.status(500).json({
            'error': 'cannot delete comment'
        })
    };
}