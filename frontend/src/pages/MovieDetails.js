import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import api from '../api'

/* Render Comments */
function RenderComments({ ratings, onRemove, isAuthenticated, username }) {
    // TEMP
    const admin = "josephmerheb@gmail.com";
    //

    if (ratings && ratings.length > 0) {
        return (
            <>
                <div className="listing ratings">
                    {ratings.map((item) => {
                        return (
                            <div className="holder mb-2" key={item._id} id={item._id}>
                                <div className="user">{item.userId}</div>
                                <div className="value">{item.rating}/10</div>
                                <div className="title">{item.commentTitle}</div>
                                <div className="comment">{item.commentContent}</div>
                                
                                {isAuthenticated && (item.userId === username || username === admin ) && (
                                    <button className="btn btn-danger mt-3" onClick={() => onRemove(item._id)}>Delete</button>
                                )} 
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
    else {
        return (
            <div>No Comments</div>
        );
    }
}

/* Movie Details */
class MovieDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ratings: [],
            movie: '',
            comment: {
                rating: '1',
                commentTitle: '',
                commentContent: '',
                userId: '',
                movieId: window.location.pathname.split('/').pop()
            }
        }
       
        this.updateMovieState = this.updateMovieState.bind(this);
        this.updateRatingsState = this.updateRatingsState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    /* Set Movie details */
    updateMovieState(data) {
        this.setState({ movie: data })
    }

    /* Set Movie ratings */
    updateRatingsState(data) {
        this.setState({ ratings: data })
        this.handleNewAvg()
    }

    /* Handle Movie Details */
    handleMovieDetails = async (movieId) => {
        await api.getMovieById(movieId).then(res => {
            const data = res.data
            this.updateMovieState(data)
        })
    }

    /* Handle Ratings */
    handleRatings = async (movieId) => {
        await api.getAllRatings(movieId).then(res => {
            const data = res.data.data
            this.updateRatingsState(data)
        })
    }

    /* handle input change */
    handleChange(e) {
        const { comment } = { ...this.state };
        const currentState = comment;
        const { name, value } = e.target;
        currentState[name] = value;
        this.setState({ comment: currentState });
    }

    /* handle submit */
    handleSubmit(e) {
        const data = this.state.comment;
        this.createComment(data);
        e.preventDefault();
    }

    /* Create Comment */
    createComment = async (data) => {
        await api.insertRating(data)
            .then(() => {
                this.handleRatings(this.state.comment.movieId)
            })
            .then(() => {
                this.resetForm()
                alert('Comment Created')
            })
    }

    /* Reset Form */
    resetForm = () => { 
        document.getElementById("commentform").reset();
    }

    /* Delete Comment */
    handleDelete = async (ratingId) => {
        console.log("This: " + ratingId);

        await api.deleteRatingById(ratingId)
            .then(() => {
                alert('Comment deleted')
            })
            .then(() => {
                this.handleRatings(this.state.comment.movieId)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /* handle new avg ratings */
    handleNewAvg = async (id) => {
        const ratings = this.state.ratings;
        const cnt = ratings.length;
        const movieId = this.state.comment.movieId;

        let sum = 0;
        let avg = 0;

        if (cnt > 0) {
            for (let i = 0; i < cnt; i++) {
                sum += ratings[i].rating;
            }
            avg = sum / cnt;
            avg = Math.round((avg + Number.EPSILON) * 100) / 100
        }

        const payload = { "rating_avg": avg };

        api.updateMovieById(movieId, payload)
            .then(() => {
                let movie = { ...this.state.movie }
                movie.rating_avg = avg;
                this.setState({ movie })
            })
    }

    /* handleUser */
    handleUser = async() => {
        if(this.props.isAuthenticated){            
            let comment = {...this.state.comment}
            comment.userId = this.props.user.name;
            this.setState({comment})     
            console.log("Logged Username: " + this.props.user.name)       
        }
    }


    /* Component Did Mount */
    componentDidMount = async (props) => {
        const movieId = this.state.comment.movieId;
        this.handleRatings(movieId)
        this.handleMovieDetails(movieId)
        this.handleUser()
        console.log("Movie Id: " + movieId)
    }


    render() {
        const isAuthenticated = this.props.isAuthenticated;
        const username = this.props.user.name;

        return (
            <div className="py-4">
                <div className="container">

                    {/* Movie Details from the postgres db */}
                    <article className="mb-5">
                        <Row>
                            <Col md="3">
                                <div className="photo">
                                    <a href="https://youtube.com" rel="noopener noreferrer" target="_blank" className="play-btn" title="Watch Trailer">Play</a>
                                    <img src={this.state.movie.poster} alt={this.state.movie.title} title={this.state.movie.title} />
                                </div>
                            </Col>
                            <Col md="9">
                                <h1>{this.state.movie.title}</h1>
                                <div className="date">Date Added: {this.state.movie.date_added}</div>
                                <div className="date">Release Date: {this.state.movie.release_date}</div>
                                <div className="category">Category: {this.state.movie.category}</div>
                                <div className="director">Director: {this.state.movie.movie_director}</div>
                                <div className="rating">Rating: {this.state.movie.rating_avg}/10</div>
                            </Col>
                        </Row>
                    </article>


                    {/* Movie Ratings / Comments - From the MongoDb */}
                    {isAuthenticated && (
                        <h5>Add your comment and rating</h5>
                    )}
                    {!isAuthenticated && (
                        <h5>Please login to add a rating</h5>
                    )}

                    <div className="listing ratings">
                        {isAuthenticated && (
                            <form onSubmit={this.handleSubmit} id="commentform">
                                <div className="mb-4">
                                    <input className="form-control mb-2" onChange={this.handleChange} name="commentTitle" required />
                                    <textarea className="form-control mb-2" rows="3" onChange={this.handleChange} name="commentContent" required></textarea>

                                    <Row>
                                        <Col md="1">
                                            <select className="form-control mb-2" onChange={this.handleChange} name="rating" required>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                                <option value='5'>5</option>
                                                <option value='6'>6</option>
                                                <option value='7'>7</option>
                                                <option value='8'>8</option>
                                                <option value='9'>9</option>
                                                <option value='10'>10</option>
                                            </select>
                                        </Col>
                                        <Col>
                                            <button className="btn btn-primary px-4 float-right" type="submit">Submit</button>
                                        </Col>
                                    </Row>
                                </div>
                            </form>
                        )}
                            
                        <RenderComments ratings={this.state.ratings} onRemove={this.handleDelete} isAuthenticated={isAuthenticated} username={username} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetails;