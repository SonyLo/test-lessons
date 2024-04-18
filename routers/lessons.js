const express = require('express')
const router = express.Router()
const controller = require('../controllers/lessons')

router.get("/", controller.getLessons)

module.exports = router