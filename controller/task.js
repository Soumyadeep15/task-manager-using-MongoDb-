const task = require('../models').task
const jwt = require('jsonwebtoken')
const createTask = async (req, res) => {
    try {
        const userId = req.user.userId
        const { title, description, completed } = req.body
        if (userId && title && description && completed) {
            const data = new task({ userId, title, description, completed })
            await data.save()
            res.status(200).json({
                status: 'success',
                message: `${req.user.firstName}'s task created successfully`
            })
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'filled all details first'
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'failed to create task'
        })
    }
}

const readTask = async (req, res) => {
    try {
        const userId = req.user.userId
        const taskData = await task.find({ userId })
        res.status(200).json({
            status: 'success',
            message: `tasks of ${req.user.firstName} is fetched`,
            data: taskData
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'failed to fetch the task'
        })
    }
}

const updateTask = async(req, res) => {
    try {
        const userId = req.user.userId
        const data = await task.findOneAndUpdate({userId: userId, _id: req.params.id}, {$set: req.body}, { new: true })
        res.status(200).json({
            status: 'success',
            message: `data updated for ${req.user.firstName}`,
            newData: data
        })
    } catch (error) {
        // console.log(error)
        res.status(400).json({
            status: 'failed',
            message: 'failed to update tasks'
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const userId = req.user.userId
        await task.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status: 'success',
                message: `task deleted successfully for ${req.user.firstName}`
            })
        
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'failed to delete task data'
        })
    }
}

module.exports = {
    createTask,
    readTask,
    updateTask,
    deleteTask
}