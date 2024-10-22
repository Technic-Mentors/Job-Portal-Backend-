import JobPost from "../Modules/JobPost.js";
import express from "express";
const router = express.Router()
import errorHandling from "../Middlewares/ErrorHandling.js";

router.post("/addJob", errorHandling(async (req, res) => {
    const { title, country, city, email, description, requirements, industry, image, companyName, jobType, category, jobLocaType, salary } = req.body

    if (!title || !country || !city || !email || !description || !requirements || !industry || !companyName || !jobType || !category) return res.status(400).json({ message: "Fields with * are required" })

    const newjobPost = await JobPost.create({
        title, country, city, email, description, requirements, industry, image, companyName, jobType, category, jobLocaType, salary
    })
    res.json(newjobPost)
}))

router.get("/getJobs", errorHandling(async (req, res) => {
    const allJobs = await JobPost.find()
    res.json(allJobs)
}))

router.get("/getJobById/:id", errorHandling(async (req, res) => {
    const getJobById = await JobPost.findById(req.params.id)
    if (!getJobById) return res.status(400).json({ message: "Job not found" })
    res.json(getJobById)
}))

router.delete("/delJob/:id", errorHandling(async (req, res) => {
    const delJobById = await JobPost.findByIdAndDelete(req.params.id)
    if (!delJobById) return res.status(400).json({ message: "Job not found" })
    res.json("Job successfully deleted")
}))

router.put("/updateJob/:id", errorHandling(async (req, res) => {
    const { title, country, city, email, description, requirements, industry, image, companyName, jobType, category, jobLocaType, salary } = req.body
    const updateJob = {}
    if (title) updateJob.title = title
    if (country) updateJob.country = country
    if (city) updateJob.city = city
    if (email) updateJob.email = email
    if (description) updateJob.description = description
    if (requirements) updateJob.requirements = requirements
    if (industry) updateJob.industry = industry

    if (companyName) updateJob.companyName = companyName
    if (jobType) updateJob.jobType = jobType
    if (category) updateJob.category = category
    if (salary) updateJob.salary = salary
    if (jobLocaType) updateJob.jobLocaType = jobLocaType
    const updatedJob = await JobPost.findByIdAndUpdate(req.params.id, { $set: updateJob }, { new: true })
    if (!updatedJob) return res.status(400).json({ message: "Job not found" })
    res.json(updatedJob)
}))

export default router;