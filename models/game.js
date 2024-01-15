//! ----% SCHEMA & DEPENDENCIES %---- !//
const mongoose = require('../utils/connection')
const { Schema, model } = mongoose

//! ----% SCHEMA DEFINITION %---- !//
const gameSchema = new Schema({
    name: { type: String, required: true },
    background_image: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    owned: { type: Boolean, required: true },
    played: { type: Boolean, required: true },
    completed: { type: Boolean, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//! ----% CREATE USER MODEL %---- !//
const Game = model('Game', gameSchema)

//! ----% EXPORT USER MODEL %---- !//
module.exports = Game