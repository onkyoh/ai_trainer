const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const {
    getUser,
    registerUser,
    loginUser,
} = require('../controllers/userController')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', protect, getUser)

module.exports = router