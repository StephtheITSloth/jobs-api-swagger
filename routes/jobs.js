const express = require('express')
const router = express.Router()
const {getAllJobs, getSingleJob, createJob, updateJob, deleteJob} = require('../controllers/jobs')

router.post('/', createJob)
router.get('/', getAllJobs)
router.get('/:id', getSingleJob)
router.patch('/:id', updateJob)
router.delete('/:id', deleteJob)

module.exports = router