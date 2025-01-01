import express from "express";
const router = express.Router()
import CvPdfUpload from "../Modules/CvPdfUpload.js";
import uploadFile from "../Middlewares/FileFilter.js";
import errorHandling from "../Middlewares/ErrorHandling.js";
import cloudinaryV2 from "../Cloudinary.js";

router.post("/pdfCvUpload", uploadFile.single("cv"), errorHandling(async (req, res) => {
    const { profession, userId } = req.body

    if (!profession || !req.file) return res.status(400).json({ message: "Fields with * should be filled" })

    if (req.file && !req.file.mimetype.startsWith("application/pdf")) {
        return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    let cv_url;
    if (req.file) {
        const resumeUplaod = await cloudinaryV2.uploader.upload(req.file.path)
        cv_url = resumeUplaod.secure_url
    }

    const pdfCvUpload = await CvPdfUpload.create({
        profession, cv: cv_url, userId
    })
    res.json(pdfCvUpload)
}))

router.get("/getPdfCv", errorHandling(async (req, res) => {
    const getPdfCv = await CvPdfUpload.find().populate("userId", "name email number")
    if (!getPdfCv) return res.status(400).json({ message: "Not found any cv" })
    res.json(getPdfCv)
}))

router.get("/getPdfCvById/:id", errorHandling(async (req, res) => {
    const getUploadedCv = await CvPdfUpload.findById(req.params.id).populate("userId", "name email number")
    if (!getUploadedCv) return res.status(400).json({ message: "Not found any cv" })
    res.json(getUploadedCv)
}))

router.delete("/deletePdfCv/:id", errorHandling(async (req, res) => {
    const deleteAppliedJob = await CvPdfUpload.findByIdAndDelete(req.params.id)
    if (!deleteAppliedJob) return res.status(400).json({ message: "Pdf cv not found" })
    res.json({ message: "Pdf cv deleted successfully" })
}))

export default router