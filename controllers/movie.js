const Movie = require('../models/movie');
const {createCustomError} = require('../error/custom-error');
const { where } = require('../models/movie');


const createMovie = async (req,res) => {
    const movie = await Movie.create(req.body);
    res.status(201).json({movie});
}


const allMovies = async (req,res) => {
    const movie = await Movie.find({});
    res.status(200).json({movie});
}

const getMovie = async (req,res,next) => {
    const {id:movieId} = req.params;
    const movie = await Movie.findOne({_id:movieId});

    if(!movie) {
        return next(createCustomError(`No movie with id: ${movieId}`,404))
    }
    res.status(200).json({movie});
}

const deleteMovie = async (req, res, next) => {
    const {id:movieId} = req.params;
    const movie = await Movie.findByIdAndDelete({_id:movieId});
    if(!movie) {
        return next(createCustomError(`Delete unsuccessful,no task with id:${movieId}`,404));
    }
    res.status(200).json({msg:"Delete successful"});
}

const updateMovie = async(req, res, next) => {
    const {id:movieId} = req.params;

    const movie = await Movie.findByIdAndUpdate({_id:movieId},req.body,{
        new:true,
        runValidators:true,
    })

    if(!movie) {
        return next (createCustomError('Movie not found'));
    }

    res.status(200).json({movie});
}

const listMovieFavourites = async (req , res, next) => {
    const movie = await Movie.find({'isMovieSelection':true});

    if(!movie) {
        return next(createCustomError('Movie not found'));
    }
    res.status(200).json({movie});
}

// db.inventory.find( { quantity: { $gt: 20 } } )

const rankMovies = async (req, res, next) => {
    const movie = await Movie.find({movieScore:{$gt:0}}).sort('-movieScore');
    res.status(200).json({movie});  
    if(!movie) {
        return next(createCustomError('Movies not found'));
    }
}

module.exports = {
    createMovie,
    allMovies,
    getMovie,
    deleteMovie,
    updateMovie,
    listMovieFavourites,
    rankMovies,
}
