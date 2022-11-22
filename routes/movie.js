const express = require('express');
const router = express.Router();

const {
    createMovie,
    allMovies,
    getMovie,
    deleteMovie,
    updateMovie,
    listMovieFavourites,
    rankMovies
} = require('../controllers/movie');


router.route('/favourites').get(listMovieFavourites);
router.route('/rankmovies').get(rankMovies);
router.route('/').get(allMovies).post(createMovie);
router.route('/:id').get(getMovie).delete(deleteMovie).patch(updateMovie);

module.exports = router;