import express from "express";
import JobSeaker from "../Modules/JobSeakerPost.js";
import errorHandling from "../Middlewares/ErrorHandling.js";
import uploadFile from "../Middlewares/FileFilter.js"
import cloudinary from "../Cloudinary.js"
const router = express.Router()

router.post("/addJobBySeaker", uploadFile.single("resume"), errorHandling(async (req, res) => {
    const { title, country, city, email, description, experience, industry, name, contact, userId, qualification, repositry, requirements, status } = req.body

    if (!title || !country || !city || !email || !description || !experience || !industry || !qualification) return res.status(400).json({ message: "Fields with * are required" })

    const checkJob = await JobSeaker.findOne({ title })
    if (checkJob) return res.status(400).json({ message: "Title already exists" })

    if (req.file && !req.file.mimetype.startsWith("application/pdf")) {
        return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    let resume_url;
    if (req.file) {
        const resumeUplaod = await cloudinary.uploader.upload(req.file.path)
        resume_url = resumeUplaod.secure_url
    }

    const newJobSeaker = await JobSeaker.create({
        title, country, city, email, description, experience, industry, name, contact, userId, qualification, repositry, requirements, status, resume: resume_url
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

router.put("/acceptStatus/:id", async (req, res) => {
    const AcceptStatus = await JobSeaker.findByIdAndUpdate(req.params.id, { status: "Y" }, { new: true })
    if (!AcceptStatus) {
        return res.status(404).json({ error: "Job Seeker Post not found" });
    }
    res.json({ message: "Job Seeker Post status updated to 'y' (Accepted)", AcceptStatus });
})

router.put("/rejectStatus/:id", async (req, res) => {
    try {
        const RejectStatus = await JobSeaker.findByIdAndUpdate(req.params.id, { status: "N" }, { new: true })
        if (!RejectStatus) {
            return res.status(404).json({ error: "Job Seeker Post not found" });
        }
        res.json({ message: "Job Seeker Post status updated to 'n' (Accepted)", RejectStatus });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

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