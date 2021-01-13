const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const API_VERSION = '/v1'

//connects to mongoDb
require('./db/db')


const app = express()

//routes
const postaRoute = require('./routes/posta')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(API_VERSION, postaRoute)
//call base end point
app.get('/', (req, res) => {
    res.status(200).send({
        'health-check': 'Ok',
        'message': 'base endpoint for posta table is up and running'
    })
})

module.exports = app