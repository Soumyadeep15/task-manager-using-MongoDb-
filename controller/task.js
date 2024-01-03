const task = require('../models').task
const jwt = require('jsonwebtoken')
const createTask = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decodedData = jwt.decode(token)
        const userId = decodedData.userId
        const { title, description, completed } = req.body
        if (userId && title && description && completed) {
            const data = new task({ userId, title, description, completed })
            await data.save()
            res.status(200).json({
                status: 'success',
                message: `${decodedData.firstName}'s task created successfully`
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
        const decodedData = jwt.decode(req.headers.authorization)
        if (decodedData) {
            const taskData = await task.find({ userId: decodedData.userId })
            res.status(200).json({
                status: 'success',
                message: `tasks of ${decodedData.firstName} is fetched`,
                data: taskData
            })
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'user token is not valid'
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'failed to fetch the task'
        })
    }
}

const updateTask = async(req, res) => {
    try {
        const decodedData = jwt.decode(req.headers.authorization)
        if(decodedData) {
            const data = await task.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({
                status: 'success',
                message: `data updated for ${decodedData.firstName}`,
                newData: data
            })
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'user token is not valid'
            })
        }
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
        const decodedData = jwt.decode(req.headers.authorization)
        if(decodedData) {
            await task.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status: 'success',
                message: `task deleted successfully for ${decodedData.firstName}`
            })
        } else {
            res.status(400).json( {
                status: 'failed',
                message: 'failed to delete tasks'
            })
        }
        
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