const express = require('express')
const { Register, Login, Logout, isLoggedIn } = require('../controllers/auth')


const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/logout', Logout)
router.get('/is_logged_in', isLoggedIn)


module.exports = router
