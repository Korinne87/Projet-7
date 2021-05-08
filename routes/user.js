const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/profile',auth, userCtrl.getUser);
router.get('/user/:id',userCtrl.getOneUser);
router.put('/user/modify',userCtrl.modifyUser);
router.delete('/user/delete', auth, userCtrl.deleteUser);

module.exports=router;