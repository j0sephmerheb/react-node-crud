import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../api';

import 'react-table/react-table.css'

/* Update Movie */
class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/movies/update/${this.props.id}`
    }

    render() {
        return <button className="btn btn-primary btn-block" onClick={this.updateUser}>Update</button>
    }
}

/* Delete Movie */
class DeleteMovie extends Component {
    deleteMovie = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }


    render() {
        return <button className="btn btn-danger btn-block" onClick={this.deleteMovie}>Delete</button>
    }
}

/* Movies List */
class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMovies().then(movies => {
            this.setState({
                movies: movies.data,
                isLoading: false,
            })
        })       
    }

    render() {
        const { movies, isLoading } = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: 'id',
                filterable: true,
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Date Added',
                accessor: 'date_added',
                filterable: true,
            },
           {
                Header: 'Release Date',
                accessor: 'release_date',
                filterable: true,
            },
            {
                Header: 'category',
                accessor: 'category',
                filterable: true,
            },
            {
                Header: 'Director',
                accessor: 'movie_director',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <DeleteMovie id={props.original.id} />
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <UpdateMovie id={props.original.id} />
                    )
                },
            },
        ]


        let showTable = true
        if (!movies.length) {
            showTable = false
        }

        return (
            <>
                <div className="py-4">
                    <div className="container">
                        {showTable && (
                            <ReactTable
                                data={movies}
                                columns={columns}
                                loading={isLoading}
                                defaultPageSize={10}
                                showPageSizeOptions={false}
                                minRows={0}
                            />
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default MoviesList
