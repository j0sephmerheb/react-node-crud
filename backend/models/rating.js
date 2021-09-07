const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MongoRating = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        commentTitle: { type: String, required: true },
        commentContent: {type: String, required: true },
        userId: {type: String ,required: true},
        movieId: {type: String ,required: true}
    }
)

module.exports = mongoose.model('ratings', MongoRating)
