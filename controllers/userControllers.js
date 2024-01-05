//! ----% IMPORT DEPENDENCIES %---- !//
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//! ----% CREATE ROUTER %---- !//
const router = express.Router()

//! ----% ROUTES & CONTROLLERS %---- !//

//GET -> SIGNUP - /users/signup
router.get('/signup',(req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('users/signup', { username,loggedIn,userId })
})
//POST -> SIGNUP -/users/signup
router.post('/signup', async (req, res) => {
    const newUser = req.body
    //Password Encryption - bcrypt
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10))
    //User Creation
    User.create(newUser)
        .then(user => {
            res.redirect('/users/login')
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})


//GET -> LOGIN - /users/login
router.get('/login',(req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('users/login', { username,loggedIn,userId })
})
//POST -> LOGIN
router.post('/login', async (req, res) =>{
    // const { username, loggedIn, userId } =req.session
    //Pull User Credentials
    const { username, password } = req.body
    //Search DB for User
    User.findOne({ username })
    //Authorization
    .then(async (user) => {
        if (user) {
            const result = await bcrypt.compare(password, user.password)
            if (result) {
                req.session.username = username
                req.session.loggedIn = true
                req.session.userId = user.id
                //Redirect to Homepage Landing if loggedIn
                res.redirect('/')
            //Redirect to Error if Login Incorrect
            } else {
                res.redirect(`/error?error=Wrong%20Credentials10401`)
            }
        } else {
            res.redirect(`/error?error=Wrong%20Credentials10402`)
        }
    })
    .catch(err => {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    })
})


//GET -> LOGOUT
router.get('/logout',(req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('users/logout', { username,loggedIn,userId })
})
//DELETE -> LOGOUT
router.delete('/logout', (req,res)=> {
    req.session.destroy(() =>{
        res.redirect('/')
    })
})

//! ----% EXPORT ROUTER %---- !//
module.exports = router