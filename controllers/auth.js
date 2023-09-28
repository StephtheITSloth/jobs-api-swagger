const UserModel = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')

const login = async (req,res) => {
    res.send('login')
}

const register = async (req,res) => {
    
    const user = await UserModel.create({...req.body})
    const token = user.createJWT()
res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})
}

module.exports = {login, register}