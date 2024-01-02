// ----% SERVER START %---- //


// ----% DEPENDENCIES %---- //
const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')

// ----% ROUTERS %---- //



// ----% CREATE APP OBJECT %---- //
const app = express()

//view engine - ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



// ----% MIDDLEWARE %---- // 
middleware(app)

// ----% ROUTES %---- //
app.get('/', (req,res) => {
    res.render('home.ejs')
})


// ----% SERVER LISTENER %---- //
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('THE SERVER HAS BEGUN')
})



// ----% SERVER END %---- //