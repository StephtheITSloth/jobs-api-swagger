

const getAllJobs = async (req,res) => {
    res.send('all jobs')
}

const getSingleJob = async (req,res) => {
    res.send('single job')
}

const createJob = async (req,res) => {
    res.send('create job')
}

const updateJob = async (req,res) => {
    res.send('update job')
}

const deleteJob = async (req,res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
}