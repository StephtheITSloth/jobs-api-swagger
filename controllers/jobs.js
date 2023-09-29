const Job = require('../models/Job')
const {BadRequestError, NotFoundError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})

}

const getSingleJob = async (req,res) => {
    const {user:{userId}, params: {id:jobId} } = req
    const job = await Job.findOne({createdBy:userId, _id:jobId})

    if(!job){
        throw new NotFoundError(`No job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})

}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req,res) => {
    const {company, position} = req.body
    const {userId} = req.user
    const jobId = req.params.id

    if(!company || !position){
        throw new BadRequestError(`Company and Position fields must not be empty`)

    }
   
    const job = await Job.findByIdAndUpdate({_id: jobId,createdBy: userId}, req.body, {new: true, runValidators: true})

    if(!job){
        throw new NotFoundError(`No job with id: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req,res) => {
    const {userId} = req.user
    const jobId = req.params.id

    const job = await Job.findByIdAndDelete({_id: jobId, createdBy: userId})

    if(!job){
        throw new NotFoundError(`No job with id: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})

}

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
}