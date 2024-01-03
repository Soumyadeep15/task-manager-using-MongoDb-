const { createTask, readTask, updateTask, deleteTask } = require('../controller').task
const router = require('express').Router()

router.post('/createTask', createTask)

router.get('/showTask', readTask)

router.patch('/updateTask/:id', updateTask)

router.delete('/deleteTask/:id', deleteTask)

module.exports = router