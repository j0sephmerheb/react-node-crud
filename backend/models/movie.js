const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: { type: String, required: true },
        date_added: { type: String, required: true },
        release_date: {type: String, required: true },
        category: {type: String, required: true},
        movie_director: {type: String, required: true},
        poster: {type: String, required: false},
        rating_avg: {type: Number, required: false}
    }
)

module.exports = mongoose.model('movie', Movie)
