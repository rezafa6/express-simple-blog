const express = require('express');
const router = express.Router();
const CommentController = require('@controllers/comments-controller');

router.get('/' , CommentController.index);
router.get('/handle/:commentID/:commentStatus' , CommentController.handleCommentStatus);

module.exports = router;
