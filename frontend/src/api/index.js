import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)
export const getAllMovies = () => api.get(`/movies`)

export const insertComment = payload => api.post(`/comment`, payload)
export const deleteCommentById = id => api.delete(`/comment/${id}`)
export const getAllComments = id => api.get(`/comments/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    insertComment,
    deleteCommentById,
    getAllComments
}

export default apis
