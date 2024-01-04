//! ----% SERVER START %---- !//


//! ----% DEPENDENCIES %---- !//
const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')

//! ----% ROUTERS %---- !//
const UserRouter = require('./controllers/userControllers')


//! ----% CREATE APP OBJECT %---- !//
const app = express()

//view engine - ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



//! ----% MIDDLEWARE %---- !// 
middleware(app)

//! ----% ROUTES %---- !//
app.get('/', (req,res) => {
    const { username, loggedIn, userId } = req.session
    res.render('home.ejs', { username, loggedIn,  userId })
})
app.use('/users', UserRouter)

//! ----% SERVER LISTENER %---- !//
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('THE SERVER HAS BEGUN')
})



//! ----% SERVER END %---- !//