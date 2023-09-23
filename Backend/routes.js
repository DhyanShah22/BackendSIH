const express = require('express')
const {
    postUser
} = require('./controller')

const router = express.Router()

router.post('/user', postUser)

module.exports = router