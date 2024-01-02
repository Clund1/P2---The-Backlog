//SERVER START//


// DEPENDENCIES //
const express = require('express')
require('dotenv'),config()
const path = require('path')

// ROUTERS //



// CREATE APP OBJECT //
const app = express()


// MIDDLEWARE // 



// ROUTES //
app.get('/', (req,res) => {
    res.send('YOU ARE CONNECTED')
})


// SERVER LISTENER //
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('THE SERVER HAS BEGUN')
})



//SERVER END//