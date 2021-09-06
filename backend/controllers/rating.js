const Rating = require('../models/rating')
const mongoose = require('mongoose')

/* Create rating */
createRating = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a rating',
        })
    }

    const ratingObj = new Rating({
        _id: new mongoose.Types.ObjectId(),
        rating: req.body.rating,
        commentTitle: req.body.commentTitle,
        commentContent: req.body.commentContent,
        userId: req.body.userId,
        movieId: req.body.movieId
    })

    if (!ratingObj) {
        return res.status(400).json({ success: false, error: err })
    }

    ratingObj
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'Rating created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Rating not created!',
            })
        })
}

/* update rating */
updateRating = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Rating.findOne({ _id: req.params.id }, (err, ratingObj) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Rating not found!',
            })
        }
        ratingObj.id = new mongoose.Types.ObjectId(),
        ratingObj.rating = body.rating
        ratingObj.commentTitle = body.commentTitle
        ratingObj.commentContent = body.commentContent
        ratingObj.userId = body.userId
        ratingObj.movieId = body.movieId
        ratingObj
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Rating updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Rating not updated!',
                })
            })
    })
}

/* delete rating */
deleteRating = async (req, res) => {
    await Rating.findOneAndDelete({ _id: req.params.id }, (err, ratingObj) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: ratingObj })
    }).catch(err => console.log(err))
}

/* get rating by id */
getRatingById = async (req, res) => {
    await Rating.findOne({ _id: req.params.id }, (err, ratingObj) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: ratingObj })
    }).catch(err => console.log(err))
}

/* get all ratings for a movie */
getRatings = async (req, res) => {
    await Rating.find({movieId: req.params.movieId}, (err, ratings) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: ratings })
    }).catch(err => console.log(err))
}

module.exports = {
    createRating,
    updateRating,
    deleteRating,
    getRatings,
    getRatingById
}
