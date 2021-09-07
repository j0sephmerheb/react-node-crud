const Comment = require('../models/comment')
const mongoose = require('mongoose')

/* Create Comment */
createComment = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a comment',
        })
    }

    const commentObj = new Comment({
        _id: new mongoose.Types.ObjectId(),
        commentTitle: req.body.commentTitle,
        commentContent: req.body.commentContent,
        userId: req.body.userId,
        movieId: req.body.movieId
    })

    if (!commentObj) {
        return res.status(400).json({ success: false, error: err })
    }

    commentObj
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'Comment created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Comment not created!',
            })
        })
}

/* Update Comment */
updateComment = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Comment.findOne({ _id: req.params.id }, (err, commentObj) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Comment not found!',
            })
        }
        commentObj.id = new mongoose.Types.ObjectId(),
        commentObj.commentTitle = body.commentTitle
        commentObj.commentContent = body.commentContent
        commentObj.userId = body.userId
        commentObj.movieId = body.movieId
        commentObj
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Comment updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Comment not updated!',
                })
            })
    })
}

/* Delete Comment */
deleteComment = async (req, res) => {
    await Comment.findOneAndDelete({ _id: req.params.id }, (err, commentObj) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: commentObj })
    }).catch(err => console.log(err))
}

/* Get Comment by id */
getCommentById = async (req, res) => {
    await Comment.findOne({ _id: req.params.id }, (err, commentObj) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: commentObj })
    }).catch(err => console.log(err))
}

/* get all Comments for a movie */
getComments = async (req, res) => {
    await Comment.find({movieId: req.params.movieId}, (err, commentObj) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: commentObj })
    }).catch(err => console.log(err))
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getComments,
    getCommentById
}
