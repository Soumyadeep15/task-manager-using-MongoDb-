const user = require('../models').user
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUser = async (req, res) => {
    try {
        let { firstName, lastName, email, password } = req.body
        if (firstName && lastName && email && password) {
            const hashedPassword = bcrypt.hashSync(password, 10)
            password = hashedPassword
            const data = new user({
                firstName, lastName, email, password
            })
            await data.save()
            res.status(200).json({
                status: 'success',
                message: 'user created successfully'
            })
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'type all the details first'
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'something went wrong'
        })
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if(email && password) {
            const userData = await user.findOne({email})
            if(userData != null) {
                const isMatch = await bcrypt.compare(password, userData.password)
                if((email == userData.email) && isMatch) {
                    const token = jwt.sign({userId: userData._id, firstName: userData.firstName}, process.env.jwt_secret_key, {expiresIn: '5d'})
                    res.status(200).json({
                        status: 'success',
                        message: 'logged in successfully',
                        token: token
                    })
                } else {
                    res.status(400).json({
                        status: 'failed',
                        message: 'incorrect email or password'
                    })
                }
            } else {
                res.status(400).json({
                    status: 'failed', message: 'you are not a registered user 😕'
                })
            }

        } else {
            res.status(400).json({
                status: 'failed',
                message: 'type email and password first'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'failed',
            message: 'failed to logged in'
        })
    }
}

const readUserData = async (req, res) => {
    try {
        const data = await user.find().select('-password')
        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'cannot get the data'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const data = await user.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            message: 'data updated',
            newData: data
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'something went wrong'
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const data = await user.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
            message: `data of ${data.firstName} is removed`
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'something went wrong'
        })
    }
}

module.exports = {
    createUser,
    readUserData,
    updateUser,
    deleteUser,
    logIn
}