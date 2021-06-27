import express from 'express';
import  { getUsers, getUserById, createUser,login, deleteUser, updateUser } from '../controllers/user.js';
// const auth = require('../middleware/auth')
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', login);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;