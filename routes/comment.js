const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/comment/create', auth, commentCtrl.createComment);
router.get('/comment',commentCtrl.getAllComments);
router.delete('/:id',commentCtrl.deleteComment);

module.exports = router;