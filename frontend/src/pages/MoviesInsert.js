import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import api from '../api'

class MoviesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            date_added: '',
            release_date: '',
            category: '',
            movie_director: '',
            poster: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleIncludeMovie = async () => {
        const { title, date_added, release_date, category, movie_director, poster } = this.state
        const payload = { title, date_added, release_date, category, movie_director, poster }

        await api.insertMovie(payload).then(res => {
            window.alert(`Movie created successfully`)
            this.setState({
                title: '',
                date_added: '',
                release_date: '',
                category: '',
                movie_director: '',
                poster: ''
            })
        })
    }

    render() {
        return (
            <div className="py-4">
                <div className="container">
                    <Row className="justify-content-md-center">
                        <Col md='6'>
                            <h3 className="mb-4">Create Movie</h3>

                            <Row className="form-group align-items-center">
                                <Col md="3"><label>Title:</label></Col>
                                <Col md="9"><input className="form-control" type="text" name='title' value={this.state.title}
                                    onChange={this.handleInputChange} /></Col>
                            </Row>

                            <Row className="form-group align-items-center">
                                <Col md="3"><label>Date Added:</label></Col>
                                <Col md="9"><input className="form-control" type="date" name='date_added' value={this.state.date_added}
                                    onChange={this.handleInputChange} /></Col>
                            </Row>

                            <Row className="form-group align-items-center">
                                <Col md="3"><label>Release Date:</label></Col>
                                <Col md="9"><input className="form-control" type="date" name='release_date' value={this.state.release_date}
                                    onChange={this.handleInputChange} /></Col>
                            </Row>

                            <Row className="form-group align-items-center">
                                <Col md="3"><label>Category:</label></Col>
                                <Col md="9"><input className="form-control" type="text" name='category' value={this.state.category}
                                    onChange={this.handleInputChange} /></Col>
                            </Row>

                            <Row className="form-group align-items-center">
                                <Col md="3"><label>Director:</label></Col>
                                <Col md="9"><input className="form-control" type="text" name='movie_director' value={this.state.movie_director}
                                    onChange={this.handleInputChange} /></Col>
                            </Row>

                            <Row className="form-group align-items-center">
                                <Col md="3"><label>Poster:</label></Col>
                                <Col md="9"><input className="form-control" type="text" name='poster' value={this.state.poster}
                                    onChange={this.handleInputChange} /></Col>
                            </Row>

                            <Row className="justify-content-end">
                                <Col md="3">
                                    <button className="btn btn-primary btn-block" onClick={this.handleIncludeMovie}>Add Movie</button>
                                </Col>
                                <Col md="3">
                                    <a className="btn btn-danger btn-block" href={'/movies/list'}>Cancel</a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default MoviesInsert
