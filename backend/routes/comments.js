const express = require('express')
const router = express.Router()
const CommentCtrl = require('../controllers/comment')

router.post('/comment', CommentCtrl.createComment)
router.put('/comment/:id', CommentCtrl.updateComment)
router.delete('/comment/:id', CommentCtrl.deleteComment)
router.get('/comment/:id', CommentCtrl.getCommentById)
router.get('/comments/:movieId', CommentCtrl.getComments)

module.exports = router
