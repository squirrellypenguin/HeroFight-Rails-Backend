
require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')

// MIDDLEWARE  -> REQ => MIDDLEWARE => RES => RES.JSON
app.use(logger('dev')); // MORGAN..is just a logger
// THESE DEAL WITH RECEIVING DATA...req.body
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

// DEFAULT ROUTE
app.get('/', (req, res) => {
    res.json({
        status:200,
        msg: 'you have hit the default route...nothing to see here'
    })
})

// FRUITS CONTROLLER
const heroController = require('./controllers/hero.js')
app.use('/hero', heroController)

// // FARM CONTROLLER
// const farmsController = require('./controllers/farms.js')
// app.use('/farms', farmsController)

// OUR APP IS NOW LISTENING ON THE PORT
app.listen(PORT, () => {
    console.log(`listening in on port: ${PORT}`)
})