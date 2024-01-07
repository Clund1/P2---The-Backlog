//! ----% IMPORT DEPENDENCIES %---- !//
const express = require('express')
const axios = require('axios')
const apiKey = process.env.API_KEY
const allGamesUrl = process.env.API_GAMES_URL
const gameDetailsUrl = process.env.API_GAMEDETAILS_URL


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
    //Or Redirect Error Page
    .catch(err => {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    })
})

//! ----% EXPORT ROUTER %---- !//
module.exports = router