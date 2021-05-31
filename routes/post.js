import express from 'express';
import { getPosts, getPostById, createPost, deletePost, updatePost } from '../controllers/post.js';
//const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);


export default router;