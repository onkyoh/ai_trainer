const bcrypt = require('bcryptjs') 
const User = require('../models/userModel')
const { generateToken } = require('../utils/generateToken')

const registerUser = async(req, res) => {
    const {username, password} = req.body

    if (!username || !password)  {
        return res.status(400).send({
                success: false,
                message: 'please fill all fields'
        })
    }

    const userExists = await User.findOne({username: username})

    if (userExists) {
        return res.status(400).send({
                success: false,
                message: 'username taken'
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user =  await User.create({
        username,
        password: hashedPassword
    })

    if (user) {
        res.status(201).send({
            success: true,
            message: 'success',
            data: {
                id: user._id,
                username: user.username,
                token: generateToken(user._id)
            }
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'invalid user data'
        })
    }
}

const loginUser = async(req, res) => {

    const {username, password } = req.body

    if (!username || !password)  {
        return res.status(400).send({
                success: false,
                message: 'please fill all fields'
            })
    }

    const user = await User.findOne({username: username})

    //check passwords
    if (user && (await bcrypt.compare(password, user.password))) {
        res.send({
            success: true,
            message: 'success',
            data: {
                id: user._id,
                username: user.username,
                token: generateToken(user._id)
            }
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'invalid credentials'
        })
    }
}

const getUser = async(req, res) => {
    const user = await User.findById(req.user.id)

    if (!user || !user.username) {
        return res.status(404).send({
                success: false,
                message: 'user could not be found'
        })
    }
    
    res.status(200).send({
        success: true,
        message: 'success',
        data: {
            id: user._id,
            username: user.username,
        }
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}