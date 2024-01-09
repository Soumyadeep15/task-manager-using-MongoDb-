const { createUser, readUserData, updateUser, deleteUser, logIn, searchUserByName } = require('../controller').user
const router = require('express').Router()
const auth = require('../middleware')
router.post('/createUser', createUser)

router.get('/readUser', readUserData)

router.patch('/updateUser/:id', auth, updateUser)

router.delete('/deleteUser/:id', deleteUser)

router.post('/login', logIn)

// router.get('/search', searchUserByName)

module.exports = router