const { Router } = require('express')
const router = Router()

const { 
    signIn,
    logout,  
    signUp
} = require('../controllers/users.controller')

router.post('/signin', signIn)

router.get('/logout', logout)

router.post('/signup', signUp)

module.exports = router