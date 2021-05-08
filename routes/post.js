const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/post');


router.post('/post/create', postCtrl.createPost);
router.get('/post', postctrl.getAllPosts);
route.delete('/post/delete/:id' , postCtrl.deletePost)

module.exports = router