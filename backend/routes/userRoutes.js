const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/all', userController.getAllUsers)
router.get('/:userId', userController.getUserById)

module.exports = router