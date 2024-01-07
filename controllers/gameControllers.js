//! ----% IMPORT DEPENDENCIES %---- !//
const express = require('express')
const axios = require('axios')
const apiKey = process.env.API_KEY
const allGamesUrl = process.env.API_GAMES_URL
const gameDetailsUrl = process.env.API_GAMEDETAILS_URL
const Game = require('../models/game')


//! ----% CREATE ROUTER %---- !//
const router = express.Router()


//! ----% ROUTES & CONTROLLERS %---- !//
//GET -> /games
router.get('/games', (req, res) => {
    const { username, loggedIn, userId } = req.session
    //Axios API Call & Render Index || Render Error
    axios(allGamesUrl, {
        params: {
            key:apiKey
        }
    })
    //If Data Return Index Page
        .then(apiRes => {
            res.render('games/index', { games: apiRes.data, username, userId, loggedIn })
        })
        //Or Redirect Error Page
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})

//POST -> /games/add
router.post('/add', (req, res) => {
    const { username, loggedIn, userId } = req.session
    const theGame = req.body
    theGame.owner = userId
    theGame.owned = !!theGame.owned
    theGame.played = !!theGame.played
    theGame.completed = !!theGame.completed
    Game.create(theGame)
        .then(newGame => {
            res.redirect(`/games/backlog`)
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})

//GET -> /games/backlog
router.get('/backlog', (req, res) =>{
    const { username, loggedIn, userId } = req.session
    //query DB for Backlog of logged in user
    Game.find({ owner: userId })
    //Display Backlog
    .then(userGames => {
        res.render('games/backlog', { games: userGames })
    })
    //Or Redirect Error Landing
    .catch(err => {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    })
})

//GET -> /backlog/:id
router.get('/backlog/:id', (req, res) =>{
    //find games using ID
    Game.findById(req.params.id)
    //Display Show Page
.then(theGame => {
    res.render('games/backlogDetail', { place: theGame, username, loggedIn, userId })
})
    //Or Redirect to Error Landing
    .catch(err => {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    })
})

// UPDATE -> /games/update/:id
router.put('/update/:id', (req, res) => {
    const { username, loggedIn, userId } = req.session
    const gameId = req.params.id
    const theUpdatedGame = req.body
    delete theUpdatedGame.owner
    theUpdatedGame.owner = userId
    theUpdatedGame.owned = !!theUpdatedGame.owned
    theUpdatedGame.played = !!theUpdatedGame.played
    theUpdatedGame.completed = !!theUpdatedGame.completed
    // Find game
    Game.findById(gameId)
        //Authorization Check
        .then(foundGame => {
            if (foundGame.owner == userId) {
                // If Owner, update
                return foundGame.updateOne(theUpdatedGame)
            } else {
                // If Not Owner, redirect
                res.redirect(`/error?error=You%20Can't%20Delete%20That`)
            }
        })
        .then(returnedGame => {
            res.redirect(`/games/backlog/${gameId}`)
        })
        // if not, send error
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})


//DELETE -> /games/delete/:id
// Removes games form Logged In users backlog
router.delete('delete/:id', (req, res) =>{
    const { username, loggedIn, userId } = req.session
    //Target Game
    const gameId = req.params.id
    //Find Game in DB
Game.findById(gameId)
    //Delete it
    .then(game => {
        //Authorize Change
        if (game.owner == userId) {
            return game.deleteOne()
        }else {
            //If Not Authorized Redirect
            res.redirect(`/error?error=You%20Can't%20Delete%20That`)
        }
    })
    .then(deletedGame => {
        res.redirect('/games/backlog')
    })

    //Or Error Landing
    .catch(err => {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    })
})

//GET -> /games/:name
router.get('/:name', (req, res) => {
    const { username, loggedIn, userId } = req.session
    const gameName = req.params.name
    //API Call
    axios(`${nameSearchBaseUrl}${gameName}`)
    //Render Show Page
    .then(apiRes => {
        console.log('this is apiRes.data: \n', apiRes.data)
        const foundGame = apiRes.data[0]
        res.render('games/show', { game: foundGame, username, loggedIn, userId })
    })
    //Or Redirect Error Landing
    .catch(err => {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    })
})



//! ----% EXPORT ROUTER %---- !//
module.exports = router