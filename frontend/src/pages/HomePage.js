import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import api from '../api';

/* Movies Listing */
class RenderMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            isLoading: false
        }
    }

    componentDidMount = async () => {
        const sortedBy = this.props.sorted;

        this.setState({
            isLoading: true
        })

        await api.getAllMovies().then(movies => {
            if(sortedBy === 'date'){
                function date_sorting(a, b) {
                    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
                }
                movies.data.sort(date_sorting);    
            }
            else{
                /* Sort by rating_avg */
                function rating_sorting(a, b) {
                    return b.rating_avg - a.rating_avg;
                }
                movies.data.sort(rating_sorting);
            }

            this.setState({
                movies: movies.data
            })
        })
    }

    render() {
        const movies = this.state.movies;

        return (
            <div className="listing movies">
                <Row>
                    {movies.map(function (movie) {
                        return (
                            <Col md="3" className="mb-4" key={movie.id}>
                                <Link to={`/movie/${movie.id}`} className="holder">
                                    <div className="photo">
                                        <img src={movie.poster} title={movie.title} alt={movie.title} />
                                        <div className="ratings">{movie.rating_avg} / 10</div>
                                    </div>
                                    <div className="details">
                                        <div className="title">{movie.title}</div>
                                        <div className="date">{movie.release_date}</div>
                                    </div>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
}


/* Class: Home page */
function HomePage() {
    return (
        <>
            <div className="pt-4">
                <div className="container">
                    <div className="mb-4">
                        {/* Release Date DESC */}
                        <h3 className="mb-4">Latest</h3>
                        <RenderMovies sorted="date" />
                    </div>

                    {/* Rating DESC */}
                    <div className="mb-4">
                        <h3 className="mb-4">Most popular</h3>
                        <RenderMovies sorted="rating" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;