const Movie = require('../models/movie')
const mongoose = require('mongoose')


/* Get all Movies */
getMovies = async (req, res) => {
    await Movie.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Movies."
            });
        });
}

/* Get Movie by id */
getMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}


/* Create Movie */
createMovie = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must fill the info',
        })
    }

    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        date_added: req.body.date_added,
        release_date: req.body.release_date,
        category: req.body.category,
        movie_director: req.body.movie_director,
        poster: req.body.poster,
    })

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
}


/* Update Movie */
updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        movie.id = new mongoose.Types.ObjectId(),
        movie.title = body.title,
        movie.date_added = body.date_added,
        movie.release_date = body.release_date,
        movie.category = body.category,
        movie.movie_director = body.movie_director,
        movie.poster = body.poster,
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
            })
    })
}


/* Delete Movie */
deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}


module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById
}