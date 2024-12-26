import express from "express";
import Resume from "../Modules/Resume.js";
import upload from "../Middlewares/ImageFilter.js";
import errorHandling from "../Middlewares/ErrorHandling.js";
import cloudinary from "../Cloudinary.js";

const router = express.Router();

router.post("/uploadResume", upload.single("image"), errorHandling(async (req, res) => {
    const { userId, profession, name, email, number, totalWorkExp, resumeHeadline, description, employmentDetails, educationDetails } = req.body;

    let employmentDetailsArray = []
    let educationDetailsArray = []

    try {
        if (employmentDetails) employmentDetailsArray = JSON.parse(employmentDetails)
        if (educationDetails) educationDetailsArray = JSON.parse(educationDetails)
    } catch (error) {
        return res.status(400).json({ message: "Invalid JSON format in fields." });
    }

    for (let detail of employmentDetailsArray) {
        if (!detail.companyName || !detail.position || !detail.startDate) {
            return res.status(400).json({ message: "Fields with * should be filled" })
        }
    }
    for (let detail of educationDetailsArray) {
        if (!detail.institutionName || !detail.degree || !detail.startDate) {
            return res.status(400).json({ message: "Fields with * should be filled" })
        }
    }

    if (!name || !email || !profession) {
        return res.status(400).json({ message: "Fields with * should be filled" })
    }

    let img_url;
    if (req.file) {
        if (!req.file.mimetype.startsWith("image")) {
            return res.status(400).json({ message: "Fields with * should be filled" })
        } else {
            const uploadImage = await cloudinary.uploader.upload(req.file.path)
            img_url = uploadImage.secure_url
        }
    }

    const uploadResume = await Resume.create({
        userId, name, profession, email, number, totalWorkExp, resumeHeadline, description, employmentDetails: employmentDetailsArray, educationDetails: educationDetailsArray, image: img_url
    })
    res.json(uploadResume)

}));

router.get("/allResumes", errorHandling(async (req, res) => {
    const resumes = await Resume.find().populate("userId", "name email")
    res.json(resumes)
}))
router.get("/getResumeById/:id", errorHandling(async (req, res) => {
    const resumeById = await Resume.findById(req.params.id).populate("userId", "name email")
    if (!resumeById) return res.status(400).json({ message: "Not found any resume" })
    res.json(resumeById)
}))

router.put("/editResume/:id", upload.single("image"), errorHandling(async (req, res) => {
    const { id } = req.params;
    const { name, profession, email, number, totalWorkExp, resumeHeadline, description, employmentDetails, educationDetails } = req.body;

    let employmentDetailsArray = [];
    let educationDetailsArray = [];

    try {
        if (employmentDetails) employmentDetailsArray = JSON.parse(employmentDetails);
        if (educationDetails) educationDetailsArray = JSON.parse(educationDetails);
    } catch (error) {
        return res.status(400).json({ message: "Invalid JSON format in fields." });
    }

    for (let detail of employmentDetailsArray) {
        if (!detail.companyName || !detail.position || !detail.startDate) {
            return res.status(400).json({ message: "Fields with * should be filled" });
        }
    }
    for (let detail of educationDetailsArray) {
        if (!detail.institutionName || !detail.degree || !detail.startDate) {
            return res.status(400).json({ message: "Fields with * should be filled" });
        }
    }

    if (!name || !email) {
        return res.status(400).json({ message: "Fields with * should be filled" });
    }

    let img_url;
    if (req.file) {
        if (!req.file.mimetype.startsWith("image")) {
            return res.status(400).json({ message: "Invalid image file" });
        } else {
            const uploadImage = await cloudinary.uploader.upload(req.file.path);
            img_url = uploadImage.secure_url;
        }
    }

    const updatedResume = await Resume.findByIdAndUpdate(id, {
        name, email, number, totalWorkExp, resumeHeadline, description, employmentDetails: employmentDetailsArray, educationDetails: educationDetailsArray, image: img_url, profession
    }, { new: true });

    if (!updatedResume) {
        return res.status(404).json({ message: "Resume not found" });
    }

    res.json(updatedResume);
}));


router.delete("/delResumeById/:id", errorHandling(async (req, res) => {
    const resumeById = await Resume.findByIdAndDelete(req.params.id)
    if (!resumeById) return res.status(400).json({ message: "Not found any resume" })
    res.json({ message: "Resume successfully deleted" })
}))
router.get("/resumeCount", errorHandling(async (req, res) => {
    const resumeCount = await Resume.countDocuments()
    res.json(resumeCount)
}))


export default router;
