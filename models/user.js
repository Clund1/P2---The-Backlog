//! ----% SCHEMA & DEPENDENCIES %---- !//
const mongoose = require('../utils/connection')
const { Schema, model } = mongoose

//! ----% SCHEMA DEFINITION %---- !//
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    }
})

//! ----% CREATE USER MODEL %---- !//
const User = model('User', userSchema)

//! ----% EXPORT USER MODEL %---- !//
module.exports = User