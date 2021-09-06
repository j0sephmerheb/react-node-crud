import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)
export const getAllMovies = () => api.get(`/movies`)

export const insertRating = payload => api.post(`/rating`, payload)
export const deleteRatingById = id => api.delete(`/rating/${id}`)
export const getAllRatings = id => api.get(`/ratings/${id}`)


const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    insertRating,
    deleteRatingById,
    getAllRatings
}

export default apis
