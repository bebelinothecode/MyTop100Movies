const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    nameOfMovie:{
        type:String,
        required:[true,"must provide name of movie"],
        trim:true,
        maxlength:[20,'name can not be more than 20 characters'],
    },
    genre:{
        type:String,
        required:[true,"must provide genre of movie"],
        trim:true,
        maxlength:[20,'genre can not exceed 20 chracters'],
    },
    isMovieSelection:{
        type:Boolean,
        default:false,
    },
    movieScore:{
        type:Number,
        required:false,
        default:0,
    }
});

module.exports = mongoose.model('Movie',MovieSchema);