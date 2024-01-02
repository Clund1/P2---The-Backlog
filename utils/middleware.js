// ----% IMPORT DEPENDENCIES %---- //
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv')
const methodOverride = require('method-override')

// ----% MIDDLEWARE FUNCTION %---- //
const middleware = (app) => {
    //methodOverride
    app.use(methodOverride('_method'))
    //Arthur Morgan
    app.use(morgan('tiny'))
    //Static Stylesheets
    app.use(express.static('public'))
    //json
    app.use(express.json())
    //Session Function
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false
        })
    )
}

// ----% EXPORT MIDDLEWARE FUNCTION %---- //
module.exports = middleware