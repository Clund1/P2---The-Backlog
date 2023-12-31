//! ----% SERVER START %---- !//


//! ----% DEPENDENCIES %---- !//
const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')


//! ----% ROUTERS %---- !//
const UserRouter = require('./controllers/userControllers')
const GameRouter = require('./controllers/gameControllers')


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
app.use('/games', GameRouter)

//Error Landing
app.get('/error', (req, res) =>{
    const error = req.query.error || 'THIS PAGE DOES NOT EXIST'
    const { username, loggedIn, userId } = req.session
    res.render('error.ejs', { error, userId, username, loggedIn })
})


//! ----% SERVER LISTENER %---- !//
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('THE SERVER HAS BEGUN')
})



//! ----% SERVER END %---- !//