import JobPost from "../Modules/JobPost.js";
import express from "express";
const router = express.Router()
import errorHandling from "../Middlewares/ErrorHandling.js";
import cloudinaryV2 from "../Cloudinary.js";
import upload from "../Middlewares/ImageFilter.js"

router.post("/addJob", upload.fields([
    { name: "jobImage", maxCount: 1 },
    { name: "countryImage", maxCount: 1 },
]), errorHandling(async (req, res) => {
    const {
        title, country, city, email, whatsApp, description, requirements, perks,
        industryId, companyName, jobType, categoryId, jobLocaType,
        salary, aboutCompany, userId, status
    } = req.body;

    if (!title || !country || !city || !description ||
        !requirements || !industryId || !jobType || !categoryId) {
        return res.status(400).json({ message: "Fields with * are required" });
    }

    let jImage;
    let couImage;

    if (req.files.jobImage) {
        const uploadJobImage = await cloudinaryV2.uploader.upload(req.files.jobImage[0].path);
        jImage = uploadJobImage.secure_url;
    }
    if (req.files.countryImage) {
        const uploadCountryImage = await cloudinaryV2.uploader.upload(req.files.countryImage[0].path);
        couImage = uploadCountryImage.secure_url;
    }

    const newjobPost = await JobPost.create({
        title,
        country,
        city,
        email,
        description,
        requirements,
        aboutCompany,
        perks,
        whatsApp,
        industryId,
        jobImage: jImage,
        countryImage: couImage,
        companyName,
        jobType,
        categoryId,
        jobLocaType,
        salary,
        userId,
        status,
    });

    res.json(newjobPost);
}));


router.get("/getJobs", errorHandling(async (req, res) => {
    const allJobs = await JobPost.find().populate("userId", "email name role").populate("categoryId", "category image").populate("industryId", "industry image")
    res.json(allJobs)
}))

router.get("/getJobById/:id", errorHandling(async (req, res) => {
    const getJobById = await JobPost.findById(req.params.id).populate("categoryId", "category").populate("industryId", "industry image")
    if (!getJobById) return res.status(400).json({ message: "Job not found" })
    res.json(getJobById)
}))

router.get("/getJobByTitle/:title", errorHandling(async (req, res) => {
    const getJobByTitle = await JobPost.findOne({ title: req.params.title }).populate("categoryId", "category").populate("industryId", "industry")
    if (!getJobByTitle) return res.status(400).json({ message: "Job not found" })
    res.json(getJobByTitle)
}))

router.put("/acceptStatus/:id", async (req, res) => {
    const AcceptStatus = await JobPost.findByIdAndUpdate(req.params.id, { status: "Y" }, { new: true })
    if (!AcceptStatus) {
        return res.status(404).json({ error: "Job not found" });
    }
    res.json({ message: "Job status updated to 'y' (Accepted)", AcceptStatus });
})

router.put("/rejectStatus/:id", async (req, res) => {
    try {
        const RejectStatus = await JobPost.findByIdAndUpdate(req.params.id, { status: "N" }, { new: true })
        if (!RejectStatus) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json({ message: "Job status updated to 'n' (Accepted)", RejectStatus });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/delJob/:id", errorHandling(async (req, res) => {
    const delJobById = await JobPost.findByIdAndDelete(req.params.id)
    if (!delJobById) return res.status(400).json({ message: "Job not found" })
    res.json("Job successfully deleted")
}))

router.put("/updateJob/:id", upload.fields([
    { name: "jobImage", maxCount: 1 },
    { name: "countryImage", maxCount: 1 },
]), errorHandling(async (req, res) => {
    const { title, country, city, email, whatsApp, description, requirements, perks, industryId, companyName, jobType, categoryId, jobLocaType, salary, aboutCompany } = req.body
    const updateJob = {}
    if (title) updateJob.title = title
    if (country) updateJob.country = country
    if (city) updateJob.city = city
    if (email) updateJob.email = email
    if (description) updateJob.description = description
    if (requirements) updateJob.requirements = requirements
    if (aboutCompany) updateJob.aboutCompany = aboutCompany
    if (industryId) updateJob.industryId = industryId
    if (companyName) updateJob.companyName = companyName
    if (jobType) updateJob.jobType = jobType
    if (categoryId) updateJob.categoryId = categoryId
    if (salary) updateJob.salary = salary
    if (perks) updateJob.perks = perks
    if (whatsApp) updateJob.whatsApp = whatsApp
    if (jobLocaType) updateJob.jobLocaType = jobLocaType

    if (req.files.jobImage) {
        const uploadJobImage = await cloudinaryV2.uploader.upload(req.files.jobImage[0].path);
        updateJob.jobImage = uploadJobImage.secure_url
    }
    if (req.files.countryImage) {
        const uploadCountryImage = await cloudinaryV2.uploader.upload(req.files.countryImage[0].path);
        updateJob.countryImage = uploadCountryImage.secure_url
    }
    const updatedJob = await JobPost.findByIdAndUpdate(req.params.id, { $set: updateJob }, { new: true })
    if (!updatedJob) return res.status(400).json({ message: "Job not found" })
    res.json(updatedJob)
}))

router.get("/jobCount", errorHandling(async (req, res) => {
    const jobCount = await JobPost.countDocuments()
    res.json(jobCount)
}))

export default router;