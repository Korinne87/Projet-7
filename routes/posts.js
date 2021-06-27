import express from 'express';
import  { getAllPosts } from '../controllers/posts.js';
// const auth = require('../middleware/auth')
const router = express.Router();

router.get('/', getAllPosts);

export default router;