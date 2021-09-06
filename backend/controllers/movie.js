const db = require('../db/postgres')
const Movie = db.movies;

/* Get all Movies */
getMovies = async (req, res) => {
    await Movie.findAll()
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
getMovieById = (req, res) => {
    const id = req.params.id;

    Movie.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Movie with id=" + id
            });
        });
}


/* Create Movie */
createMovie = (req, res) => {
    const movie = {
        id: Date.now(),
        title: req.body.title,
        date_added: req.body.date_added,
        release_date: req.body.release_date,
        category: req.body.category,
        movie_director: req.body.movie_director,
        poster: req.body.poster,
    };

    Movie.create(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Movie."
            });
        });
}


/* Update Movie */
updateMovie = (req, res) => {
    const id = req.params.id;

    Movie.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Movie was updated successfully."
                });
            } else {
                res.send({
                    message: "Error updating Movie with id=" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Movie with id=" + id
            });
        });
}


/* Delete Movie */
deleteMovie = (req, res) => {
    const id = req.params.id;

    Movie.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Movie was deleted successfully!"
                });
            } else {
                res.send({
                    message: "Could not delete Movie with id=" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Movie with id=" + id
            });
        });
}


module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById
}