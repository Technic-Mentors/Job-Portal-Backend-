import express, { response } from "express"
import errorHandling from "../Middlewares/ErrorHandling.js"
import Review from "../Modules/Review.js"
import upload from "../Middlewares/ImageFilter.js"
import cloudinary from "../Cloudinary.js"
const router = express.Router()

router.post("/addReview", upload.single("image"), errorHandling(async (req, res) => {
    const { name, email, role, companyName, message, status, designation } = req.body
    if (!role || !message) return res.status(400).json({ errorMessage: "Fields with * are required" })
    const checkEmail = await Review.findOne({ email })
    if (checkEmail) return res.status(400).json({ errorMessage: "Review with this email already exists!" })

    let img_url;
    if (req.file) {
        const imageUrl = await cloudinary.uploader.upload(req.file.path)
        img_url = imageUrl.secure_url
    } 

    const newReview = await Review.create({ name, email, role, companyName, message, status, designation, image: img_url })
    res.json(newReview)
}))

router.get("/allReviews", errorHandling(async (req, res) => {
    const allReviews = await Review.find()
    res.json(allReviews)
}))

router.get("/getReviewById/:id", errorHandling(async (req, res) => {
    const reviewById = await Review.findById(req.params.id)
    if (!reviewById) return res.status(400).json({ message: "Review not found" })
    res.json(reviewById)
}))

router.put("/acceptStatus/:id", async (req, res) => {
    const AcceptStatus = await Review.findByIdAndUpdate(req.params.id, { status: "Y" }, { new: true })
    if (!AcceptStatus) {
        return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review Published", AcceptStatus });
})

router.put("/updateReview/:id", upload.single("image"), errorHandling(async (req, res) => {
    const { name, email, role, companyName, message, designation } = req.body
    const updateReviewData = {}
    if (email) updateReviewData.email = email
    if (companyName) updateReviewData.companyName = companyName
    if (name) updateReviewData.name = name
    if (role) updateReviewData.role = role
    if (message) updateReviewData.message = message
    if (designation) updateReviewData.designation = designation

    if (req.file) {
        const imageUrl = await cloudinary.uploader.upload(req.file.path)
        updateReviewData.image = imageUrl.secure_url
    }

    const updatedReviewData = await Review.findByIdAndUpdate(req.params.id, { $set: updateReviewData }, { new: true })
    if (!updatedReviewData) return res.status(400).json({ message: "Review not found" })
    res.json(updatedReviewData)
}))

router.delete("/delReviewById/:id", errorHandling(async (req, res) => {
    const delReviewById = await Review.findByIdAndDelete(req.params.id)
    if (!delReviewById) return res.status(400).json({ message: "Review not found" })
    res.json({ message: "Review successfully deleted" })
}))

export default router;