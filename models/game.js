//! ----% SCHEMA & DEPENDENCIES %---- !//
const mongoose = require('../utils/connection')
const { Schema, model } = mongoose

//! ----% SCHEMA DEFINITION %---- !//
const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    background_image: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
});

//! ----% CREATE USER MODEL %---- !//
const Game = model('Game', gameSchema)

//! ----% EXPORT USER MODEL %---- !//
module.exports = Game