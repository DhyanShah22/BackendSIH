const express = require('express')
const {
    postUser
} = require('./controller')

const router = express.Router()

router.post('/usermodel', postUser)

module.exports = router