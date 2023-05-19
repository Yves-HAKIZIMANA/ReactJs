const express = require('express')

const router = express.Router()
const taskRoute  = require('./task')
const authRoutes = require('./auth')
const userRoutes =  require('./users')
const checkAuth = require('../utils/checkAuth')
const verifyAuth  = require('../middlewares/verifyToken')
const verifyToken = require('../middlewares/verifyToken')


router.use('/auth', authRoutes)
router.use('/tasks',verifyAuth, taskRoute)
router.use('/users', verifyAuth, userRoutes)
module.exports = router