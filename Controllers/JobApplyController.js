import express from "express"
import JobApply from "../Modules/JobApply.js"
import errorHandling from "../Middlewares/ErrorHandling.js"
import uploadFile from "../Middlewares/FileFilter.js"
import cloudinary from "../Cloudinary.js"
const router = express.Router()

router.post("/applyForJob", uploadFile.single("resume"), errorHandling(async (req, res) => {
    const { name, email, number, jobId, currentSalary, expectedSalary, relocation, status, profession } = req.body

    if (!name || !email || !number || !expectedSalary || !relocation || !profession) return res.status(400).json({ message: "Fields with * should be filled" })

    if (req.file && !req.file.mimetype.startsWith("application/pdf")) {
        return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    let resume_url;
    if (req.file) {
        const resumeUplaod = await cloudinary.uploader.upload(req.file.path)
        resume_url = resumeUplaod.secure_url
    }

    const applyForJob = await JobApply.create({
        name, email, number, resume: resume_url, jobId, currentSalary, expectedSalary, relocation, status, profession
    })
    res.json(applyForJob)
}))

router.get("/appliedJobs", errorHandling(async (req, res) => {
    const getAppliedJobs = await JobApply.find().populate("jobId", "title country city")
    if (!getAppliedJobs) return res.status(400).json({ message: "Not found any job" })
    res.json(getAppliedJobs)
}))

router.get("/getAppliedJob/:id", errorHandling(async (req, res) => {
    const getAppliedJobById = await JobApply.findById(req.params.id).populate("jobId", "title country city")
    if (!getAppliedJobById) return res.status(400).json({ message: "Not found any job" })
    res.json(getAppliedJobById)
}))

router.put("/updateAppliedJob/:id", uploadFile.single("resume"), errorHandling(async (req, res) => {
    const { name, email, number, jobId, currentSalary, expectedSalary, relocation, profession } = req.body

    let updateJob = {}
    if (name) updateJob.name = name
    if (email) updateJob.email = email
    if (number) updateJob.number = number
    if (profession) updateJob.profession = profession
    if (jobId) updateJob.jobId = jobId
    if (currentSalary) updateJob.currentSalary = currentSalary
    if (expectedSalary) updateJob.expectedSalary = expectedSalary
    if (relocation) updateJob.relocation = relocation
    if (req.file) {
        const resumeUplaod = await cloudinary.uploader.upload(req.file.path)
        updateJob.resume = resumeUplaod.secure_url
    }

    const updateAppliedJobById = await JobApply.findByIdAndUpdate(req.params.id, { $set: updateJob }, { new: true })
    if (!updateAppliedJobById) return res.status(400).json({ message: "Job application not found" })
    res.json(updateAppliedJobById)
}))

router.put("/acceptStatus/:id", async (req, res) => {
    const AcceptStatus = await JobApply.findByIdAndUpdate(req.params.id, { status: "Accept" }, { new: true })
    if (!AcceptStatus) {
        return res.status(404).json({ error: "Job not found" });
    }
    res.json({ message: "Job status updated to 'y' (Accepted)", AcceptStatus });
})

router.put("/rejectStatus/:id", async (req, res) => {
    try {
        const RejectStatus = await JobApply.findByIdAndUpdate(req.params.id, { status: "Reject" }, { new: true })
        if (!RejectStatus) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json({ message: "Job status updated to 'n' (Accepted)", RejectStatus });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/deleteJob/:id", errorHandling(async (req, res) => {
    const deleteAppliedJob = await JobApply.findByIdAndDelete(req.params.id)
    if (!deleteAppliedJob) return res.status(400).json({ message: "Job application not found" })
    res.json({ message: "Job application deleted successfully" })
}))

router.get("/jobApplyCount", errorHandling(async (req, res) => {
    const jobApplyCount = await JobApply.countDocuments()
    res.json(jobApplyCount)
}))

export default router;