import express from 'express';
import { getComments, getCommentById, createComment, deleteComment, updateComment } from '../controllers/comment.js';
//const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getComments);
router.get('/:id', getCommentById);
router.post('/', createComment);
router.delete('/:id', deleteComment);
router.patch('/:id', updateComment);


export default router;