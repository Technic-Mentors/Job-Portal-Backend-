import express from "express";
import JobSeaker from "../Modules/JobSeakerPost.js";
import errorHandling from "../Middlewares/ErrorHandling.js";
const router = express.Router()

router.post("/addJobBySeaker", errorHandling(async (req, res) => {
    const { title, country, city, email, description, experience, industry, name, contact, userId, qualification, repositry, requirements } = req.body

    if (!title || !country || !city || !email || !description || !experience || !industry || !qualification) return res.status(400).json({ message: "Fields with * are required" })

    const checkJob = await JobSeaker.findOne({ title })
    if (checkJob) return res.status(400).json({ message: "Title already exists" })

    const newJobSeaker = await JobSeaker.create({
        title, country, city, email, description, experience, industry, name, contact, userId, qualification, repositry, requirements
    })
    res.json(newJobSeaker)
}))

router.get("/getJobsBySeaker", errorHandling(async (req, res) => {
    const allJobs = await JobSeaker.find().populate("userId", "email image")
    res.json(allJobs)
}))

router.get("/getJobByIdSeaker/:id", errorHandling(async (req, res) => {
    const getJobById = await JobSeaker.findById(req.params.id)
    if (!getJobById) return res.status(400).json({ message: "Job not found" })
    res.json(getJobById)
}))

router.get("/seakerJobByTitle/:title", errorHandling(async (req, res) => {
    const getJobByTitle = await JobSeaker.findOne({ title: req.params.title })
    if (!getJobByTitle) return res.status(400).json({ message: "Job not found" })
    res.json(getJobByTitle)
}))

router.delete("/delJobBySeaker/:id", errorHandling(async (req, res) => {
    const delJobById = await JobSeaker.findByIdAndDelete(req.params.id)
    if (!delJobById) return res.status(400).json({ message: "Job not found" })
    res.json("Job successfully deleted")
}))

router.put("/updateJobBySeaker/:id", errorHandling(async (req, res) => {
    const { title, country, city, email, description, experience, industry, name, contact, qualification, repositry, requirements } = req.body
    const updateJob = {}
    if (title) updateJob.title = title
    if (country) updateJob.country = country
    if (city) updateJob.city = city
    if (email) updateJob.email = email
    if (description) updateJob.description = description
    if (experience) updateJob.experience = experience
    if (name) updateJob.name = name
    if (industry) updateJob.industry = industry
    if (contact) updateJob.contact = contact
    if (qualification) updateJob.qualification = qualification
    if (repositry) updateJob.repositry = repositry

    const updatedJob = await JobSeaker.findByIdAndUpdate(req.params.id, { $set: updateJob }, { new: true })
    if (!updatedJob) return res.status(400).json({ message: "Job not found" })
    res.json(updatedJob)
}))

router.get("/jobSeakerCount", errorHandling(async (req, res) => {
    const jobCount = await JobSeaker.countDocuments()
    res.json(jobCount)
}))

export default router;