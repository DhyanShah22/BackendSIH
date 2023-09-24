const express = require('express')
const mongoose = require('mongoose')
const final = require('./routes')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, res.method)
    next()
})
app.use('/api/model', final)
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })
    .catch((err)=> {
        console.log(err)
    })