import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import api from '../api'

/* Render Comments */
function RenderComments({ ratings, onRemove, isAuthenticated, username }) {
    const admin = process.env.REACT_APP_ADMIN_ACCOUNT;

    if (ratings && ratings.length > 0) {
        return (
            <>
                <div className="listing ratings">
                    {ratings.map((item) => {
                        return (
                            <div className="holder mb-2" key={item._id} id={item._id}>
                                <div className="user">{item.userId}</div>
                                <div className="title">{item.commentTitle}</div>
                                <div className="comment">{item.commentContent}</div>

                                {isAuthenticated && (item.userId === username || username === admin) && (
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
            movie: '',
            comment: {
                commentTitle: '',
                commentContent: '',
                userId: '',
                movieId: window.location.pathname.split('/').pop()
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateMovieState = this.updateMovieState.bind(this);
        this.updateRatingsState = this.updateRatingsState.bind(this);
    }

    /* Cmment inut change */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const { comment } = { ...this.state };
        const currentState = comment;
        currentState[name] = value;
        this.setState({ comment: currentState });
    }

    /* Set Movie details */
    updateMovieState(data) {
        this.setState({ movie: data })
    }

    /* Set Movie ratings */
    updateRatingsState(data) {
        this.setState({ ratings: data })
    }

    /* Handle Movie Details */
    handleMovieDetails = async (movieId) => {
        await api.getMovieById(movieId).then(res => {
            const data = res.data.data;
            this.updateMovieState(data);
        })
    }

    /* Handle Ratings */
    handleRatings = async (movieId) => {
        await api.getAllRatings(movieId).then(res => {
            const data = res.data.data
            this.updateRatingsState(data)
        })
    }

    /* handle submit */
    addRating = async () => {
        const data = this.state.comment;

        if (data.commentContent && data.commentTitle) {
            await api.insertRating(data).then(res => {
                window.alert(`Rating added successfully`)
                this.handleRatings(this.state.comment.movieId)
                this.setState({
                    comment: {
                        commentTitle: '',
                        commentContent: ''
                    }
                })
            })
        } else {
            alert('Please fill all the missing fields')
        }
    }


    /* Delete Comment */
    handleDelete = async (ratingId) => {
        const confirmBox = window.confirm(
            "Are you sure you want to delete?"
        )
        if (confirmBox === true) {


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
    }

    /* handleUser */
    handleUser = async () => {
        let comment = { ...this.state.comment }
        comment.userId = this.props.user.name;
        this.setState({ comment })
    }

    /* Reset Form */
    resetForm = () => {
        document.getElementById("commentform").reset();
    }

    /* Component Did Mount */
    componentDidMount = async (props) => {
        const movieId = window.location.pathname.split('/')[2];
        this.handleRatings(movieId)
        this.handleMovieDetails(movieId);
        this.handleUser()
    }


    render() {
        const isAuthenticated = this.props.isAuthenticated;
        let username = '';
        if (isAuthenticated) {
            username = this.props.user.name;
        }

        return (
            <div className="py-4">
                <div className="container">
                    <article className="mb-5">
                        <Row>
                            <Col md="3">
                                <div className="photo">
                                    <img src={this.state.movie.poster} alt={this.state.movie.title} title={this.state.movie.title} />
                                </div>
                            </Col>
                            <Col md="8">
                                <h1>{this.state.movie.title}</h1>
                                <div className="date">Date Added: {this.state.movie.date_added}</div>
                                <div className="date">Release Date: {this.state.movie.release_date}</div>
                                <div className="category">Category: {this.state.movie.category}</div>
                                <div className="director">Director: {this.state.movie.movie_director}</div>
                            </Col>
                        </Row>
                    </article>


                    {/* Movie Ratings / Comments - From the MongoDb */}
                    {isAuthenticated && (
                        <h5>Add your comment</h5>
                    )}
                    {!isAuthenticated && (
                        <h5>Please login to add a comment</h5>
                    )}

                    <div className="listing ratings">
                        {isAuthenticated && (
                            <div className="mb-4">
                                <input className="form-control mb-2" onChange={this.handleInputChange} name="commentTitle" required value={this.state.comment.commentTitle} />
                                <textarea className="form-control mb-2" rows="3" onChange={this.handleInputChange} name="commentContent" required value={this.state.comment.commentContent}></textarea>
                                <button className="btn btn-primary px-4" onClick={this.addRating}>Submit</button>
                            </div>
                        )}

                        <RenderComments ratings={this.state.ratings} onRemove={this.handleDelete} isAuthenticated={isAuthenticated} username={username} />
                    </div>

                </div>
            </div>
        )
    }
}

export default MovieDetails;