const UserModel = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const bcrypt = require('bcryptjs')

const login = async (req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide email and password', StatusCodes.BAD_REQUEST)
    }

    const user = await UserModel.findOne({email})

    if(!user){
        throw new UnauthenticatedError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})
    
}

const register = async (req,res) => {
    
    const user = await UserModel.create({...req.body})
    const token = user.createJWT()
res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})
}

module.exports = {login, register}