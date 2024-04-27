const { createTask, readTask, updateTask, deleteTask } = require('../controller').task
const router = require('express').Router()
const auth = require('../middleware')

router.post('/createTask', auth, createTask)

router.get('/showTask',auth, readTask)

router.patch('/updateTask/:id', auth, updateTask)

router.delete('/deleteTask/:id', auth, deleteTask)

module.exports = router