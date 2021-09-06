const express = require('express')
const router = express.Router()
const RatingCtrl = require('../controllers/rating')

router.post('/rating', RatingCtrl.createRating)
router.put('/rating/:id', RatingCtrl.updateRating)
router.delete('/rating/:id', RatingCtrl.deleteRating)
router.get('/rating/:id', RatingCtrl.getRatingById)
router.get('/ratings/:movieId', RatingCtrl.getRatings)

module.exports = router
