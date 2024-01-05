const { createUser, readUserData, updateUser, deleteUser, logIn } = require('../controller').user
const router = require('express').Router()

router.post('/createUser', createUser)

router.get('/readUser', readUserData)

router.patch('/updateUser/:id', updateUser)

router.delete('/deleteUser/:id', deleteUser)

router.post('/login', logIn)

module.exports = router